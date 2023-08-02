import {
  writeTextFile,
  BaseDirectory,
  createDir,
  exists,
} from "@tauri-apps/api/fs";
export async function setStandaloneVersion(value: string) {
  const appDataExists = await exists("", { dir: BaseDirectory.AppData });
  if (!appDataExists) {
    console.log("AppData dir does not exist! Creating.");
    await createDir("", { dir: BaseDirectory.AppData });
  }
  writeTextFile("standaloneVersion.txt", value, { dir: BaseDirectory.AppData });
}
