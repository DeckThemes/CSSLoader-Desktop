import { useState, useContext } from "react";
import { ImSpinner5 } from "react-icons/im";
import { themeContext } from "../pages/_app";
import { downloadBackend, startBackend } from "../backend";

export function OnboardingPage() {
  const { refreshThemes } = useContext(themeContext);
  const [installProg, setInstallProg] = useState<number>(0);
  const [installText, setInstallText] = useState<string>("");
  async function installBackend() {
    setInstallProg(1);
    setInstallText("Downloading Backend");
    downloadBackend(async () => {
      setInstallProg(50);
      setInstallText("Starting Backend");
      startBackend(() => {
        setInstallProg(100);
        setInstallText("Install Complete");
        setTimeout(() => {
          refreshThemes();
        }, 1000);
      });
    });
  }
  return (
    <>
      <main className="flex flex-col w-full h-full items-center justify-center flex-grow gap-4">
        <h1 className="fancy-font text-5xl font-semibold">
          Welcome To CSSLoader
        </h1>
        <button
          onClick={() => installProg <= 0 && installBackend()}
          disabled={installProg > 0}
          className="p-4 bg-cardDark rounded-3xl transition-all"
        >
          {installProg > 0 ? (
            <div className="flex items-center justify-center gap-4">
              <ImSpinner5 className="animate-spin" size={64} />
              <span className="fancy-font text-2xl">{installText}</span>
            </div>
          ) : (
            <h2 className="fancy-font text-3xl">Install CSSLoader's Backend</h2>
          )}
        </button>
      </main>
    </>
  );
}
