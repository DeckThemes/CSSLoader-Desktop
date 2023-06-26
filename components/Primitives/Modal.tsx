import { fontContext } from "@contexts/FontContext";
import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode, useContext } from "react";
export function Modal({
  Trigger = null,
  title,
  description,
  Content,
  Footer = null,
  triggerDisabled = false,
}: {
  Trigger?: ReactNode;
  title: string;
  triggerDisabled?: boolean;
  description?: string;
  Content: ReactNode;
  Footer?: ReactNode;
}) {
  const { montserrat } = useContext(fontContext);

  return (
    <Dialog.Root modal>
      <Dialog.Trigger className="outline-none" disabled={triggerDisabled}>
        {Trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <div className={`${montserrat} font-fancy dark`}>
          <Dialog.Overlay className="fixed inset-0 bg-app-backdropUmbra-dark" />
          <Dialog.Content className="modal-shadow fixed top-1/2 left-1/2 flex w-96 -translate-y-1/2 -translate-x-1/2 flex-col items-start justify-start gap-2 rounded-3xl border-borders-base3-light bg-base-3-light outline-none dark:border-borders-base1-dark dark:bg-base-3-dark sm:w-[500px]">
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
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
