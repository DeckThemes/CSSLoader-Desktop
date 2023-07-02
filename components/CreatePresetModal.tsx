import { useContext, useMemo, useState } from "react";
import { themeContext } from "@contexts/themeContext";
import { checkIfThemeExists, generatePreset, toast } from "../backend";
import { InputAlertDialog } from "./Primitives/InputAlertDialog";

export function CreatePresetModal({ closeModal }: { closeModal: () => void }) {
  const { themes: localThemeList, refreshThemes } = useContext(themeContext);

  const nameContainsInvalidCharacters = (presetName: string) =>
    !!presetName.match(/[\\/:*?\"<>|]/g);

  const invalidName = (presetName: string) => {
    return (
      (presetName.length === 3 || presetName.length === 4) &&
      !!presetName.match(/(LPT\d)|(CO(M\d|N))|(NUL)|(AUX)|(PRN)/g)
    );
  };

  async function createPreset(input: string) {
    if (input) {
      const alreadyExists = await checkIfThemeExists(input);
      if (alreadyExists) {
        toast("Theme Already Exists!");
        return;
      }
      generatePreset(input).then(() => {
        toast("Preset Created Successfully");
        refreshThemes(true);
        closeModal();
      });
    }
  }
  return (
    <>
      <InputAlertDialog
        defaultOpen
        dontCloseOnAction
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
        validateInput={(text: string) => {
          return !(
            text.length === 0 ||
            text === "New Profile" ||
            nameContainsInvalidCharacters(text) ||
            invalidName(text)
          );
        }}
        actionText="Create"
        onAction={createPreset}
        title="Create Profile"
        description={`A profile saves the current state of your themes so that you can quickly re-apply it.`}
        labelText="Profile Name"
        inputClass="bg-base-5.5-light dark:bg-base-5.5-dark"
      />
    </>
  );
}
