import { useContext, useMemo, useState } from "react";
import { CreatePresetModal, RadioDropdown, Tooltip } from "..";
import { themeContext } from "@contexts/themeContext";
import { Flags } from "ThemeTypes";
import { changePreset, deletePreset, setThemeState } from "backend";
import { MenuDropdown } from "@components/Primitives/MenuDropdown";
import { BiTrash } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

export function PresetSelectionDropdown() {
  const { themes, refreshThemes, selectedPreset } = useContext(themeContext);
  const presets = useMemo(() => themes.filter((e) => e.flags.includes(Flags.isPreset)), [themes]);
  const [showModal, setShowModal] = useState(false);
  console.log(
    themes.filter((e) => e.flags.includes(Flags.isPreset) && e.enabled).length > 1
      ? "Invalid State"
      : selectedPreset?.name || "None"
  );

  return (
    <>
      <div className="flex w-full items-center justify-center gap-4">
        {showModal && <CreatePresetModal closeModal={() => setShowModal(false)} />}
        <RadioDropdown
          triggerClass="bg-base-5.5-dark"
          headingText="Selected Profile"
          ariaLabel="Profile Selection Dropdown"
          // value={presets.find((e) => e.enabled)?.name || "Default Profile"}
          value={
            themes.filter((e) => e.flags.includes(Flags.isPreset) && e.enabled).length > 1
              ? "Invalid State"
              : selectedPreset?.name || "None"
          }
          options={[
            // This just ensures that default profile is the first result
            ...(themes.filter((e) => e.flags.includes(Flags.isPreset) && e.enabled).length > 1
              ? ["Invalid State"]
              : []),
            "None",
            ...presets.map((e) => e.name),
            "New Profile",
          ]}
          onValueChange={async (e) => {
            if (e === "New Profile") {
              setShowModal(true);
              return;
            }
            if (e === "Invalid State") return;
            await changePreset(e, themes);
            refreshThemes();
          }}
        />

        <MenuDropdown
          triggerDisabled={!selectedPreset}
          align="end"
          options={[
            {
              displayText: "Delete Profile",
              icon: <BiTrash size={20} />,
              onSelect: async () => {
                deletePreset(selectedPreset!.name, themes, refreshThemes);
              },
            },
          ]}
          triggerClass={twMerge(
            "h-12 w-12 self-end rounded-xl border-2 border-borders-base1-dark bg-base-5.5-dark transition-all hover:border-borders-base2-dark",
            !selectedPreset && "opacity-50"
          )}
        />
      </div>
    </>
  );
}
