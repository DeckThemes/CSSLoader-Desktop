import { wrappedInvoke } from "backend/wrappedInvoke";
export async function killBackend() {
  return await wrappedInvoke("killBackend", [
    "taskkill",
    "/IM",
    "CssLoader-Standalone-Headless.exe",
    "/F",
  ]);
}
