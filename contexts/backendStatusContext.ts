import { Dispatch, SetStateAction, createContext } from "react";

export const backendStatusContext = createContext<{
  dummyResult: boolean | undefined;
  backendExists: boolean;
  showNewBackendPage: boolean;
  newBackendVersion: string;
  setNewBackend: Dispatch<SetStateAction<string>>;
  setShowNewBackend: Dispatch<SetStateAction<boolean>>;
}>({
  dummyResult: undefined,
  showNewBackendPage: false,
  newBackendVersion: "",
  backendExists: false,
  setNewBackend: () => {},
  setShowNewBackend: () => {},
});
