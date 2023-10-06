import { useState, useEffect, useSyncExternalStore } from "react";

export function useVW2() {
  const [vw, setVW] = useState(window.innerWidth);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setVW(window.innerWidth);
      }, 100);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return vw;
}

function subscribe(callback: any) {
  let timeoutId: NodeJS.Timeout;

  function handleResize() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback();
    }, 100);
  }

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}
function getSnapshot() {
  return window.innerWidth;
}

export function useVW() {
  const vw = useSyncExternalStore(subscribe, getSnapshot);
  console.log(vw);
  return vw;
}
