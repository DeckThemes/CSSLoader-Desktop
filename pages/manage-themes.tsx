import { BsTrashFill } from "react-icons/bs";
import { themeContext } from "./_app";
import { useContext, useState } from "react";
import { Theme } from "../ThemeTypes";
import * as python from "../backend";
import { open } from "@tauri-apps/api/shell";
import { homeDir, join } from "@tauri-apps/api/path";

export default function ManageThemes() {
  const { themes: localThemeList, refreshThemes } = useContext(themeContext);
  const [uninstalling, setUninstalling] = useState<boolean>(false);
  function handleUninstall(listEntry: Theme) {
    setUninstalling(true);
    python.resolve(python.deleteTheme(listEntry.name), () => {
      refreshThemes();
      setUninstalling(false);
    });
  }

  return (
    <div className="flex items-center h-full flex-col justify-between pb-10 p-4">
      <div className="flex flex-wrap justify-center gap-2">
        {localThemeList.map((e) => {
          return (
            <>
              <div className="flex bg-cardDark p-4 rounded-xl items-center justify-between w-[320px]">
                <div className="flex flex-col">
                  <span>{e.name}</span>
                  <span>{e.version}</span>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    disabled={uninstalling}
                    onClick={() => handleUninstall(e)}
                  >
                    <BsTrashFill size={36} />
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div>
        <button
          className="p-4 bg-cardDark rounded-xl"
          onClick={async () => {
            const userDir = await homeDir();
            const path = await join(userDir, "homebrew", "themes");
            console.log(path);
            open(path);
          }}
        >
          <span>Open Themes Directory</span>
        </button>
      </div>
    </div>
  );
}
