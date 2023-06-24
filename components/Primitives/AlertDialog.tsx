import * as AD from "@radix-ui/react-alert-dialog";
import { fontContext } from "@pages/_app";
import { ReactNode, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
export function AlertDialog({
  Trigger = null,
  title,
  description,
  Content,
  Footer = null,
  defaultOpen = false,
  triggerDisabled = false,
  cancelText,
  actionText,
  onOpenChange = () => {},
  dontCloseOnAction = false,
  actionDisabled = false,
  dontClose = false,
  onAction = () => {},
}: {
  Trigger?: ReactNode;
  title: string;
  triggerDisabled?: boolean;
  description?: string;
  Content: ReactNode;
  dontClose?: boolean;
  Footer?: ReactNode;
  dontCloseOnAction?: boolean;
  cancelText?: string;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  actionText?: string;
  actionDisabled?: boolean;
  onAction?: () => void;
}) {
  const { montserrat } = useContext(fontContext);
  const [open, setOpen] = useState<boolean>(defaultOpen);

  return (
    <AD.Root
      open={open}
      onOpenChange={(open) => {
        if (!dontClose && !dontCloseOnAction) {
          setOpen(open);
          onOpenChange(open);
        }
      }}
    >
      {Trigger && <AD.Trigger disabled={triggerDisabled}>{Trigger}</AD.Trigger>}
      <AD.Portal>
        <div className={`${montserrat} font-fancy dark`}>
          <AD.Overlay className="fixed inset-0 bg-app-backdropUmbra-dark" />
          <AD.Content className="modal-shadow fixed top-1/2 left-1/2 flex w-96 -translate-y-1/2 -translate-x-1/2 flex-col items-start justify-start gap-2 rounded-3xl border-borders-base3-light bg-base-3-light outline-none dark:border-borders-base1-dark dark:bg-base-3-dark sm:w-[500px]">
            <div className="flex w-full items-center justify-between px-4 pt-4">
              <AD.Title className="text-lg font-bold">{title}</AD.Title>
            </div>
            {description && <AD.Description className="p-4 text-sm">{description}</AD.Description>}
            {Content}
            <div className="mt-auto flex w-full items-center justify-between rounded-b-3xl bg-base-5.5-dark">
              {!dontClose && (
                <AD.Cancel
                  className={"font-fancy my-2 self-start rounded-2xl p-2 px-6 transition-all"}
                >
                  {cancelText || "Dismiss"}
                </AD.Cancel>
              )}
              {Footer}
              <AD.Action
                onClick={() => !actionDisabled && onAction()}
                className={twMerge(
                  "font-fancy my-2 mr-2 ml-auto rounded-2xl p-2 px-6",
                  !actionDisabled ? "bg-brandBlue" : "bg-base-5.5-dark"
                )}
                disabled={actionDisabled}
              >
                {actionText}
              </AD.Action>
            </div>
          </AD.Content>
        </div>
      </AD.Portal>
    </AD.Root>
  );
}
