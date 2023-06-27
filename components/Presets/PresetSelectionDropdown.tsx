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
          // Enable the new preset
          setThemeState(e, true).then(() => {
            refreshThemes();
          });
        }}
      />
    </>
  );
}
