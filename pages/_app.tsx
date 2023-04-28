import "../styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import { BiReset } from "react-icons/bi";
import { Theme } from "../ThemeTypes";
import { Montserrat, Open_Sans } from "next/font/google";
import { createContext, useState, useEffect } from "react";
import * as python from "../backend";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavTab } from "../components";

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
  useEffect(() => {
    refreshThemes();
  }, []);

  const router = useRouter();

  function dummyFuncTest() {
    python
      .dummyFunction()
      .then((data) => {
        if (data.success) {
          setDummyResult(data.result);
          return;
        }
        setDummyResult(false);
      })
      .catch((err) => {
        setDummyResult(false);
      });
  }

  function refreshThemes() {
    dummyFuncTest();
    python
      .reloadBackend()
      .then((data) => {
        if (data) {
          setThemes(data);
        }
      })
      .catch((err) => {
        setDummyResult(false);
      });
  }

  return (
    <themeContext.Provider value={{ themes, setThemes, refreshThemes }}>
      <div
        className={`overflow-y-hidden dark w-full min-h-screen h-full flex flex-col bg-bgDark dark:text-textDark ${montserrat.variable} ${openSans.variable}`}
      >
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"dark"}
        />
        {dummyResult ? (
          <>
            <div className="h-16 gap-2 flex items-center bg-cardDark">
              <Link href="/" className="flex items-center gap-2 ml-2">
                <Image
                  src="logo_css_darkmode.png"
                  width={48}
                  height={48}
                  alt="CSSLoader Logo"
                />
                <h1
                  className={`fancy-font font-semibold text-3xl hidden 2cols:flex`}
                >
                  CSSLoader
                </h1>
              </Link>
              <button
                onClick={() => {
                  dummyFuncTest();
                  refreshThemes();
                }}
              >
                <BiReset size={24} color="white" />
              </button>
              <div className="fancy-font ml-auto mr-2 h-full flex items-end gap-2">
                <NavTab href="/" name="Your Themes" />
                <NavTab href="/store" name="Download Themes" />
              </div>
            </div>
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
            <main className="flex flex-col w-full h-full items-center justify-center flex-grow gap-4">
              <h1 className="text-center">
                CSSLoader's backend did not initialize properly. <br />
                Please ensure it is running and press Reset.
              </h1>
              <button
                className="p-2 fancy-font bg-cardDark rounded-md px-4"
                onClick={() => {
                  dummyFuncTest();
                  refreshThemes();
                }}
              >
                Reset
              </button>
            </main>
          </>
        )}
      </div>
    </themeContext.Provider>
  );
}
