import { themeContext } from "@contexts/themeContext";
import { Flags } from "ThemeTypes";
import { useContext } from "react";
import { AddThemeToPresetButton, PresetThemeNameDisplayCard, ThemeToggle } from "..";

export function PresetFolderView() {
  const { themes, selectedPreset } = useContext(themeContext);
  if (selectedPreset) {
    return (
      <div className="flex h-full w-full max-w-[960px] flex-col gap-2 rounded-2xl bg-base-3-dark p-4">
        <span className="font-bold">{selectedPreset.name}</span>
        <span>Contained Themes:</span>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {selectedPreset.dependencies.map((e) => {
            const themeEntry = themes.find((f) => f.name === e);
            if (themeEntry) {
              return <PresetThemeNameDisplayCard themeName={themeEntry.name} />;
            }
            return null;
          })}
        </div>
        <AddThemeToPresetButton />
      </div>
    );
  }
  return null;
}
