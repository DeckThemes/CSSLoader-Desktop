import { useContext, useMemo, useState } from "react";
import { CreatePresetModal, RadioDropdown } from "..";
import { themeContext } from "@contexts/themeContext";
import { Flags } from "ThemeTypes";
import { changePreset, setThemeState } from "backend";

export function PresetSelectionDropdown() {
  const { themes, refreshThemes } = useContext(themeContext);
  const presets = useMemo(() => themes.filter((e) => e.flags.includes(Flags.isPreset)), [themes]);
  const [showModal, setShowModal] = useState(false);

  console.log(showModal);

  return (
    <>
      {showModal && <CreatePresetModal closeModal={() => setShowModal(false)} />}
      <RadioDropdown
        triggerClass="bg-base-5.5-dark"
        headingText="Selected Profile"
        ariaLabel="Profile Selection Dropdown"
        value={presets.find((e) => e.enabled)?.name || "Default Profile"}
        options={[
          // This just ensures that default profile is the first result
          "Default Profile",
          ...presets.map((e) => e.name).filter((e) => e !== "Default Profile"),
          "New Profile",
        ]}
        onValueChange={async (e) => {
          if (e === "New Profile") {
            setShowModal(true);
            return;
          }
          await changePreset(e, themes);
          refreshThemes();
        }}
      />
    </>
  );
}
