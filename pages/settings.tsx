import { LabelledInput } from "@components/Primitives";
import { killBackend, storeRead, storeWrite, toast } from "backend";
import { useState, useEffect } from "react";
import { BsDiscord } from "react-icons/bs";
import { FaPatreon } from "react-icons/fa";

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

  return (
    <>
      <main className="flex w-full flex-1 flex-grow flex-col items-center gap-4">
        <div className="flex w-full max-w-[960px] flex-col gap-8 px-4 pt-12">
          <div className="flex w-full flex-col gap-4">
            <span className="text-lg font-bold">Store Settings</span>
            <div className="flex items-end justify-center gap-4">
              <LabelledInput
                password
                label="DeckThemes Token"
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
          </div>
          <div className="flex w-full flex-col gap-4">
            <span className="text-lg font-bold">Credits</span>
            <ul>
              <li>SuchMemeManySkill - Backend Dev</li>
              <li>Beebles - Frontend Dev</li>
              <li>Fero - Frontend Dev</li>
            </ul>
            <div className="flex w-full flex-col items-start">
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
