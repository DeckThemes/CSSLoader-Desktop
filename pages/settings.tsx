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
      <div className="flex flex-col w-full pl-4 pt-10">
        <div className="flex items-end gap-4 justify-center">
          <LabelledInput
            label="DeckThemes Token"
            value={token}
            onValueChange={setToken}
          />
          <button
            onClick={onSaveToken}
            className="h-12 bg-brandBlue rounded-xl whitespace-nowrap px-4"
          >
            Save Token
          </button>
        </div>
      </div>
    </>
  );
}
