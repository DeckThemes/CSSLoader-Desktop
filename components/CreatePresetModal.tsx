import { useContext, useMemo, useState } from "react";
import { themeContext } from "@contexts/themeContext";
import { checkIfThemeExists, generatePreset, toast } from "../backend";
import { BiPlus } from "react-icons/bi";
import { AlertDialog, LabelledInput, Modal } from "./Primitives";
import { twMerge } from "tailwind-merge";

export function CreatePresetModal({ closeModal }: { closeModal: () => void }) {
  const { themes: localThemeList, refreshThemes } = useContext(themeContext);
  const enabledThemes = useMemo(
    () => localThemeList.filter((e) => e.enabled).length,
    [localThemeList]
  );

  const [presetName, setPresetName] = useState<string>("");
  const nameContainsInvalidCharacters = useMemo(
    () => !!presetName.match(/[\\/:*?\"<>|]/g),
    [presetName]
  );
  const invalidName = useMemo(() => {
    return (
      (presetName.length === 3 || presetName.length === 4) &&
      !!presetName.match(/(LPT\d)|(CO(M\d|N))|(NUL)|(AUX)|(PRN)/g)
    );
  }, [presetName]);

  async function createPreset() {
    if (presetName) {
      const alreadyExists = await checkIfThemeExists(presetName);
      if (alreadyExists) {
        toast("Theme Already Exists!");
        setPresetName("");
        return;
      }
      generatePreset(presetName).then(() => {
        toast("Preset Created Successfully");
        refreshThemes(true);
        setPresetName("");
      });
    }
  }
  return (
    <>
      <AlertDialog
        defaultOpen
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
        actionDisabled={
          presetName.length === 0 ||
          presetName === "New Profile" ||
          nameContainsInvalidCharacters ||
          invalidName
        }
        actionText="Create"
        onAction={createPreset}
        title="Create Profile"
        description={`A profile saves the current state of your themes so that you can quickly re-apply it.`}
        Content={
          <div className="flex w-full items-end gap-2 px-4 pb-4">
            <LabelledInput
              inputClass="bg-base-5.5-light dark:bg-base-5.5-dark"
              label="Profile Name"
              value={presetName}
              onValueChange={setPresetName}
            />
          </div>
        }
      />
      {/* <Modal
        defaultOpen
        Content={
          <div className="flex w-full items-end gap-2 px-4 pb-4">
            <LabelledInput
              inputClass="bg-base-5.5-light dark:bg-base-5.5-dark"
              label="Preset Name"
              value={presetName}
              onValueChange={setPresetName}
            />
          </div>
        }
        actionDisabled={presetName.length === 0}
        actionText="Create"
        onAction={createPreset}
        title="Create Preset"
        description={`This preset will combine ${
          enabledThemes === 1 ? "the " : "all "
        }${enabledThemes} theme${
          enabledThemes === 1 ? "" : "s"
        } you currently have enabled. Enabling/disabling it will toggle them all at once.`}
        // triggerDisabled={enabledThemes === 0}
        // Trigger={
        //   <div
        //     className={`flex h-8 w-fit items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-[#2e2e2e] px-4 py-2 text-sm font-bold ring-brandBlue transition duration-100 focus:ring-2 ${
        //       enabledThemes > 0 ? "bg-[#2563eb]" : "pointer-events-none opacity-50"
        //     }`}
        //   >
        //     <BiPlus />
        //     <span>New Preset</span>
        //   </div>
        // }
      /> */}
    </>
  );
}
