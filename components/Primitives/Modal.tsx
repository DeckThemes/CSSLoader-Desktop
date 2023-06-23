import { fontContext } from "@pages/_app";
import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode, useContext } from "react";
import { FiX } from "react-icons/fi";
export function Modal({
  Trigger,
  title,
  description,
  Content,
  Footer = null,
  triggerDisabled = false,
}: {
  Trigger: ReactNode;
  title: string;
  triggerDisabled?: boolean;
  description?: string;
  Content: ReactNode;
  Footer?: ReactNode;
}) {
  const { montserrat } = useContext(fontContext);
  return (
    <Dialog.Root modal>
      <Dialog.Trigger disabled={triggerDisabled}>{Trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <div className={`${montserrat} font-fancy dark`}>
          <Dialog.Overlay className="fixed inset-0 bg-app-backdropUmbra-dark" />
          <Dialog.Content className="modal-shadow fixed top-1/2 left-1/2 flex w-96 -translate-y-1/2 -translate-x-1/2 flex-col items-start justify-start gap-2 rounded-3xl border-borders-base3-light bg-base-3-light outline-none dark:border-borders-base1-dark dark:bg-base-3-dark sm:w-[500px]">
            <div className="flex w-full items-center justify-between px-4 pt-4">
              <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
              <Dialog.Close>
                <FiX size={24} />
              </Dialog.Close>
            </div>
            {description && (
              <Dialog.Description className="p-4 text-sm">{description}</Dialog.Description>
            )}
            {Content}
            {Footer && (
              <div className="mt-auto flex w-full items-center justify-end rounded-b-3xl bg-base-5.5-dark">
                {Footer}
              </div>
            )}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
