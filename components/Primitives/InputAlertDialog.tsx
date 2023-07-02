import { AlertDialog } from "./AlertDialog";
import { ReactNode, useState } from "react";
import { LabelledInput } from "./LabelledField";

export function InputAlertDialog(props: {
  Trigger?: ReactNode;
  title: string;
  triggerDisabled?: boolean;
  description?: string;
  Content?: ReactNode;
  dontClose?: boolean;
  Footer?: ReactNode;
  dontCloseOnAction?: boolean;
  cancelText?: string;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  actionText?: string | ReactNode;
  actionDisabled?: boolean;
  customAction?: ReactNode;
  onAction: (input: string) => void;
  actionClass?: string;
  labelText: string;
  inputClass?: string;
  labelClass?: string;
  rootClass?: string;
  validateInput: (e: string) => boolean;
}) {
  const [inputValue, setInputValue] = useState("");

  return (
    <AlertDialog
      {...props}
      onAction={() => {
        props.onAction(inputValue);
      }}
      actionDisabled={!props.validateInput(inputValue)}
      Content={
        <div className="flex w-full items-end gap-2 px-4 pb-4">
          <LabelledInput
            onKeyDown={(e) => {
              if (e.key === "Enter" && props.validateInput(inputValue)) {
                props.onAction(inputValue);
              }
            }}
            inputClass="bg-base-5.5-light dark:bg-base-5.5-dark"
            label={props.labelText}
            value={inputValue}
            onValueChange={setInputValue}
          />
        </div>
      }
    />
  );
}
