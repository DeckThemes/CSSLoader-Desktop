#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use std::io::Cursor;
use home::home_dir;
use zip_extract;

use std::ptr;
use winapi::um::tlhelp32::{CreateToolhelp32Snapshot, Process32First, Process32Next, PROCESSENTRY32};
use winapi::um::processthreadsapi::{OpenProcess, TerminateProcess};
use winapi::um::winnt::{PROCESS_QUERY_INFORMATION, PROCESS_VM_READ, HANDLE};
use winapi::um::handleapi::CloseHandle;
use winapi::shared::minwindef::DWORD;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![download_template,kill_standalone_backend])
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
  let res = client.get(url).send().await.expect("");
  let bytes = res.bytes().await.expect("");

  let vec: Vec<u8> = bytes.to_vec();

  let extract = zip_extract::extract(Cursor::new(vec), &home, false);
  return !extract.is_err()
}

#[tauri::command]
async fn kill_standalone_backend() -> String {
  let process_id: Option<u32> = find_standalone_pid().await;

  if !process_id.is_some() {
    return String::from("ERROR: No Process Id")
  }

  unsafe {
    // Get a handle to the process
    let process_handle = winapi::um::processthreadsapi::OpenProcess(
        winapi::um::winnt::PROCESS_TERMINATE,
        0,
        process_id.unwrap(),
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
    return String::from("SUCCESS:")
}
}

async fn find_standalone_pid() -> Option<u32> {
  
  let process_name = "CssLoader-Standalone-Headless.exe"; // Replace with the name of the target process

  unsafe {
      let snapshot_handle = CreateToolhelp32Snapshot(winapi::um::tlhelp32::TH32CS_SNAPPROCESS, 0);

      if snapshot_handle == ptr::null_mut() {
          println!("Failed to create snapshot. Error code: {}", winapi::um::errhandlingapi::GetLastError());
          return None;
      }

      let mut process_entry: PROCESSENTRY32 = std::mem::zeroed();
      process_entry.dwSize = std::mem::size_of::<PROCESSENTRY32>() as DWORD;

      if Process32First(snapshot_handle, &mut process_entry) != 0 {
          loop {
              let exe_name = std::ffi::CStr::from_ptr(process_entry.szExeFile.as_ptr() as *const i8).to_string_lossy();

              if exe_name == process_name {
                  let process_id = process_entry.th32ProcessID;

                  let process_handle = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, 0, process_id);

                  if process_handle != ptr::null_mut() {
                      println!("Found process {} with PID: {}", process_name, process_id);
                      CloseHandle(process_handle);
                      return Some(process_id)
                  } else {
                      println!("Failed to open process. Error code: {}", winapi::um::errhandlingapi::GetLastError());
                  }

                  break;
              }

              if Process32Next(snapshot_handle, &mut process_entry) == 0 {
                  break;
              }
          }
      }

      CloseHandle(snapshot_handle);
      return None;
  }
}
