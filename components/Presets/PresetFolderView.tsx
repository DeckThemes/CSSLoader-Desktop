import { themeContext } from "@contexts/themeContext";
import { Flags } from "ThemeTypes";
import { useContext } from "react";
import { AddThemeToPresetButton, PresetThemeNameDisplayCard, ThemeToggle } from "..";

export function PresetFolderView() {
  const { themes, selectedPreset } = useContext(themeContext);
  if (selectedPreset) {
    return (
      <div className="mt-4 flex w-full max-w-[960px] flex-col gap-2">
        {/* <span className="font-bold">{selectedPreset.name}</span> */}
        <span className="font-bold">There are {selectedPreset.dependencies.length ?? 'no'} themes in this preset</span>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {selectedPreset.dependencies.map((e) => {
            const themeEntry = themes.find((f) => f.name === e);
            if (themeEntry) {
              return <PresetThemeNameDisplayCard themeName={themeEntry.name} />;
            }
            return null;
          })}
        </div>
        <div className="mt-4">
			<AddThemeToPresetButton />
		</div>
      </div>
    );
  }
  return null;
}
