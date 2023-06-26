export async function getOS(): Promise<string> {
  const { platform } = await import("@tauri-apps/api/os");
  return await platform();
}
