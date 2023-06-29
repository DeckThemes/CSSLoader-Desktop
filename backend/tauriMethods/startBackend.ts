import { Command } from "@tauri-apps/api/shell";
import { dummyFunction } from "backend/pythonMethods";
export async function startBackend(onClose: any = () => {}) {
  const isRunning = await dummyFunction();
  if (!isRunning) {
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
}
