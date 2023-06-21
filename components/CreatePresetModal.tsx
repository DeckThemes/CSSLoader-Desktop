import { useContext, useMemo, useRef, useState } from "react";
import { themeContext } from "../pages/_app";
import { FiX } from "react-icons/fi";
import { generatePreset } from "../backend";
import { BiPlus } from "react-icons/bi";

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
        className="w-full bg-transparent backdrop:bg-elevation-3-dark"
        onClick={(e) => {
          // @ts-ignore
          if (e.target.nodeName === "DIALOG") {
            // @ts-ignore
            e.target.close();
          }
        }}
      >
        <div className="relative mx-10 flex flex-col items-center justify-center gap-4 rounded-xl bg-bgDark p-8 shadow-xl">
          <button className="absolute top-4 left-4" onClick={() => dialogRef?.current?.close()}>
            <FiX size={30} />
          </button>
          <span className="text-xl">Create Preset?</span>
          <span className="text-md text-center">
            This preset will combine {enabledThemes === 1 ? "the " : "all "}
            {enabledThemes} theme
            {enabledThemes === 1 ? "" : "s"} you currently have enabled. Enabling/disabling it will
            toggle them all at once.
          </span>
          <div className="flex items-center justify-center gap-2">
            <input
              placeholder="Preset Name"
              className="rounded-xl p-2"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
            />
          </div>
          <button
            onClick={createPreset}
            className="font-fancy rounded-xl bg-elevation-3-light p-4 transition-all"
            style={{ opacity: presetName.length === 0 ? "0.5" : "1" }}
            disabled={presetName.length === 0}
          >
            Create
          </button>
        </div>
      </dialog>

      <div className="">
        <h2 className="font-fancy mx-auto mb-4 w-full max-w-[960px] text-sm font-bold">
          Create Preset
        </h2>
        <div className="mb-4 w-full">
          A preset is a group of themes that are enabled together.{" "}
          {enabledThemes > 0 ? "" : "Enable a theme to get started."}
        </div>
        <button
          className={`flex w-fit items-center justify-center gap-2 rounded-full border-2 border-[#2e2e2e] px-4 py-2 text-sm font-bold transition duration-100 ${
            enabledThemes > 0 ? "bg-[#2563eb]" : "pointer-events-none opacity-50"
          }`}
          onClick={() => dialogRef.current?.showModal()}
        >
          <BiPlus />
          <span>Create Preset</span>
        </button>
      </div>
    </>
  );
}
