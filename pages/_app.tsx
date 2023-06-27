import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Flags, Theme } from "../ThemeTypes";
import { useState, useEffect, useMemo } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  checkForNewBackend,
  checkIfStandaloneBackendExists,
  checkIfBackendIsStandalone,
  dummyFunction,
  reloadBackend,
  startBackend,
  recursiveCheck,
  getInstalledThemes,
  getOS,
} from "../backend";
import { themeContext } from "@contexts/themeContext";
import { FontContext } from "@contexts/FontContext";
import { backendStatusContext } from "@contexts/backendStatusContext";
import { AppRoot } from "@components/AppRoot";
import DynamicTitleBar from "@components/Native/DynamicTitlebar";
import { AppFrame } from "@components/Native/AppFrame";
import { osContext } from "@contexts/osContext";

export default function App(AppProps: AppProps) {
  const [themes, setThemes] = useState<Theme[]>([]);
  // This is now undefined before the initial check, that way things can use dummyResult !== undefined to see if the app has properly loaded
  const [dummyResult, setDummyResult] = useState<boolean | undefined>(undefined);
  const [backendExists, setBackendExists] = useState<boolean>(false);
  const [newBackendVersion, setNewBackend] = useState<string>("");
  const [showNewBackendPage, setShowNewBackend] = useState<boolean>(false);
  const [OS, setOS] = useState<string>("");
  const isWindows = useMemo(() => OS === "win32", [OS]);

  const selectedPreset = useMemo(
    () => themes.find((e) => e.flags.includes(Flags.isPreset) && e.enabled),
    [themes]
  );

  useEffect(() => {
    // Checking for updates
    getOS().then(setOS);
    checkIfBackendIsStandalone().then((isStandalone) => {
      if (isStandalone) {
        checkForNewBackend().then((newStandalone) => {
          console.log(newStandalone);
          if (newStandalone) {
            setNewBackend(newStandalone as string);
            setShowNewBackend(true);
          }
        });
      }
    });

    refreshBackendExists();

    // This actually initializes the themes and such
    recheckDummy();
  }, []);

  async function recheckDummy() {
    recursiveCheck(dummyFuncTest, () => refreshThemes(true), startBackend);
  }

  async function refreshBackendExists() {
    await checkIfStandaloneBackendExists().then((value) => setBackendExists(value));
  }

  async function dummyFuncTest() {
    return dummyFunction()
      .then((data) => {
        if (data.success) {
          setDummyResult(data.result);
          return true;
        }
        setDummyResult(false);
        return false;
      })
      .catch(() => {
        setDummyResult(false);
        return false;
      });
  }

  async function refreshThemes(reset: boolean = false) {
    await refreshBackendExists();
    await dummyFuncTest();

    const promise = reset ? reloadBackend() : getInstalledThemes();
    return promise.then((data) => {
      if (data) {
        setThemes(data.sort());
      }
    });
  }

  return (
    <themeContext.Provider value={{ themes, setThemes, refreshThemes, selectedPreset }}>
      <backendStatusContext.Provider
        value={{
          dummyResult,
          backendExists,
          showNewBackendPage,
          newBackendVersion,
          setNewBackend,
          setShowNewBackend,
        }}
      >
        <osContext.Provider value={{ OS, isWindows }}>
          <FontContext>
            <AppFrame>
              <DynamicTitleBar />
              <AppRoot {...AppProps} />
            </AppFrame>
          </FontContext>
        </osContext.Provider>
      </backendStatusContext.Provider>
    </themeContext.Provider>
  );
}
