import { useContext, useEffect, useRef } from "react";
import * as python from "../backend";
import { themeContext } from "./_app";
import { toast } from "react-toastify";

export default function Store() {
  const storeRef = useRef<HTMLIFrameElement>();

  const { refreshThemes } = useContext(themeContext);

  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (
          event.origin !== "https://beta.deckthemes.com" &&
          event.origin !== "https://deckthemes.com"
        )
          return;

        if (event.data.action === "isThisDesktopApp") {
          storeRef.current?.contentWindow?.postMessage(
            "enableDesktopAppMode",
            event.origin
          );
        }

        if (event.data.action === "installTheme") {
          python.downloadThemeFromUrl(event.data.payload).then(() => {
            refreshThemes();
            storeRef.current?.contentWindow?.postMessage(
              "themeInstalled",
              event.origin
            );
          });
        }
      },
      false
    );
  }, []);
  return (
    <>
      <div className="h-full flex-grow flex flex-col">
        <iframe
          // @ts-ignore
          ref={storeRef}
          src="https://deckthemes.com"
          className="w-full h-full flex-grow"
        />
      </div>
    </>
  );
}
