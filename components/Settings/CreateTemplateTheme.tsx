import { useMemo, useState, useContext } from "react";
import { LabelledInput, Modal } from "..";
import { downloadTemplate, toast } from "backend";
import { ImSpinner5 } from "react-icons/im";
import { themeContext } from "@contexts/themeContext";

export function CreateTemplateTheme({ ongoingAction }: { ongoingAction: boolean }) {
  const { refreshThemes } = useContext(themeContext);
  const [name, setName] = useState<string>("");
  const nameContainsInvalidCharacters = useMemo(() => !!name.match(/[\\/:*?\"<>|]/g), [name]);
  const invalidName = useMemo(() => {
    return (
      (name.length === 3 || name.length === 4) &&
      !!name.match(/(LPT\d)|(CO(M\d|N))|(NUL)|(AUX)|(PRN)/g)
    );
  }, [name]);
  return (
    <>
      <Modal
        Content={
          <div className="flex w-full items-end gap-2 px-4 pb-4">
            <LabelledInput
              inputClass="bg-base-5.5-light dark:bg-base-5.5-dark"
              label="Theme Name"
              value={name}
              onValueChange={setName}
            />
          </div>
        }
        actionDisabled={name.length === 0 || nameContainsInvalidCharacters || invalidName}
        actionText="Create"
        onAction={() =>
          downloadTemplate(name).then((success) => {
            if (!success) {
              toast("Error Creating Template");
            }
            refreshThemes(true);
          })
        }
        title="Create Template Theme"
        description={`This will create a blank theme in your themes folder that you can use as the starting point for your own theme.`}
        triggerDisabled={ongoingAction}
        Trigger={
          <button
            disabled={ongoingAction}
            className="flex h-12 w-full items-center justify-center whitespace-nowrap rounded-xl bg-base-3-dark px-4"
          >
            {ongoingAction ? <ImSpinner5 /> : "Create Template Theme"}
          </button>
        }
      />
    </>
  );
}
