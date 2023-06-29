import { server } from "./server";
export function fetchThemePath() {
  return server!.callPluginMethod<{}, string>("fetch_theme_path", {});
}
