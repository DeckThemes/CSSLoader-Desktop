import { useContext } from "react";
import { themeContext } from "@contexts/themeContext";
import { BsXCircle } from "react-icons/bs";
import { generatePresetFromThemeNames } from "backend";
import { Tooltip } from "..";

// This is the card that goes inside the PresetFolderView to say the name of one theme that is a dependency of it
// Also has the remove from preset button
export function PresetThemeNameDisplayCard({ themeName }: { themeName: string }) {
  const { selectedPreset, refreshThemes } = useContext(themeContext);
  return (
    <div className="flex h-12 w-full items-center justify-between gap-2 rounded-xl bg-base-5.5-dark px-4 py-2 outline-none">
      <span className="truncate">{themeName}</span>
      <Tooltip
        delayDuration={500}
        content={<span className="text-sm">Remove from preset</span>}
        triggerContent={
          <>
            <BsXCircle
              className="cursor-pointer"
              onClick={() => {
                if (selectedPreset) {
                  generatePresetFromThemeNames(
                    selectedPreset.name,
                    selectedPreset.dependencies.filter((e) => e !== themeName)
                  ).then(() => {
                    refreshThemes();
                  });
                }
              }}
            />
          </>
        }
      />
    </div>
  );
}
