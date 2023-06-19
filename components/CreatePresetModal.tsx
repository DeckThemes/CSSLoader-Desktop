import { useContext, useMemo, useRef, useState } from "react";
import { themeContext } from "../pages/_app";
import { FiX } from "react-icons/fi";
import { generatePreset } from "../backend";

export function CreatePresetModal() {
  const { themes: localThemeList, refreshThemes } = useContext(themeContext);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const enabledThemes = useMemo(
    () => localThemeList.filter((e) => e.enabled).length,
    [localThemeList]
  );
  const [presetName, setPresetName] = useState<string>("");
  function createPreset() {
    if (presetName) {
      generatePreset(presetName).then(() => {
        refreshThemes(true);
        setPresetName("");
        dialogRef?.current?.close();
      });
    }
  }
  return (
    <>
      <dialog
        ref={dialogRef}
        className="backdrop:bg-elevation-3-dark w-full bg-transparent"
        onClick={(e) => {
          // @ts-ignore
          if (e.target.nodeName === "DIALOG") {
            // @ts-ignore
            e.target.close();
          }
        }}
      >
        <div className="flex flex-col items-center justify-center p-8 bg-bgDark mx-10 gap-4 relative shadow-xl rounded-xl">
          <button
            className="absolute top-4 left-4"
            onClick={() => dialogRef?.current?.close()}
          >
            <FiX size={30} />
          </button>
          <span className="text-xl">Create Preset?</span>
          <span className="text-center text-md">
            This preset will combine {enabledThemes === 1 ? "the " : "all "}
            {enabledThemes} theme
            {enabledThemes === 1 ? "" : "s"} you currently have enabled.
            Enabling/disabling it will toggle them all at once.
          </span>
          <div className="flex gap-2 items-center justify-center">
            <input
              placeholder="Preset Name"
              className="rounded-xl p-2"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
            />
          </div>
          <button
            onClick={createPreset}
            className="p-4 bg-elevation-3-light rounded-xl fancy-font transition-all"
            style={{ opacity: presetName.length === 0 ? "0.5" : "1" }}
            disabled={presetName.length === 0}
          >
            Create
          </button>
        </div>
      </dialog>
      {enabledThemes > 0 && (
        <div className="flex items-center justify-center">
          <button
            className="bg-cardDark p-4 rounded-xl fancy-font text-xl"
            onClick={() => dialogRef.current?.showModal()}
          >
            <span>Create Preset</span>
          </button>
        </div>
      )}
    </>
  );
}
