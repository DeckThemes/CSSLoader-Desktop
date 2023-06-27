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
          const themeEntry = themes.find((f) => f.name === e);

          // Disable the previously enabled preset
          const oldPreset = presets.find((e) => e.enabled)?.name;
          if (oldPreset) {
            await setThemeState(oldPreset, false);
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
