import "../styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";

import { Theme } from "../ThemeTypes";
import { Montserrat } from "next/font/google";
import { createContext, useState, useEffect } from "react";
import * as python from "../backend";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--montserrat",
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
        className={`dark w-screen min-h-screen h-full flex flex-col bg-bgDark dark:text-textDark ${montserrat.variable}`}>
        <ToastContainer
          position='bottom-center'
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
            <div className='h-16 gap-2 flex items-center justify-between bg-cardDark'>
              <Link href='/' className='flex items-center gap-2 ml-2'>
                <Image
                  src='logo_css_darkmode.png'
                  width={48}
                  height={48}
                  alt='CSSLoader Logo'
                />
                <h1 className={`fancy-font font-semibold text-3xl`}>
                  CSSLoader
                </h1>
              </Link>
              <div className='overflow-hidden relative w-16 h-10 flex-grow'>
                <Link
                  className='p-2 bg-cardDark rounded-full px-4 fancy-font transition-all duration-300 absolute right-2'
                  style={{
                    transform:
                      router.pathname === "/store" ? "translate(200px,0)" : "",
                  }}
                  href='/store'>
                  Download Themes
                </Link>
                <Link
                  className='p-2 bg-cardDark rounded-full px-4 fancy-font absolute right-2 transition-all duration-300'
                  style={{
                    transform:
                      router.pathname !== "/store" ? "translate(200px,0)" : "",
                  }}
                  href='/'>
                  Your Themes
                </Link>
              </div>
            </div>
            <Component {...pageProps} />
          </>
        ) : (
          <>
            <main className='flex flex-col w-full h-full items-center justify-center flex-grow gap-4'>
              <h1 className='text-center'>
                CSSLoader's backend did not initialize properly. <br />
                Please ensure it is running and press Reset.
              </h1>
              <button
                className='p-2 fancy-font bg-cardDark rounded-md px-4'
                onClick={() => {
                  dummyFuncTest();
                  refreshThemes();
                }}>
                Reset
              </button>
            </main>
          </>
        )}
      </div>
    </themeContext.Provider>
  );
}
