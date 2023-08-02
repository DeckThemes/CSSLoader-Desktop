const baseUrl = "https://api.deckthemes.com/themes/template/css?themename=";
import { invoke } from "@tauri-apps/api/tauri";

export async function downloadTemplate(name: string) {
  return await invoke("download_template", { templateName: name });
}
