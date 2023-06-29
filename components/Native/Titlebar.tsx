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
import * as Portal from "@radix-ui/react-portal";

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
        <Portal.Root style={{ pointerEvents: "all", cursor: "default" }}>
          <div
            data-tauri-drag-region
            className="cssloader-titlebar fixed z-[2147483647] flex h-8 !cursor-default select-none flex-row overflow-hidden rounded-t-lg bg-base-6-dark"
          >
            <div draggable={false} className="absolute top-0 left-0 flex h-full select-none">
              <Link
                href="/"
                tabIndex={-1}
                draggable={false}
                className="group flex !cursor-default items-center gap-2 !border-0 p-2 !outline-none transition duration-150 hover:scale-95 hover:active:scale-90"
              >
                <Image
                  src="logo_css_darkmode.png"
                  width={16}
                  height={16}
                  alt="CSSLoader Logo"
                  className="transition duration-[750ms] group-hover:brightness-150 group-hover:hue-rotate-180"
                  draggable={false}
                />
                <Image
                  src="CSSLoaderWordmark.svg"
                  width={70}
                  height={16}
                  alt="CSSLoader Logo"
                  className="transition duration-[750ms]"
                  draggable={false}
                />
              </Link>
            </div>
            <div className="absolute top-0 right-0 flex h-full">
              {/* window icons */}
              <div
                className={`grid h-full w-[47.5px] place-content-center hover:bg-[#3f3f3f] hover:active:bg-[#333333]`}
                onClick={() => appWindow.minimize()}
              >
                <VscChromeMinimize className={``} />
              </div>
              {maximized ? (
                <div
                  className={`grid h-full w-[47.5px] place-content-center hover:bg-[#3f3f3f] hover:active:bg-[#333333]`}
                  onClick={() => appWindow.toggleMaximize()}
                >
                  <VscChromeRestore className={``} />
                </div>
              ) : (
                <div
                  className={`grid h-full w-[47.5px] place-content-center hover:bg-[#3f3f3f] hover:active:bg-[#333333]`}
                  onClick={() => appWindow.toggleMaximize()}
                >
                  <VscChromeMaximize className={``} />
                </div>
              )}
              <div
                className={`grid h-full w-[47.5px] place-content-center hover:bg-[#cd1a2b] hover:active:bg-[#941320]`}
                onClick={() => appWindow.close()}
              >
                <VscChromeClose className={``} />
              </div>
            </div>
          </div>
        </Portal.Root>
      </>
    )
  );
};

export default Titlebar;
