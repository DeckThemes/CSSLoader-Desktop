#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use std::io::Cursor;
use std::path::{Path, PathBuf};
use directories::BaseDirs;
use home::home_dir;
use zip_extract;
use std::process::Command;
use std::{fs, ptr};

#[cfg(target_os = "windows")]
use {
  winapi::um::tlhelp32::{CreateToolhelp32Snapshot, Process32First, Process32Next, PROCESSENTRY32},
  winapi::um::processthreadsapi::{OpenProcess, TerminateProcess},
  winapi::um::winnt::{PROCESS_QUERY_INFORMATION, PROCESS_VM_READ},
  winapi::um::handleapi::CloseHandle,
  winapi::shared::minwindef::DWORD,
};


#[cfg(target_os = "windows")]
fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![download_template,kill_standalone_backend,download_latest_backend,start_backend,install_backend,get_string_startup_dir])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[cfg(target_os = "linux")]
fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![download_template])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
async fn download_template(template_name: String) -> bool {

  let mut home = home_dir().expect("");
  if home.join("homebrew/themes").exists() {
    home = home.join("homebrew/themes")
  }

  let url: String = "https://api.deckthemes.com/themes/template/css?themename=".to_owned() + &template_name;
  let client: reqwest::Client = reqwest::Client::new();
  let res: reqwest::Response = client.get(url).send().await.expect("");
  let bytes = res.bytes().await.expect("");

  let vec: Vec<u8> = bytes.to_vec();

  let extract = zip_extract::extract(Cursor::new(vec), &home, false);
  return !extract.is_err()
}

#[cfg(target_os = "windows")]
async fn get_startup_dir() -> Option<PathBuf> {
  if let Some(base_dirs) = BaseDirs::new() {
    let config = base_dirs.config_dir();
    let startup_dir: std::path::PathBuf = Path::new(&config).join("Microsoft\\Windows\\Start Menu\\Programs\\Startup");
    // TODO: MAKE SURE THE FILE OR DIRECTORY EXISTS
    // MAYBE NOT THE FILE AS ON INITIAL INSTALL IT WONT EXIST
    // BUT THE FOLDER FOR SURE
    return Some(startup_dir);
  }
  return None;
}

#[cfg(target_os = "windows")]
async fn get_backend_path() -> Option<PathBuf> {
  let startup_dir = get_startup_dir().await;
  if startup_dir.is_none() {
    return None;
  }
  let backend_file_name = startup_dir.unwrap().join("CssLoader-Standalone-Headless.exe");
  return Some(backend_file_name);
}

#[cfg(target_os = "windows")]
#[tauri::command]
async fn get_string_startup_dir() -> String {
  let startup_dir = get_startup_dir().await;
  if startup_dir.is_none() {
    return "ERROR:".to_owned();
  }
  return startup_dir.unwrap().to_string_lossy().to_string();
}

#[cfg(target_os = "windows")]
#[tauri::command]
async fn install_backend(backend_url: String) -> String {
  kill_standalone_backend().await;
  println!("Backend Killed");
  download_latest_backend(backend_url).await;
  println!("Backend Downloaded");
  start_backend().await;
  println!("Backend Started");
  return String::from("SUCCESS");
}

#[cfg(target_os = "windows")]
#[tauri::command]
async fn start_backend() -> String {
  let backend_file_name = get_backend_path().await;
  if !backend_file_name.is_some() {
    return String::from("ERROR: Cannot Find Backend");
  }
  let file = backend_file_name.unwrap();
  println!("Starting New {}", &file.to_string_lossy());
  Command::new(&file).spawn().expect("Failed to start the process");
  println!("Started");
  return String::from("SUCCESS");
}

#[cfg(target_os = "windows")]
#[tauri::command]
async fn download_latest_backend(backend_url: String) -> String {
  let backend_file_name = get_backend_path().await;
  if !backend_file_name.is_some() {
    return String::from("ERROR: Cannot Find Backend");
  }
  // Check backend is not running
  let process_id: Option<Vec<u32>> = find_standalone_pids().await;
  if process_id.is_some() {
    kill_standalone_backend().await;
  }

  let client: reqwest::Client = reqwest::Client::new();
  let res: reqwest::Response = client.get(backend_url).send().await.expect("");
  let bytes = res.bytes().await.expect("");
  let vec: Vec<u8> = bytes.to_vec();

  println!("Writing File");
  let _ = fs::write(backend_file_name.unwrap(), vec);
  println!("File written");

  return String::from("SUCCESS");
}

#[cfg(target_os = "windows")]
async fn find_standalone_pids() -> Option<Vec<u32>> {
  
  let process_name: &str = "CssLoader-Standalone-Headless.exe";

  unsafe {
      let snapshot_handle = CreateToolhelp32Snapshot(winapi::um::tlhelp32::TH32CS_SNAPPROCESS, 0);

      if snapshot_handle == ptr::null_mut() {
          println!("Failed to create snapshot. Error code: {}", winapi::um::errhandlingapi::GetLastError());
          return None;
      }

      let mut process_entry: PROCESSENTRY32 = std::mem::zeroed();
      process_entry.dwSize = std::mem::size_of::<PROCESSENTRY32>() as DWORD;

      if Process32First(snapshot_handle, &mut process_entry) != 0 {
          let mut entries: Vec<u32> = Vec::new(); 
          loop {
              let exe_name = std::ffi::CStr::from_ptr(process_entry.szExeFile.as_ptr() as *const i8).to_string_lossy();

              if exe_name == process_name {
                  let process_id = process_entry.th32ProcessID;

                  let process_handle = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, 0, process_id);

                  if process_handle != ptr::null_mut() {
                      println!("Found process {} with PID: {}", process_name, process_id);
                      CloseHandle(process_handle);
                      entries.push(process_id);
                  } else {
                      println!("Failed to open process. Error code: {}", winapi::um::errhandlingapi::GetLastError());
                  }
              }

              if Process32Next(snapshot_handle, &mut process_entry) == 0 {
                  break;
              }
          }
          if entries.len() == 0 {
            return None;
          }
          return Some(entries);
      }

      CloseHandle(snapshot_handle);
      return None;
  }
}


#[cfg(target_os = "windows")]
#[tauri::command]
async fn kill_standalone_backend() -> String {
  let process_ids: Option<Vec<u32>> = find_standalone_pids().await;

  if !process_ids.is_some() {
    return String::from("ERROR: No Process Id")
  }

  let entries: Vec<u32> = process_ids.unwrap();
  if entries.len() == 0 {
    return String::from("ERROR: Process IDs Length 0");
  }

  for id in entries.iter() {

    let res: String = kill_pid(id.to_owned()).await;

    if res.contains("ERROR") {
      return format!("ERROR: Error killing process, {}", res);
     }
  }
  return String::from("SUCCESS:");
}

#[cfg(target_os = "windows")]
async fn kill_pid(process_id: u32) -> String {
  unsafe {
    // Get a handle to the process
    let process_handle = winapi::um::processthreadsapi::OpenProcess(
        winapi::um::winnt::PROCESS_TERMINATE,
        0,
        process_id,
    );

    if process_handle.is_null() {
        println!("Failed to open process. Error code: {}", winapi::um::errhandlingapi::GetLastError());
        return format!("ERROR: Failed to open process. Error Code {}", winapi::um::errhandlingapi::GetLastError());
    }

    // Terminate the process
    let result = TerminateProcess(process_handle, 1);

    if result == 0 {
        println!("Failed to terminate process. Error code: {}", winapi::um::errhandlingapi::GetLastError());
    } else {
        println!("Process terminated successfully.");
    }

    // Close the process handle
    CloseHandle(process_handle);

    return String::from("SUCCESS:");
  }
}

