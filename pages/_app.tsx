import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Flags, Theme, ThemeError } from "../ThemeTypes";
import { useState, useEffect, useMemo, use } from "react";
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
  generatePresetFromThemeNames,
  getLastLoadErrors,
  changePreset,
  getBackendVersion,
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
  const [errors, setErrors] = useState<ThemeError[]>([]);
  // This is now undefined before the initial check, that way things can use dummyResult !== undefined to see if the app has properly loaded
  const [dummyResult, setDummyResult] = useState<boolean | undefined>(undefined);
  const [backendExists, setBackendExists] = useState<boolean>(false);
  const [newBackendVersion, setNewBackend] = useState<string>("");
  const [showNewBackendPage, setShowNewBackend] = useState<boolean>(false);
  const [backendManifestVersion, setManifestVersion] = useState<number>(8);
  const [OS, setOS] = useState<string>("");
  const isWindows = useMemo(() => OS === "win32", [OS]);
  const [maximized, setMaximized] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const selectedPreset = useMemo(
    () => themes.find((e) => e.flags.includes(Flags.isPreset) && e.enabled),
    [themes]
  );

  useEffect(() => {
    let unsubscribeToWindowChanges: () => void;

    async function subscribeToWindowChanges() {
      // why did you use a ssr framework in an app
      const { appWindow } = await import("@tauri-apps/api/window");
      unsubscribeToWindowChanges = await appWindow.onResized(() => {
        appWindow.isMaximized().then(setMaximized);
        appWindow.isFullscreen().then(setFullscreen);
      });
    }

    subscribeToWindowChanges();

    // This sets OS and isWindows, which some other initializing logic then runs based on that result
    getOS().then(setOS);
    // This actually initializes the themes and such
    recheckDummy();

    return () => {
      unsubscribeToWindowChanges && unsubscribeToWindowChanges();
    };
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
    const backendVer = await getBackendVersion();
    if (backendVer.success) {
      setManifestVersion(backendVer.result);
    }

    const data = reset ? await reloadBackend() : await getInstalledThemes();
    if (data) {
      setThemes(data.sort());
    }
    const errors = await getLastLoadErrors();
    if (errors) {
      setErrors(errors);
    }
  }

  return (
    <themeContext.Provider
      value={{ themes, setThemes, errors, setErrors, refreshThemes, selectedPreset }}
    >
      <backendStatusContext.Provider
        value={{
          dummyResult,
          backendExists,
          showNewBackendPage,
          newBackendVersion,
          recheckDummy,
          setNewBackend,
          setShowNewBackend,
          backendManifestVersion,
        }}
      >
        <osContext.Provider value={{ OS, isWindows, maximized, fullscreen }}>
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
