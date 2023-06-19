import { themeContext } from "./_app";
import { useContext, useEffect, useState } from "react";
import { MinimalCSSThemeInfo, Theme } from "../ThemeTypes";
import { deleteTheme, downloadThemeFromUrl, toast } from "../backend";
import { bulkThemeUpdateCheck } from "../logic";
import { ManageThemeCard } from "../components";

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
    <div className="flex items-center h-full flex-col justify-between pb-10 p-4">
      <div className="flex flex-wrap justify-center gap-2 pb-10">
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
      <div>
        <button
          className="p-4 bg-cardDark rounded-xl"
          onClick={async () => {
            // These have to be async imported here as otherwise NextJS tries to "SSR" them and it errors
            const { homeDir, join } = await import("@tauri-apps/api/path");
            const { open } = await import("@tauri-apps/api/shell");
            const userDir = await homeDir();
            const path = await join(userDir, "homebrew", "themes");
            open(path);
          }}
        >
          <span>Open Themes Directory</span>
        </button>
      </div>
    </div>
  );
}
