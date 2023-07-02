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
import { useBasicAsyncEffect } from "@hooks/useBasicAsyncEffect";

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
    // This sets OS and isWindows, which some other initializing logic then runs based on that result
    getOS().then(setOS);
    // This actually initializes the themes and such
    recheckDummy();
  }, []);

  useBasicAsyncEffect(async () => {
    if (!isWindows) return;
    refreshBackendExists();
    const isStandalone = await checkIfBackendIsStandalone();
    if (!isStandalone) return;
    const newStandalone = await checkForNewBackend();
    if (!newStandalone) return;
    setNewBackend(newStandalone as string);
    setShowNewBackend(true);
  }, [isWindows]);

  async function recheckDummy() {
    recursiveCheck(
      dummyFuncTest,
      () => refreshThemes(true),
      () => isWindows && startBackend()
    );
  }

  async function refreshBackendExists() {
    if (!isWindows) return;
    const backendExists = await checkIfStandaloneBackendExists();
    setBackendExists(backendExists);
  }

  async function dummyFuncTest() {
    try {
      const data = await dummyFunction();
      if (!data || !data.success) throw new Error(undefined);
      setDummyResult(data.result);
      return true;
    } catch {
      setDummyResult(false);
      return false;
    }
  }

  async function refreshThemes(reset: boolean = false) {
    if (isWindows) await refreshBackendExists();
    await dummyFuncTest();

    const data = reset ? await reloadBackend() : await getInstalledThemes();
    if (data) {
      setThemes(data.sort());
    }
  }

  return (
    <themeContext.Provider value={{ themes, setThemes, refreshThemes, selectedPreset }}>
      <backendStatusContext.Provider
        value={{
          dummyResult,
          backendExists,
          showNewBackendPage,
          newBackendVersion,
          recheckDummy,
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
