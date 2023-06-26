import { useState } from "react";
import { ImSpinner5 } from "react-icons/im";
import { downloadBackend, killBackend, startBackend } from "../backend";
import { AlertDialog } from "./Primitives";
import { GenericInstallBackendModal } from "./GenericInstallBackendModal";

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
      <GenericInstallBackendModal
        titleText={onboarding ? "Install CSSLoader's Backend" : "Backend Update Available"}
        dontClose={installProg > 0 || onboarding}
        descriptionText={
          onboarding
            ? "CSSLoader's backend allows it to inject your CSS into Steam. You must install it to use CSSLoader Desktop"
            : "We recommend installing backend updates as soon as they're available in order to maintain compatibility with new themes."
        }
        {...{ installProg, installText }}
        onAction={() => installBackend()}
        onCloseWindow={() => hideWindow()}
      />
    </>
  );
}
