import { Dispatch, SetStateAction, createContext } from "react";

export const osContext = createContext<{
  OS: string;
  isWindows: boolean;
  maximized: boolean;
  fullscreen: boolean;
}>({
  OS: "",
  isWindows: false,
  maximized: false,
  fullscreen: false,
});
