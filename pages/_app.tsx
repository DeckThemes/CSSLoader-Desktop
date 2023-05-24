import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Theme } from "../ThemeTypes";
import { Montserrat, Open_Sans } from "next/font/google";
import { createContext, useState, useEffect } from "react";
import * as python from "../backend";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { BackendFailedPage, MainNav, DownloadBackendPage } from "../components";
import { exists, BaseDirectory } from "@tauri-apps/api/fs";

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

export default function App({ Component, pageProps }: AppProps) {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [dummyResult, setDummyResult] = useState<boolean>(false);
  const [backendExists, setBackendExists] = useState<boolean>(false);
  const [newBackendVersion, setNewBackend] = useState<string>("");
  const [showNewBackendPage, setShowNewBackend] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    python.checkForNewStandalone().then((newStandalone) => {
      if (newStandalone) {
        setNewBackend(newStandalone as string);
        setShowNewBackend(true);
      }
    });
    python.checkIfBackendExists().then((backendExists) => {
      setBackendExists(backendExists);
      if (backendExists) {
        recheckDummy();
      }
    });
  }, []);

  async function onUpdateFinish() {
    refreshThemes();
    setShowNewBackend(false);
    setNewBackend("");
  }

  async function recheckDummy() {
    const recursive = async () => {
      const value = await dummyFuncTest();
      if (value) {
        refreshThemes();
        return;
      } else
        setTimeout(() => {
          recursive();
        }, 1000);
    };

    const value = await dummyFuncTest();
    if (value) {
      refreshThemes();
      return;
    } else {
      python.startBackend();
      recursive();
    }
  }

  async function dummyFuncTest() {
    return python
      .dummyFunction()
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

  function refreshThemes() {
    python.checkIfBackendExists().then((value) => setBackendExists(value));
    dummyFuncTest();
    python
      .reloadBackend()
      .then((data) => {
        if (data) {
          setThemes(data.sort());
        }
      })
      .catch((err) => {
        setDummyResult(false);
      });
    return;
  }

  return (
    <themeContext.Provider value={{ themes, setThemes, refreshThemes }}>
      <div
        className={`overflow-y-hidden dark w-full min-h-screen h-full flex flex-col bg-bgDark dark:text-textDark ${montserrat.variable} ${openSans.variable}`}
      >
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"dark"}
        />
        {showNewBackendPage || (!backendExists && !dummyResult) ? (
          <>
            <DownloadBackendPage
              onboarding={!backendExists}
              onUpdateFinish={onUpdateFinish}
              hideWindow={() => setShowNewBackend(false)}
              backendVersion={newBackendVersion}
            />
          </>
        ) : (
          <>
            {dummyResult ? (
              <>
                <MainNav dummyFuncTest={dummyFuncTest} />
                <main
                  style={{
                    overflowY: router.pathname === "/store" ? "auto" : "scroll",
                  }}
                  className="w-full h-minusNav overflow-y-scroll"
                >
                  <Component {...pageProps} />
                </main>
              </>
            ) : (
              <>
                {backendExists ? (
                  <BackendFailedPage />
                ) : (
                  <></>
                  // <DownloadBackendPage onboarding />
                )}
              </>
            )}
          </>
        )}
      </div>
    </themeContext.Provider>
  );
}
