import { fetchNewestBackend } from "backend/webFetches";
import semver from "semver";
import { setStandaloneVersion } from "./setStandaloneVersion";

export async function downloadBackend() {
  // Not sure if this is needed
  const { invoke } = await import("@tauri-apps/api");

  const release = await fetchNewestBackend();
  const url = release?.assets?.find((e: any) =>
    e.name.includes("Standalone-Headless.exe")
  ).browser_download_url;
  const version = semver.clean(release?.tag_name || "v1.0.0") || "v1.6.0";
  console.log(url);
  const test = await invoke<string>("install_backend", {
    backendUrl: url,
  });
  if (!test.includes("ERROR")) {
    setStandaloneVersion(version);
  }
  return;
}
