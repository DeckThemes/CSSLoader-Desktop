import { themeContext } from "@contexts/themeContext";
import { useContext, useEffect, useState } from "react";
import { Flags, MinimalCSSThemeInfo, Theme } from "../ThemeTypes";
import { deleteTheme, downloadThemeFromUrl, toast } from "../backend";
import { bulkThemeUpdateCheck } from "../logic";
import { ManageThemeCard, YourProfilesList } from "../components";
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
    <main className="flex flex-1 flex-col items-center gap-8 px-4">
      <div className="mt-12 w-full max-w-[960px]">
        <h2 className="font-fancy mb-4 text-sm font-bold">Theme Directory</h2>
        <button
          className="flex w-fit items-center justify-center gap-2 rounded-full border-2 border-[#2e2e2e] bg-[#2563eb] px-4 py-2 text-sm font-bold transition duration-100 focus-visible:ring-4 focus-visible:ring-amber9"
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
      <div className="flex w-full flex-col">
        <h2 className="font-fancy mx-auto mb-4 w-full max-w-[960px] text-sm font-bold">
          Installed Themes
        </h2>
        <div className="mx-auto flex w-full max-w-[960px] flex-col gap-4">
          {localThemeList
            .filter((e) => !e.flags.includes(Flags.isPreset))
            .map((e) => (
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
      <YourProfilesList {...{ updateStatuses, uninstalling, handleUninstall, handleUpdate }} />
    </main>
  );
}
