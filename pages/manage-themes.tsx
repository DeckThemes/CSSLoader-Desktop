import { themeContext } from "./_app";
import { useContext, useEffect, useState } from "react";
import { MinimalCSSThemeInfo, Theme } from "../ThemeTypes";
import { deleteTheme, downloadThemeFromUrl, toast } from "../backend";
import { bulkThemeUpdateCheck } from "../logic";
import { ManageThemeCard } from "../components";
import { BiFolderOpen } from "react-icons/bi";

export type LocalThemeStatus = "installed" | "outdated" | "local";

export default function ManageThemes() {
  const { themes: localThemeList, refreshThemes } = useContext(themeContext);
  const [uninstalling, setUninstalling] = useState<boolean>(false);
  const [updateStatuses, setUpdateStatuses] = useState<
    [string, LocalThemeStatus, false | MinimalCSSThemeInfo][]
  >([]);
  function handleUninstall(listEntry: Theme) {
    setUninstalling(true);
    deleteTheme(listEntry.name).then(() => {
      refreshThemes(true);
      setUninstalling(false);
    });
  }
  function handleUpdate(remoteEntry: MinimalCSSThemeInfo) {
    downloadThemeFromUrl(remoteEntry.id).then(() => {
      toast(`${remoteEntry.name} Updated`);
      refreshThemes(true);
    });
  }
  useEffect(() => {
    bulkThemeUpdateCheck(localThemeList).then((value) => {
      setUpdateStatuses(value);
    });
  }, [localThemeList]);

  return (
    <div className="pl-4 flex h-full flex-col mt-8 mx-auto max-w-[960px] w-full">
      <div className="">
        <h2 className="fancy-font text-sm font-bold mb-4">Theme Directory</h2>
        <button
          className="flex w-fit items-center justify-center border-2 border-[#2e2e2e] rounded-full text-sm px-4 py-2 gap-2 font-bold transition duration-100 bg-[#2563eb]"
          onClick={async () => {
            // These have to be async imported here as otherwise NextJS tries to "SSR" them and it errors
            const { homeDir, join } = await import("@tauri-apps/api/path");
            const { open } = await import("@tauri-apps/api/shell");
            const userDir = await homeDir();
            const path = await join(userDir, "homebrew", "themes");
            open(path);
          }}
        >
          <BiFolderOpen />
          <span>Open Themes Directory</span>
        </button>
      </div>
      <h2 className="fancy-font text-sm font-bold mt-12 mb-4 mx-auto max-w-[960px] w-full">
        Installed Themes
      </h2>
      <div className="flex flex-col gap-4 mb-4 mx-auto max-w-[960px] w-full">
        {localThemeList.map((e) => (
          <ManageThemeCard
            themeData={e}
            updateStatuses={updateStatuses}
            uninstalling={uninstalling}
            handleUninstall={handleUninstall}
            handleUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
