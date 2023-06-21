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
      <main className="relative flex h-full w-full flex-grow flex-col items-center justify-center pb-10">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <h1 className="font-fancy text-5xl font-semibold">CSSLoader</h1>
          <div className="flex items-center justify-center gap-4">
            <ImSpinner5 size={64} className="animate-spin" />
            <h1 className="font-fancy text-3xl">Loading Backend</h1>
          </div>
        </div>
        <button
          disabled={!hasWaited}
          className="font-fancy absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-cardDark p-2 px-4 transition-all"
          style={{ opacity: hasWaited ? 1 : 0 }}
          onClick={() => hasWaited && forceRestart()}
        >
          Force Restart Backend
        </button>
      </main>
    </>
  );
}
