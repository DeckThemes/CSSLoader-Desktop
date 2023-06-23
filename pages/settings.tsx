import { LabelledInput } from "@components/Primitives";
import { killBackend, storeRead, storeWrite, toast } from "backend";
import { useState, useEffect } from "react";

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
      <main className="page-shadow mx-4 flex w-full max-w-[calc(100vw-2rem)] flex-1 flex-grow flex-col items-center gap-4 rounded-3xl border-[1px] border-borders-base3-light bg-base-2-light dark:border-borders-base1-dark dark:bg-red-800">
        <div className="flex w-full flex-col self-start px-4 pt-12">
          <div className="flex items-end justify-center gap-4">
            <LabelledInput label="DeckThemes Token" value={token} onValueChange={setToken} />
            <button
              onClick={onSaveToken}
              className="h-12 whitespace-nowrap rounded-xl bg-brandBlue px-4"
            >
              Save Token
            </button>
          </div>
          <span>Dev Settings</span>
          <button
            onClick={() => killBackend(() => console.log("Backend Killed"))}
            className="h-12 whitespace-nowrap rounded-xl bg-base-3-dark px-4"
          >
            Kill Backend
          </button>
        </div>
      </main>
    </>
  );
}
