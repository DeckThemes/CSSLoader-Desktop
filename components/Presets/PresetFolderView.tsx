import { themeContext } from "@contexts/themeContext";
import { Flags } from "ThemeTypes";
import { useContext } from "react";
import { AddThemeToPresetButton, ThemeToggle } from "..";

export function PresetFolderView() {
  const { themes, selectedPreset } = useContext(themeContext);
  if (selectedPreset) {
    return (
      <div className="flex h-full w-full max-w-[960px] flex-col gap-2 rounded-2xl bg-base-3-dark p-4">
        <span className="font-bold">{selectedPreset.name}</span>
        <span>Contained Themes:</span>
        <div className="flex flex-col">
          {selectedPreset.dependencies.map((e) => {
            const themeEntry = themes.find((f) => f.name === e);
            if (themeEntry) {
              return (
                <ThemeToggle
                  inPresetView
                  collapsible
                  data={themeEntry}
                  rootClass="bg-base-5.5-dark"
                />
              );
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
