import { useContext, useEffect, useRef } from "react";
import * as python from "../backend";
import { themeContext } from "./_app";

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
          console.log("INSTALL THEME", event.data);
          python.downloadThemeFromUrl(event.data.payload).then(refreshThemes);
        }
      },
      false
    );
  }, []);
  return (
    <>
      <div className='flex-grow flex flex-col'>
        <iframe
          // @ts-ignore
          ref={storeRef}
          src='https://beta.deckthemes.com'
          className='w-screen h-full flex-grow'
        />
      </div>
    </>
  );
}
