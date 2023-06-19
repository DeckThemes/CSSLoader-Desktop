import { server } from "./server";
export function downloadThemeFromUrl(themeId: string): Promise<any> {
  return server!.callPluginMethod("download_theme_from_url", {
    id: themeId,
    url: "https://api.deckthemes.com/",
  });
}
