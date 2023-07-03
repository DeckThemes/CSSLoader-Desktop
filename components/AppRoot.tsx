import { ToastContainer } from "react-toastify";
import { MainNav } from "./Nav";
import { DownloadBackendPage } from "./DownloadBackendPage";
import { AppProps } from "next/app";
import { useContext } from "react";
import { fontContext } from "@contexts/FontContext";
import { BackendFailedPage } from "./BackendFailedPage";
import { backendStatusContext } from "@contexts/backendStatusContext";
import { themeContext } from "@contexts/themeContext";
import { osContext } from "@contexts/osContext";

export function AppRoot({ Component, pageProps }: AppProps) {
  const { montserrat, openSans } = useContext(fontContext);
  const { isWindows } = useContext(osContext);
  const {
    dummyResult,
    backendExists,
    showNewBackendPage,
    newBackendVersion,
    setNewBackend,
    setShowNewBackend,
  } = useContext(backendStatusContext);

  const { refreshThemes } = useContext(themeContext);

  async function onUpdateFinish() {
    refreshThemes();
    setShowNewBackend(false);
    setNewBackend("");
  }

  return (
    // overflow-hidden rounded-b-lg
    <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-lg bg-base-6-dark">
      <div className="relative top-8 overflow-hidden rounded-b-lg">
        <div
          // A lot of this codebase is from the DeckThemes codebase, which has a light and dark mode, however this app only has a dark mode, so we put the dark class here incase we copy over things that have both styles
          className={`dark relative mr-[4px] flex h-[calc(100vh-32px)] flex-col overflow-y-scroll bg-base-6-dark pr-[8px] text-textDark ${montserrat} ${openSans}`}
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
          <main className="page-shadow ml-4 mt-4 mb-4 flex h-min flex-1 flex-grow flex-col rounded-3xl border-[1px] border-borders-base3-light bg-base-2-light dark:border-borders-base1-dark dark:bg-base-2-dark">
            {isWindows && (showNewBackendPage || (!backendExists && !dummyResult)) && (
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
      </div>
    </div>
  );
}
