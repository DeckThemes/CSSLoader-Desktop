import { invoke } from "@tauri-apps/api/tauri";

export async function test() {
  const test = await invoke("kill_standalone_backend", {});
  console.log("TEST", test);
}
