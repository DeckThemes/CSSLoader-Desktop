import { Command } from "@tauri-apps/api/shell";
import { useEffect, useState } from "react";
import { ImSpinner5 } from "react-icons/im";
import { startBackend } from "../backend";
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
      <main className="relative w-full h-full flex-grow flex flex-col items-center justify-center pb-10">
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <h1 className="fancy-font text-5xl font-semibold">CSSLoader</h1>
          <div className="flex items-center justify-center gap-4">
            <ImSpinner5 size={64} className="animate-spin" />
            <h1 className="text-3xl fancy-font">Loading Backend</h1>
          </div>
        </div>
        <button
          disabled={!hasWaited}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 fancy-font bg-cardDark rounded-md px-4 transition-all"
          style={{ opacity: hasWaited ? 1 : 0 }}
          onClick={() => hasWaited && forceRestart()}
        >
          Force Restart Backend
        </button>
      </main>
    </>
  );
}
