import { readTextFile, BaseDirectory } from "@tauri-apps/api/fs";
export async function getStandaloneVersion() {
  const version = await readTextFile("standaloneVersion.txt", {
    dir: BaseDirectory.AppData,
  }).catch((err) => {
    return false;
  });
  return version;
}
