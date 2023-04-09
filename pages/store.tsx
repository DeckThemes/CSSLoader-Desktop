import { useRef, useEffect } from "react";

export default function Store() {
  const iframeRef = useRef<HTMLIFrameElement>();

  useEffect(() => {
    // console.log(iframeRef?.current?.contentWindow?.location?.pathname);
    console.log(iframeRef?.current?.contentWindow?.document.baseURI);
  }, [iframeRef]);

  return (
    <>
      <iframe
        ref={iframeRef}
        src='https://deckthemes.com/themes'
        className='w-screen h-screen'
      />
    </>
  );
}
