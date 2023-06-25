import { LabelledInput, Tooltip } from "@components/Primitives";
import {
  getBackendVersion,
  getStandaloneVersion,
  killBackend,
  startBackend,
  storeRead,
  storeWrite,
  toast,
} from "backend";
import { useState, useEffect, useContext } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { FaPatreon } from "react-icons/fa";
import { themeContext } from "./_app";

export default function SettingsPage() {
  const [token, setToken] = useState<string>("");
  function onSaveToken() {
    storeWrite("shortToken", token).then(() => {
      toast("Token Saved");
    });
  }
  useEffect(() => {
    storeRead("shortToken").then((res) => {
      if (res.success && res.result) {
        setToken(res.result);
      }
    });
  }, []);

  const { themes } = useContext(themeContext);

  return (
    <>
      <main className="flex w-full flex-1 flex-grow flex-col items-center gap-4">
        <div className="flex w-full max-w-[960px] flex-col gap-8 px-4 pt-12">
          <div className="flex w-full flex-col gap-4">
            <span className="text-lg font-bold">Store Settings</span>
            <div className="flex items-end justify-center gap-4">
              <LabelledInput
                password
                label={
                  <div className="flex items-center gap-2">
                    <span>DeckThemes Token</span>
                    <Tooltip
                      triggerContent={<AiOutlineQuestionCircle size={18} />}
                      content={
                        <span className="text-sm">
                          A token enables you to star themes in the store.
                          <br />
                          You can create a token through your account page on{" "}
                          <span
                            className="cursor-pointer text-fore-9-dark"
                            onClick={async () => {
                              const { open } = await import("@tauri-apps/api/shell");
                              open("https://deckthemes.com");
                            }}
                          >
                            deckthemes.com
                          </span>
                        </span>
                      }
                    />
                  </div>
                }
                value={token}
                onValueChange={setToken}
              />
              <button
                onClick={onSaveToken}
                className="h-12 whitespace-nowrap rounded-xl bg-brandBlue px-4"
              >
                Save Token
              </button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <span className="text-lg font-bold">Developer Settings</span>
            <button
              onClick={() => killBackend(() => console.log("Backend Killed"))}
              className="h-12 whitespace-nowrap rounded-xl bg-base-3-dark px-4"
            >
              Kill Backend
            </button>
            <button
              onClick={() => startBackend(() => console.log("Backend Started"))}
              className="h-12 whitespace-nowrap rounded-xl bg-base-3-dark px-4"
            >
              Force Start Backend
            </button>
            <button
              onClick={async () => {
                console.log("Themes", themes);
                console.log(
                  "Highest Support Manifest Version",
                  await getBackendVersion().then((res) => res.result)
                );
                console.log("AppData's Stored Standalone Version", await getStandaloneVersion());
              }}
              className="h-12 whitespace-nowrap rounded-xl bg-base-3-dark px-4"
            >
              Data Dump
            </button>
          </div>
          <div className="flex w-full flex-col gap-4">
            <span className="text-lg font-bold">Credits</span>
            <ul>
              <li>SuchMemeManySkill - Backend Dev</li>
              <li>Beebles - Frontend Dev</li>
              <li>Fero - Frontend Dev</li>
            </ul>
            <div className="flex w-full flex-col items-start pb-8">
              <button
                className="flex items-center justify-center gap-4 text-discordColor"
                onClick={async () => {
                  const { open } = await import("@tauri-apps/api/shell");
                  await open("https://deckthemes.com/discord");
                }}
              >
                <BsDiscord />
                <span>Join The Community</span>
              </button>
              <button
                className="flex items-center justify-center gap-4 text-patreonColor"
                onClick={async () => {
                  const { open } = await import("@tauri-apps/api/shell");
                  await open("https://patreon.com/deckthemes");
                }}
              >
                <FaPatreon />
                <span>Support Us</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
