import { useContext, useMemo } from "react";
import { RadioDropdown } from "..";
import { themeContext } from "@contexts/themeContext";
import { Flags } from "ThemeTypes";
import { setThemeState } from "backend";

export function PresetSelectionDropdown() {
  const { themes, refreshThemes } = useContext(themeContext);
  const presets = useMemo(() => themes.filter((e) => e.flags.includes(Flags.isPreset)), [themes]);

  return (
    <>
      <RadioDropdown
        headingText="Selected Preset"
        ariaLabel="Preset Selection Dropdown"
        value={presets.find((e) => e.enabled)?.name || "None"}
        options={["None", ...presets.map((e) => e.name)]}
        onValueChange={async (e) => {
          // Disable the previously enabled preset(s)
          const oldPresets = presets.filter((e) => e.enabled).map((e) => e.name);
          if (oldPresets.length > 0) {
            await Promise.all(oldPresets.map((e) => setThemeState(e, false)));
          }
          // If you've changed patches/components of the preset, those are saved to the folder, but not the backend's version of the prest
          // This refreshes it all so that the patch values actually are what they should be
          await refreshThemes(true);
          // Enable the new preset
          setThemeState(e, true).then(() => {
            refreshThemes();
          });
        }}
      />
    </>
  );
}
