import { LabelledInput } from "@components/Primitives";
import { storeRead, storeWrite, toast } from "backend";
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
      <div className="flex w-full flex-col pl-4 pt-10">
        <div className="flex items-end justify-center gap-4">
          <LabelledInput label="DeckThemes Token" value={token} onValueChange={setToken} />
          <button
            onClick={onSaveToken}
            className="h-12 whitespace-nowrap rounded-xl bg-brandBlue px-4"
          >
            Save Token
          </button>
        </div>
      </div>
    </>
  );
}
