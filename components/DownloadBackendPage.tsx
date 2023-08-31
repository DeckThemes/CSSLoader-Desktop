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
    setInstallText("Downloading Backend");
    await downloadBackend();
    setInstallProg(100);
    setInstallText("Install Complete");
    setTimeout(() => {
      onUpdateFinish();
    }, 1000);
  }

  return (
    <>
      <GenericInstallBackendModal
        titleText={onboarding ? "Install CSSLoader's Backend" : "Backend Update Available"}
        dontClose={installProg > 0 || onboarding}
        descriptionText={
          onboarding ? (
            <>
              <span>
                You must install CSSLoader's Backend to use CSSLoader Desktop. If you wish to use
                custom images and fonts, you must{" "}
                <span
                  className="cursor-pointer font-bold underline"
                  onClick={async () => {
                    const { open } = await import("@tauri-apps/api/shell");
                    open("https://docs.deckthemes.com/CSSLoader/Install/#standalone");
                  }}
                >
                  enable Windows Developer Mode.
                </span>
              </span>
            </>
          ) : (
            "We recommend installing backend updates as soon as they're available in order to maintain compatibility with new themes."
          )
        }
        {...{ installProg, installText }}
        onAction={() => installBackend()}
        onCloseWindow={() => hideWindow()}
      />
    </>
  );
}
