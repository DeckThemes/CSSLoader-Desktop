import { useEffect, useRef } from "react";
import * as python from "../backend";

export default function Store() {
  const storeRef = useRef<HTMLIFrameElement>();

  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        console.log("MESSAGE RECEIVED BACK FROM IFRAME", event.data);
        if (event.origin !== "https://beta.deckthemes.com") return;
        // THIS IS DECKTHEMES URL ABOVE

        if (event.data.action === "isThisDesktopApp") {
          console.log("is desktop app");
          storeRef.current?.contentWindow?.postMessage(
            "enableDesktopAppMode",
            event.origin
          );
        }

        if (event.data.action === "installTheme") {
          console.log("INSTALL THEME", event.data);
          python.downloadThemeFromUrl(event.data.payload);
        }
      },
      false
    );
  }, []);
  return (
    <>
      <div>
        <h1>test</h1>
        <iframe
          ref={storeRef}
          src='https://beta.deckthemes.com'
          className='w-screen h-screen'
        />
      </div>
    </>
  );
}
