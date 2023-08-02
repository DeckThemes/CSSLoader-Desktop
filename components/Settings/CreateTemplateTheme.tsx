import { useContext } from "react";
import { checkIfThemeExists, downloadTemplate, toast } from "backend";
import { ImSpinner5 } from "react-icons/im";
import { themeContext } from "@contexts/themeContext";
import { InputAlertDialog } from "@components/Primitives/InputAlertDialog";

export function CreateTemplateTheme({ ongoingAction }: { ongoingAction: boolean }) {
  const { refreshThemes } = useContext(themeContext);
  const nameContainsInvalidCharacters = (presetName: string) =>
    !!presetName.match(/[\\/:*?\"<>|]/g);

  const invalidName = (presetName: string) => {
    return (
      (presetName.length === 3 || presetName.length === 4) &&
      !!presetName.match(/(LPT\d)|(CO(M\d|N))|(NUL)|(AUX)|(PRN)/g)
    );
  };
  return (
    <>
      <InputAlertDialog
        labelText="Theme Name"
        validateInput={(text: string) => {
          return !(text.length === 0 || nameContainsInvalidCharacters(text) || invalidName(text));
        }}
        onAction={async (name) => {
          const alreadyExists = await checkIfThemeExists(name);
          if (alreadyExists) {
            toast("Theme Already Exists!");
            return;
          }
          downloadTemplate(name).then((success) => {
            toast(success ? "Template Created Successfully" : "Error Creating Template");
            refreshThemes(true);
          });
        }}
        actionText="Create"
        title="Create Template Theme"
        description={`This will create a blank theme in your themes folder that you can use as the starting point for your own theme.`}
        triggerDisabled={ongoingAction}
        Trigger={
          <div className="flex h-12 w-full items-center justify-center whitespace-nowrap rounded-xl bg-base-3-dark px-4">
            {ongoingAction ? <ImSpinner5 /> : "Create Template Theme"}
          </div>
        }
      />
    </>
  );
}
