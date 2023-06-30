import { dummyFunction } from "backend/pythonMethods";
import { wrappedInvoke } from "backend/wrappedInvoke";
export async function startBackend() {
  const isRunning = await dummyFunction();
  if (!isRunning) {
    return await wrappedInvoke("startBackend", [
      "Start-Process",
      "-FilePath",
      "([Environment]::GetFolderPath('Startup')",
      "+",
      "'\\CssLoader-Standalone-Headless.exe')",
    ]);
  }
}
