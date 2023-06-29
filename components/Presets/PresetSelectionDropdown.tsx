import { useContext, useMemo, useState } from "react";
import { CreatePresetModal, RadioDropdown } from "..";
import { themeContext } from "@contexts/themeContext";
import { Flags } from "ThemeTypes";
import { setThemeState } from "backend";

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
        value={presets.find((e) => e.enabled)?.name || "None"}
        options={["None", ...presets.map((e) => e.name), "New Profile"]}
        onValueChange={async (e) => {
          if (e === "New Profile") {
            setShowModal(true);
            return;
          }
          // Disables all themes before enabling the preset
          await Promise.all(
            themes.filter((e) => e.enabled).map((e) => setThemeState(e.name, false))
          );

          await setThemeState(e, true);
          refreshThemes();
        }}
      />
    </>
  );
}
