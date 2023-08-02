import { AlertDialog } from "./AlertDialog";
import { FormEvent, ReactNode, useState } from "react";
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.validateInput(inputValue)) {
      props.onAction(inputValue);
    }
  };

  return (
    <AlertDialog
      {...props}
      onAction={() => {
        if (props.validateInput(inputValue)) {
          props.onAction(inputValue);
        }
      }}
      actionDisabled={!props.validateInput(inputValue)}
      Content={
        <form className="contents" onSubmit={handleSubmit}>
          <div className="flex w-full items-end gap-2 px-4 pb-4">
            <LabelledInput
              inputClass="bg-base-5.5-light dark:bg-base-5.5-dark"
              label={props.labelText}
              value={inputValue}
              onValueChange={setInputValue}
            />
          </div>
        </form>
      }
    />
  );
}
