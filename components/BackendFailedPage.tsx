import { Command } from "@tauri-apps/api/shell";
import { useEffect, useState } from "react";
import { ImSpinner5 } from "react-icons/im";
import { startBackend } from "../backend";
import Image from "next/image";

export function BackendFailedPage() {
  const [hasWaited, setWaited] = useState<boolean>(false);

  const [canRestart, setCanRestart] = useState(true);
  useEffect(() => {
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
          <h3 className="text-xs font-medium text-fore-9-dark">
            We're loading right now, sit tight.
          </h3>
        </div>
        <button
          disabled={!hasWaited}
          className="font-fancy absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border-2 border-borders-base1-dark bg-base-3-dark p-2 px-4 text-xs font-bold transition-all duration-300 hover:border-borders-base2-dark"
          style={{ opacity: hasWaited ? 1 : 0 }}
          onClick={() => hasWaited && forceRestart()}
        >
          Force Restart Backend
        </button>
      </main>
    </>
  );
}
