import { ImSpinner5 } from "react-icons/im";
import { AlertDialog } from "./Primitives";
import { ReactNode } from "react";

export function GenericInstallBackendModal({
  titleText,
  installProg,
  installText,
  dontClose,
  onAction = () => {},
  descriptionText,
  onCloseWindow = () => {},
  Trigger = null,
}: {
  titleText: string;
  Trigger?: ReactNode;
  // Install prog is an arbitrary number, not a real "progress percent", it just need to be >0 to convey an install is underway
  installProg: number;
  installText: string;
  onAction?: () => void;
  dontClose?: boolean;
  onCloseWindow?: () => void;
  descriptionText?: string;
}) {
  return (
    <>
      <AlertDialog
        defaultOpen={!Trigger}
        Trigger={Trigger}
        dontCloseOnAction
        onAction={onAction}
        actionDisabled={installProg > 0}
        dontClose={dontClose}
        onOpenChange={(open) => {
          if (!open) {
            onCloseWindow();
          }
        }}
        title={titleText}
        description={descriptionText}
        actionText={
          installProg > 0 ? (
            <>
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex items-center justify-center gap-4">
                  <ImSpinner5 className="animate-spin" size={20} />
                  <span className="font-fancy text-">{installText}</span>
                </div>
              </div>
            </>
          ) : (
            "Install"
          )
        }
      />
    </>
  );
}
