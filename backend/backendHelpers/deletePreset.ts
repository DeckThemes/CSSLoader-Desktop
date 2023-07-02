import { Theme } from "ThemeTypes";
import { changePreset } from "./changePreset";
import { deleteTheme } from "backend/pythonMethods";

export async function deletePreset(
  presetName: string,
  themes: Theme[],
  refreshThemes: (e?: boolean) => void
) {
  if (themes.find((e) => e.name === presetName)!.enabled) {
    await changePreset("Default Profile", themes);
  }
  await deleteTheme(presetName);
  refreshThemes();
}
