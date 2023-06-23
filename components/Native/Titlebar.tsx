import { appWindow } from "@tauri-apps/api/window";
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from "react-icons/vsc";
import { useEffect, useState } from "react";
import { useInterval } from "@hooks/useInterval";
import Image from "next/image";
import Link from "next/link";

const Titlebar = () => {
  const [maximized, setMaximized] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const tauriInterval = useInterval(() => {
    appWindow.isMaximized().then(setMaximized);
    appWindow.isFullscreen().then(setFullscreen);
  }, 200);

  useEffect(() => {
    tauriInterval.start();
    return tauriInterval.stop;
  }, []);

  return (
    !fullscreen && (
      <>
        <div
          data-tauri-drag-region
          className="fixed top-0 left-0 right-0 z-[2147483647] flex h-8 cursor-default select-none flex-row dark:bg-base-6-dark"
        >
          <div className="absolute top-0 left-0 flex h-full">
            <Link
              href="/"
              className="group flex items-center gap-2 transition duration-150 hover:scale-95 hover:active:scale-90 p-2"
            >
              <Image
                src="logo_css_darkmode.png"
                width={16}
                height={16}
                alt="CSSLoader Logo"
                className="transition duration-[750ms] group-hover:brightness-150 group-hover:hue-rotate-180"
              />
            </Link>
          </div>
          <div className="absolute top-0 right-0 flex h-full">
            {/* window icons */}
            <div
              className={`grid h-full w-12 place-content-center`}
              onClick={() => appWindow.minimize()}
            >
              <VscChromeMinimize className={``} />
            </div>
            {maximized ? (
              <div
                className={`grid h-full w-12 place-content-center`}
                onClick={() => appWindow.toggleMaximize()}
              >
                <VscChromeRestore className={``} />
              </div>
            ) : (
              <div
                className={`grid h-full w-12 place-content-center`}
                onClick={() => appWindow.toggleMaximize()}
              >
                <VscChromeMaximize className={``} />
              </div>
            )}
            <div
              className={`grid h-full w-12 place-content-center`}
              onClick={() => appWindow.close()}
            >
              <VscChromeClose className={``} />
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Titlebar;
