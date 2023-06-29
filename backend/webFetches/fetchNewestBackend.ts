import { fetch } from "@tauri-apps/api/http";
export async function fetchNewestBackend() {
  return await fetch<any>(
    "https://api.github.com/repos/suchmememanyskill/SDH-CssLoader/releases/latest"
  )
    .then((res) => {
      return res.data;
    })
    .then((json) => {
      if (json) {
        return json;
      }
      return;
    })
    .catch((err) => {
      console.error("Error Fetching Latest Backend From Github!", err);
      return;
    });
}
