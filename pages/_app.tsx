import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Theme } from "../ThemeTypes";
import { Montserrat, Open_Sans } from "next/font/google";
import { createContext, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackendFailedPage, MainNav, DownloadBackendPage } from "../components";
import {
  checkForNewBackend,
  checkIfStandaloneBackendExists,
  checkIfBackendIsStandalone,
  dummyFunction,
  reloadBackend,
  startBackend,
  recursiveCheck,
  getInstalledThemes,
} from "../backend";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--opensans",
});

export const themeContext = createContext<{
  themes: Theme[];
  setThemes: any;
  refreshThemes: any;
}>({
  themes: [],
  setThemes: () => {},
  refreshThemes: () => {},
});

export const fontContext = createContext({
  montserrat: "",
  openSans: "",
});

export default function App({ Component, pageProps }: AppProps) {
  const [themes, setThemes] = useState<Theme[]>([]);
  // This is now undefined before the initial check, that way things can use dummyResult !== undefined to see if the app has properly loaded
  const [dummyResult, setDummyResult] = useState<boolean | undefined>(undefined);
  const [backendExists, setBackendExists] = useState<boolean>(false);
  const [newBackendVersion, setNewBackend] = useState<string>("");
  const [showNewBackendPage, setShowNewBackend] = useState<boolean>(false);
  useEffect(() => {
    // Checking for updates
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

  async function onUpdateFinish() {
    refreshThemes();
    setShowNewBackend(false);
    setNewBackend("");
  }
  async function recheckDummy() {
    recursiveCheck(dummyFuncTest, () => refreshThemes(true), startBackend);
  }

  async function refreshBackendExists() {
    checkIfStandaloneBackendExists().then((value) => setBackendExists(value));
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
    refreshBackendExists();
    dummyFuncTest();

    const promise = reset ? reloadBackend() : getInstalledThemes();
    promise.then((data) => {
      if (data) {
        setThemes(data.sort());
      }
    });
    return;
  }

  return (
    <themeContext.Provider value={{ themes, setThemes, refreshThemes }}>
      <fontContext.Provider
        value={{ montserrat: montserrat.variable, openSans: openSans.variable }}
      >
        <div
          // A lot of this codebase is from the DeckThemes codebase, which has a light and dark mode, however this app only has a dark mode, so we put the dark class here incase we copy over things that have both styles
          className={`dark relative flex min-h-screen flex-col bg-base-6-light text-textLight dark:bg-base-6-dark dark:text-textDark ${montserrat.variable} ${openSans.variable}`}
        >
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            toastClassName="rounded-xl border-2 border-borders-base1-light bg-base-3-light transition hover:border-borders-base2-light dark:border-borders-base1-dark dark:bg-base-3-dark hover:dark:border-borders-base2-dark"
            bodyClassName="rounded-xl font-fancy text-black dark:text-white text-sm"
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={"dark"}
          />
          {dummyResult && <MainNav />}
          <main className="page-shadow ml-4 mt-2 mb-4 flex h-full flex-1 flex-grow flex-col rounded-3xl border-[1px] border-borders-base3-light bg-base-2-light dark:border-borders-base1-dark dark:bg-base-2-dark">
            {(showNewBackendPage || (!backendExists && !dummyResult)) && (
              <DownloadBackendPage
                onboarding={!backendExists}
                onUpdateFinish={onUpdateFinish}
                hideWindow={() => setShowNewBackend(false)}
                backendVersion={newBackendVersion}
              />
            )}
            {dummyResult ? (
              <>
                <Component {...pageProps} />
              </>
            ) : (
              <BackendFailedPage />
            )}
          </main>
        </div>
      </fontContext.Provider>
    </themeContext.Provider>
  );
}
