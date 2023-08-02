import { useEffect, useState, useContext } from "react";
import { startBackend } from "../backend";
import Image from "next/image";
import { backendStatusContext } from "@contexts/backendStatusContext";
import { osContext } from "@contexts/osContext";

function BackendLoadingTagline() {
  const [tagline, setTagline] = useState<string>("");
  const taglines: string[] = [
    `Creating a color pallete...`,
    `Busy setting gradients...`,
    `Preparing the store now...`,
    `Breaking all of your settings...`,
    `Waking up the backend...`,
    `Janking up Steam...`,
    `Switching font-fancy and fancy-font around...`,
    `Spilling paint all over...`,
    `Inspecting class names...`,
    `Loading the CSS...`,
    `Rounding the corners...`,
    `Making the memes extra such...`,
  ];

  useEffect(() => {
    const interval = setInterval(getTagline, 2500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getTagline = () => {
    const i = Math.floor(Math.random() * taglines.length);
    setTagline(taglines[i]);
  };

  return <>{tagline && <h3 className="text-xs font-medium text-fore-9-dark">{tagline}</h3>}</>;
}

export function BackendFailedPage() {
  const { isWindows } = useContext(osContext);
  const { recheckDummy } = useContext(backendStatusContext);
  const [hasWaited, setWaited] = useState<boolean>(false);
  const [canRestart, setCanRestart] = useState(true);
  useEffect(() => {
    recheckDummy();
    setTimeout(() => {
      setWaited(true);
    }, 10000);
  }, []);

  async function forceRestart() {
    if (canRestart) {
      setCanRestart(true);
      startBackend();
    }
  }
  return (
    <>
      <main className="relative flex h-full w-full flex-grow flex-col items-center justify-center pb-10">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <Image
            src="logo_css_darkmode.png"
            width={64}
            height={64}
            alt="CSSLoader Logo"
            className="backend-loading-animation"
            draggable={false}
          />
          <h1 className="font-fancy text-xl font-extrabold tracking-tight">Welcome to CSSLoader</h1>
          {isWindows ? (
            <BackendLoadingTagline />
          ) : (
            <span className="w-full max-w-xl text-center text-sm">
              CSSLoader Desktop could not communicate with the backend. Please ensure you have{" "}
              <span
                className="cursor-pointer text-brandBlue underline"
                onClick={async () => {
                  const { open } = await import("@tauri-apps/api/shell");
                  await open("https://docs.deckthemes.com/CSSLoader/Install/#linux-or-steam-deck");
                }}
              >
                followed the instructions and installed it
              </span>
              .
            </span>
          )}
        </div>
        {isWindows && (
          <button
            disabled={!hasWaited}
            className="font-fancy absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border-2 border-borders-base1-dark bg-base-3-dark p-2 px-4 text-xs font-bold transition-all duration-300 hover:border-borders-base2-dark"
            style={{ opacity: hasWaited ? 1 : 0 }}
            onClick={() => hasWaited && forceRestart()}
          >
            Force Restart Backend
          </button>
        )}
      </main>
    </>
  );
}
