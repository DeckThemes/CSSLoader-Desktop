import { setStandaloneVersion } from "../";
import { fetchNewestBackend } from "./fetchNewestBackend";
import semver from "semver";
import { Command } from "@tauri-apps/api/shell";
export async function downloadBackend(onClose: any = () => {}) {
  const release = await fetchNewestBackend();
  const url = release?.assets?.find((e: any) => e.name.includes("Standalone-Headless.exe")).url;
  const version = semver.clean(release?.tag_name || "v1.0.0") || "v1.6.0";
  setStandaloneVersion(version);
  const command = new Command("downloadBackend", [
    "Invoke-WebRequest",
    "-Uri",
    url,
    "-OutFile",
    "([Environment]::GetFolderPath('Startup')",
    "+",
    "'\\CssLoader-Standalone-Headless.exe')",
  ]);
  command.on("close", onClose);
  await command.spawn();
}
