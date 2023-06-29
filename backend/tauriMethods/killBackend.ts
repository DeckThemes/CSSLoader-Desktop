import { Command } from "@tauri-apps/api/shell";
export async function killBackend(onClose: any = () => {}) {
  const command = new Command("killBackend", [
    "taskkill",
    "/IM",
    "CssLoader-Standalone-Headless.exe",
    "/F",
  ]);
  command.on("close", onClose);
  // Untested: Not sure if this errors when it attempts to kill an already not running backend, just put it here to cover all my bases
  command.on("error", onClose);
  await command.spawn();
}
