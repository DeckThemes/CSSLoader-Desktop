import { Command } from "@tauri-apps/api/shell";
export async function startBackend(onClose: any = () => {}) {
  const command = new Command("startBackend", [
    "Start-Process",
    "-FilePath",
    "([Environment]::GetFolderPath('Startup')",
    "+",
    "'\\CssLoader-Standalone-Headless.exe')",
  ]);
  command.on("close", onClose);
  await command.spawn();
}
