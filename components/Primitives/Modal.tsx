import { fontContext } from "@contexts/FontContext";
import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode, useContext } from "react";
import { twMerge } from "tailwind-merge";
export function Modal({
  Trigger = null,
  title,
  description,
  Content,
  Footer = null,
  triggerDisabled = false,
  actionDisabled = false,
  actionText = "",
  onAction = () => {},
  defaultOpen = false,
}: {
  Trigger?: ReactNode;
  title: string;
  defaultOpen?: boolean;
  triggerDisabled?: boolean;
  description?: string;
  Content: ReactNode;
  Footer?: ReactNode;
  actionDisabled?: boolean;
  actionText?: string;
  onAction?: () => void;
}) {
  const { montserrat } = useContext(fontContext);

  return (
    <Dialog.Root modal defaultOpen={defaultOpen}>
      <Dialog.Trigger disabled={triggerDisabled}>{Trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <div className={`${montserrat} font-fancy dark`}>
          <Dialog.Overlay className="fixed inset-0 bg-app-backdropUmbra-dark" />
          <Dialog.Content className="modal-shadow fixed top-1/2 left-1/2 flex w-96 -translate-y-1/2 -translate-x-1/2 flex-col items-start justify-start gap-2 rounded-3xl border-borders-base3-light bg-base-3-light  dark:border-borders-base1-dark dark:bg-base-3-dark sm:w-[500px]">
            <div className="flex w-full items-center justify-between px-4 pt-4">
              <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
            </div>
            {description && (
              <Dialog.Description className="p-4 text-sm">{description}</Dialog.Description>
            )}
            {Content}
            <div className="mt-auto flex w-full items-center justify-center rounded-b-3xl bg-base-5.5-dark">
              <Dialog.Close>
                <button
                  className={"font-fancy my-2 self-start rounded-2xl p-2 px-6 transition-all"}
                >
                  Dismiss
                </button>
              </Dialog.Close>
              {Footer}
              <Dialog.Close
                onClick={onAction}
                disabled={actionDisabled}
                className={twMerge(
                  "font-fancy my-2 mr-2 ml-auto rounded-2xl p-2 px-6 transition-all",
                  !actionDisabled ? "bg-brandBlue" : "bg-base-5.5-dark opacity-50"
                )}
              >
                {actionText}
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
