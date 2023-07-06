import { useContext, useEffect, useRef } from "react";
import { themeContext } from "@contexts/themeContext";
import { allowedStoreOrigins, storeUrl } from "../constants";
import { downloadThemeFromUrl, sleep, storeRead, toast } from "../backend";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Store() {
  const storeRef = useRef<HTMLIFrameElement>();
  const router = useRouter();
  const { refreshThemes, themes } = useContext(themeContext);

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
      if (event.data.action === "tokenRedirect") {
        router.push("/settings");
      }
    }
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);
  return (
    <>
      <div className="relative flex h-full w-full flex-1 flex-grow flex-col items-center gap-4">
        <iframe
          // @ts-ignore
          ref={storeRef}
          src={storeUrl}
          onLoad={async () => {
            // Not sure if theres a better version of onLoad that waits until the iframe can receive messages
            // This works though
            await sleep(1000);
            storeRef.current?.contentWindow?.postMessage(
              {
                action: "provideInstallState",
                payload: themes.map((e) => ({ name: e.name, id: e.id, version: e.version })),
              },
              "*"
            );
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
          className="iframe-load-animation h-full w-full flex-grow !bg-transparent"
        />
        <Image
          src="logo_css_darkmode.png"
          width={64}
          height={64}
          alt="CSSLoader Logo"
          className="store-loading-animation pointer-events-none absolute"
          draggable={false}
        />
      </div>
    </>
  );
}
