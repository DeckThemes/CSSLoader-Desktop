import { server } from "./server";
export function generatePresetFromThemeNames(name: string, themeNames: string[]) {
  return server!.callPluginMethod("generate_preset_theme_from_theme_names", {
    name: name,
    themeNames: themeNames,
  });
}
