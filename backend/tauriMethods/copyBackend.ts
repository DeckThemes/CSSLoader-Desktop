import { Command } from "@tauri-apps/api/shell";
export async function copyBackend(backendPath: string, onClose: any = () => {}) {
  const command = new Command("copyBackend", [
    "Copy-Item",
    "-Path",
    backendPath,
    "-Destination",
    "([Environment]::GetFolderPath('Startup') + '\\CssLoader-Standalone-Headless.exe')",
  ]);
  command.on("close", onClose);
  // Untested: Not sure if this errors when it attempts to kill an already not running backend, just put it here to cover all my bases
  command.on("error", onClose);
  await command.spawn();
}
