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
      
        <div className="">
		 <h2 className="fancy-font text-sm font-bold mb-4 mx-auto max-w-[960px] w-full">Create Preset</h2>
		  <div className="w-full mb-4">A preset is a group of themes that are enabled together. {enabledThemes > 0 ? '' : 'Enable a theme to get started.'}</div>
          <button
            className={`flex w-fit items-center justify-center border-2 border-[#2e2e2e] rounded-full px-4 py-2 gap-2 font-bold transition duration-100 ${enabledThemes > 0 ? 'bg-[#2563eb]' : 'pointer-events-none opacity-50'}`}
            onClick={() => dialogRef.current?.showModal()}
          >
            <span>Create Preset</span>
          </button>
        </div>
      
    </>
  );
}
