import {
    BaseDirectory,
    exists,
  } from "@tauri-apps/api/fs";
export async function checkIfStandaloneBackendExists() {
    const backendExists = await exists(
      "Microsoft\\Windows\\Start Menu\\Programs\\Startup\\CssLoader-Standalone-Headless.exe",
      {
        dir: BaseDirectory.Config,
      }
    );
    return backendExists;
  }