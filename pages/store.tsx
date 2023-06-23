import { useContext, useEffect, useRef } from "react";
import { themeContext } from "./_app";
import { allowedStoreOrigins, storeUrl } from "../constants";
import { downloadThemeFromUrl, storeRead, toast } from "../backend";

export default function Store() {
  const storeRef = useRef<HTMLIFrameElement>();

  const { refreshThemes } = useContext(themeContext);

  useEffect(() => {
    function listener(event: any) {
      if (!allowedStoreOrigins.includes(event.origin)) return;
      if (event.data.action === "installTheme") {
        downloadThemeFromUrl(event.data.payload).then(() => {
          toast(`Theme Installed`);
          refreshThemes(true);
          storeRef.current?.contentWindow?.postMessage({ action: "themeInstalled" }, event.origin);
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
      <main className="page-shadow mx-4 flex w-full max-w-[calc(100vw-2rem)] flex-1 flex-grow flex-col items-center gap-4 rounded-3xl border-[1px] border-borders-base3-light bg-base-2-light dark:border-borders-base1-dark dark:bg-base-2-dark">
        <iframe
          // @ts-ignore
          ref={storeRef}
          src={storeUrl}
          onLoad={() => {
            storeRead("shortToken").then((res) => {
              if (res.success && res.result !== undefined) {
                storeRef.current?.contentWindow?.postMessage(
                  { action: "logInWithToken", payload: res.result },
                  "*"
                );
              }
            });
          }}
          style={{ background: "transparent !important" }}
          width={"100%"}
          height={"100%"}
          loading="eager"
          className="iframe-load-animation h-full w-full flex-grow rounded-3xl !bg-transparent"
        />
      </main>
    </>
  );
}
