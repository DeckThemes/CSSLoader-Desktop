import { themeContext } from "@contexts/themeContext";
import { Modal, RadioDropdown } from "..";
import { useContext, useState } from "react";
import { Flags } from "ThemeTypes";
import { generatePreset, generatePresetFromThemeNames } from "backend";

export function AddThemeToPresetButton() {
  const { themes, refreshThemes, selectedPreset } = useContext(themeContext);
  const dropdownOptions = themes
    .filter(
      (e) => !selectedPreset?.dependencies.includes(e.name) && !e.flags.includes(Flags.isPreset)
    )
    .map((e) => e.name);

  console.log(themes);
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
          Trigger={
            <>
              <button
                onClick={() => {}}
                className="flex h-full w-fit items-center justify-center gap-2 rounded-full border-2 border-[#2e2e2e] bg-base-5.5-dark px-4 py-2 outline-none"
              >
                <span className="text-sm font-bold">Add more themes</span>
              </button>
            </>
          }
          actionText="Add To Preset"
          onAction={() => {
            if (themeToAdd) {
              generatePresetFromThemeNames(selectedPreset.name, [
                ...selectedPreset.dependencies,
                themeToAdd,
              ]).then(() => {
                refreshThemes(true);
              });
            }
          }}
        ></Modal>
      </>
    );
  }
  return null;
}
