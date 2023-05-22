import { useState, useEffect } from "react";

export function useVW() {
  const [vw, setVW] = useState<number>(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setVW(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return vw;
}
