import { BsTrashFill } from "react-icons/bs";
import { themeContext } from "./_app";
import { useContext, useState } from "react";
import { Theme } from "../ThemeTypes";
import * as python from "../backend";

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
    <div className="flex items-center flex-col pb-10">
      <h1 className="text-3xl font-semibold fancy-font py-10">Manage Themes</h1>
      <div className="flex flex-wrap justify-center gap-2">
        {localThemeList.map((e) => {
          return (
            <>
              <div className="flex bg-cardDark p-4 items-center justify-between w-96">
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
    </div>
  );
}
