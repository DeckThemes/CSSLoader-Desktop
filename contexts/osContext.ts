import { Dispatch, SetStateAction, createContext } from "react";

export const osContext = createContext<{
  OS: string;
  isWindows: boolean;
}>({
  OS: "",
  isWindows: false,
});
