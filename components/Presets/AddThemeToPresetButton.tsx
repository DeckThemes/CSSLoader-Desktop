import { themeContext } from "@contexts/themeContext";
import { Modal, RadioDropdown } from "..";
import { useContext, useState, useMemo, useEffect } from "react";
import { Flags } from "ThemeTypes";
import { generatePresetFromThemeNames, setThemeState } from "backend";
import { twMerge } from "tailwind-merge";

export function AddThemeToPresetButton() {
  const { themes, refreshThemes, selectedPreset } = useContext(themeContext);
  const dropdownOptions = useMemo(
    () =>
      themes
        .filter(
          (e) => !selectedPreset?.dependencies.includes(e.name) && !e.flags.includes(Flags.isPreset)
        )
        .map((e) => e.name),
    [themes]
  );

  // This fixes the issue where if you selected an option and added it, the value would not reset to a new one
  // There may be a way to do this that doesn't involve a useEffect
  useEffect(() => {
    if (selectedPreset?.dependencies.includes(themeToAdd)) {
      setThemeToAdd(dropdownOptions[0]);
    }
  }, [themes, selectedPreset]);

  const [themeToAdd, setThemeToAdd] = useState<string>(dropdownOptions[0]);

  if (selectedPreset) {
    return (
      <>
        <Modal
          title="Add Theme To Preset"
          Content={
            <div className="w-full p-4">
              <RadioDropdown
                ariaLabel="Select Theme To Add Dropdown"
                headingText="Theme To Add"
                triggerClass="bg-base-5.5-dark"
                value={themeToAdd}
                onValueChange={setThemeToAdd}
                options={dropdownOptions}
              />
            </div>
          }
          triggerDisabled={dropdownOptions.length === 0}
          Trigger={
            <>
              <div
                className={twMerge(
                  "flex h-full w-fit items-center justify-center gap-2 rounded-full border-2 border-[#2e2e2e] bg-base-5.5-dark px-4 py-2 outline-none",
                  dropdownOptions.length === 0 ? "opacity-50" : ""
                )}
              >
                <span className="text-sm font-bold">Add more themes</span>
              </div>
            </>
          }
          actionText="Add To Preset"
          onAction={() => {
            if (themeToAdd) {
              generatePresetFromThemeNames(selectedPreset.name, [
                ...selectedPreset.dependencies,
                themeToAdd,
              ]).then(() => {
                if (!themes.find((e) => e.name === themeToAdd).enabled) {
                  await setThemeState(themeToAdd, true)
                }
                refreshThemes();
              });
            }
          }}
        ></Modal>
      </>
    );
  }
  return null;
}
