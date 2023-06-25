import { useState } from "react";
import { ImSpinner5 } from "react-icons/im";
import { downloadBackend, killBackend, startBackend } from "../backend";
import { AlertDialog } from "./Primitives";

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
