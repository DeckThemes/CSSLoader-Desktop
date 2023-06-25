import { useState } from "react";
import { ImSpinner5 } from "react-icons/im";
import { downloadBackend, killBackend, startBackend } from "../backend";
import { FiXCircle } from "react-icons/fi";
import { AlertDialog } from "./Primitives";
import { twMerge } from "tailwind-merge";

export function DownloadBackendPage({
  onboarding = false,
  hideWindow,
  backendVersion,
  onUpdateFinish,
}: {
  onboarding?: boolean;
  hideWindow?: any;
  backendVersion?: string;
  onUpdateFinish?: any;
}) {
  const [installProg, setInstallProg] = useState<number>(0);
  const [installText, setInstallText] = useState<string>("");
  async function installBackend() {
    setInstallProg(1);
    function doTheInstall() {
      setInstallText("Downloading Backend");
      downloadBackend(async () => {
        setInstallProg(50);
        setInstallText("Starting Backend");
        startBackend(() => {
          setInstallProg(100);
          setInstallText("Install Complete");
          setTimeout(() => {
            onUpdateFinish();
          }, 1000);
        });
      });
    }
    if (onboarding) {
      doTheInstall();
    } else {
      setInstallText("Stopping Backend");
      killBackend(() => {
        doTheInstall();
      });
    }
  }

  return (
    <>
      <AlertDialog
        defaultOpen
        dontCloseOnAction
        onAction={() => installBackend()}
        actionDisabled={installProg > 0}
        dontClose={installProg > 0 || onboarding}
        onOpenChange={(open) => {
          if (!open) {
            hideWindow();
          }
        }}
        title={onboarding ? "Install CSSLoader's Backend" : "Backend Update Available"}
        description={
          onboarding
            ? "CSSLoader's backend allows it to inject your CSS into Steam. You must install it to use CSSLoader Desktop"
            : "We recommend installing backend updates as soon as they're available in order to maintain compatibility with new themes."
        }
        Content={
          <div className="flex h-full w-full items-center justify-center pb-8 pt-4">
            {installProg > 0 && (
              <div className="flex items-center justify-center gap-4">
                <ImSpinner5 className="animate-spin" size={32} />
                <span className="font-fancy text-2xl">{installText}</span>
              </div>
            )}
          </div>
        }
        actionText={installProg > 0 ? "Installing..." : "Install"}
      />
    </>
  );
}
