import { Dispatch, SetStateAction, createContext } from "react";

export const backendStatusContext = createContext<{
  dummyResult: boolean | undefined;
  backendExists: boolean;
  showNewBackendPage: boolean;
  newBackendVersion: string;
  recheckDummy: any;
  setNewBackend: Dispatch<SetStateAction<string>>;
  setShowNewBackend: Dispatch<SetStateAction<boolean>>;
  backendManifestVersion: number;
}>({
  dummyResult: undefined,
  showNewBackendPage: false,
  newBackendVersion: "",
  recheckDummy: () => {},
  backendExists: false,
  setNewBackend: () => {},
  setShowNewBackend: () => {},
  backendManifestVersion: 8,
});
