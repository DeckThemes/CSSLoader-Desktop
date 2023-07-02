import { useEffect } from "react";

// This just runs an async function on mount, doesn't have support for debouncing the 2 calls in Strict mode, return functions, etc etc
export function useBasicAsyncEffect(asyncStuff: () => any, deps: any[] = []) {
  useEffect(() => {
    asyncStuff();
  }, deps);
}
