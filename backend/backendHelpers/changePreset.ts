import { Theme } from "ThemeTypes";
import { setThemeState } from "backend/pythonMethods";

export async function changePreset(themeName: string, themeList: Theme[]) {
  return new Promise(async (resolve) => {
    // Disables all themes before enabling the preset
    await Promise.all(themeList.filter((e) => e.enabled).map((e) => setThemeState(e.name, false)));

    await setThemeState(themeName, true);
    resolve(true);
  });
}
