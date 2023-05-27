import { useContext, useEffect, useRef } from "react";
import { themeContext } from "./_app";
import { allowedStoreOrigins, storeUrl } from "../constants";
import { downloadThemeFromUrl, toast } from "../backend";

export default function Store() {
  const storeRef = useRef<HTMLIFrameElement>();

  const { refreshThemes } = useContext(themeContext);

  useEffect(() => {
    function listener(event: any) {
      if (!allowedStoreOrigins.includes(event.origin)) return;

      if (event.data.action === "isThisDesktopApp") {
        storeRef.current?.contentWindow?.postMessage(
          "enableDesktopAppMode",
          event.origin
        );
      }

      if (event.data.action === "installTheme") {
        downloadThemeFromUrl(event.data.payload).then(() => {
          toast(`Theme Installed`);
          refreshThemes();
          storeRef.current?.contentWindow?.postMessage(
            "themeInstalled",
            event.origin
          );
        });
      }
    }
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);
  return (
    <>
      <div className="h-full flex-grow flex flex-col">
        <iframe
          // @ts-ignore
          ref={storeRef}
          src={storeUrl}
          className="w-full h-full flex-grow"
        />
      </div>
    </>
  );
}
