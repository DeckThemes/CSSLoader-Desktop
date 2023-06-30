import { wrappedInvoke } from "backend/wrappedInvoke";
export async function copyBackend(backendPath: string) {
  return await wrappedInvoke("copyBackend", [
    "Copy-Item",
    "-Path",
    backendPath,
    "-Destination",
    "([Environment]::GetFolderPath('Startup') + '\\CssLoader-Standalone-Headless.exe')",
  ]);
}
