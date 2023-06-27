#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use std::io::Cursor;
use home::home_dir;
use zip_extract;

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
  let res = client.get(url).send().await.expect("");
  let bytes = res.bytes().await.expect("");

  let vec: Vec<u8> = bytes.to_vec();

  let extract = zip_extract::extract(Cursor::new(vec), &home, false);
  return !extract.is_err()
}