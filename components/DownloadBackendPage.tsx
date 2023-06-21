import { useState } from "react";
import { ImSpinner5 } from "react-icons/im";
import { downloadBackend, killBackend, startBackend } from "../backend";
import { FiXCircle } from "react-icons/fi";

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
      <main className="flex flex-col w-full h-full items-center justify-center flex-grow gap-4 relative">
        {!onboarding && installProg === 0 ? (
          <FiXCircle
            size={48}
            className="absolute top-4 right-4 cursor-pointer"
            onClick={hideWindow}
          />
        ) : null}

        <h1 className="font-fancy text-5xl font-semibold">
          {onboarding ? "Welcome To CSSLoader" : "Backend Update Available"}
        </h1>
        <button
          onClick={() => installProg <= 0 && installBackend()}
          disabled={installProg > 0}
          className="p-4 bg-cardDark rounded-3xl transition-all"
        >
          {installProg > 0 ? (
            <div className="flex items-center justify-center gap-4">
              <ImSpinner5 className="animate-spin" size={64} />
              <span className="font-fancy text-2xl">{installText}</span>
            </div>
          ) : (
            <h2 className="font-fancy text-3xl">
              Install Backend{backendVersion ? ` ${backendVersion}` : ""}
            </h2>
          )}
        </button>
      </main>
    </>
  );
}
