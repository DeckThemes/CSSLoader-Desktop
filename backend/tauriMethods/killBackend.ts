export async function killBackend() {
  const { invoke } = await import("@tauri-apps/api");
  return await invoke("kill_standalone_backend", {});
}
