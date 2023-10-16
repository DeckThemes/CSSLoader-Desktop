import { Flags, Theme } from "ThemeTypes";

export async function toggleTheme(
  switchValue: boolean,
  data: Theme
  setCollapsed: (e: boolean) => void,
  setShowOptDepsModal: (e: boolean) => void
) {
  // TODO: redo this!

  // Re-collapse menu
  setCollapsed(true);
  // If theme has optional dependency flag
  if (switchValue === true && data.flags.includes(Flags.optionalDeps)) {
    setShowOptDepsModal(true);
    return;
  }
  // Actually enabling the theme
  await setThemeState(data.name, switchValue);

  // Need to grab up to date data
  const updatedThemes: Theme[] | undefined = await refreshThemes();
  console.log(updatedThemes?.filter((e) => e.enabled).length);

  // Dependency Toast
  if (data.dependencies.length > 0) {
    if (switchValue) {
      toast(
        `${data.name} enabled other themes`,
        `${
          data.dependencies.length === 1
            ? `1 other theme is required by ${data.name}`
            : `${data.dependencies.length} other themes are required by ${data.name}`
        }`
      );
    }
    if (!switchValue && !data.flags.includes(Flags.dontDisableDeps)) {
      toast(
        `${data.name} disabled other themes`,
        // @ts-ignore
        `${
          data.dependencies.length === 1
            ? `1 theme was originally enabled by ${data.name}`
            : `${data.dependencies.length} themes were originally enabled by ${data.name}`
        }`
      );
    }
  }

  if (!selectedPreset || !updatedThemes) return;
  // This used to generate the new list of themes by the dependencies of the preset + or - the checked theme
  // However, since we added profiles, the list of enabled themes IS the list of dependencies, so this works
  await generatePresetFromThemeNames(
    selectedPreset.name,
    updatedThemes.filter((e) => e.enabled && !e.flags.includes(Flags.isPreset)).map((e) => e.name)
  );
}
