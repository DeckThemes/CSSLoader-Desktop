import { BsFillCloudDownloadFill, BsTrashFill } from "react-icons/bs";
import { themeContext } from "./_app";
import { useContext, useEffect, useState } from "react";
import { MinimalCSSThemeInfo, Theme } from "../ThemeTypes";
import { apiUrl } from "../constants";
import { fetch } from "@tauri-apps/api/http";
import { deleteTheme, downloadThemeFromUrl, toast } from "../backend";

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
      refreshThemes();
      setUninstalling(false);
    });
  }
  function handleUpdate(remoteEntry: MinimalCSSThemeInfo) {
    downloadThemeFromUrl(remoteEntry.id).then(() => {
      toast(`${remoteEntry.name} Updated`);
      refreshThemes();
    });
  }
  useEffect(() => {
    if (localThemeList.length > 0) {
      let themeArr: MinimalCSSThemeInfo[] = [];
      let idsToQuery: string[] = localThemeList.map((e) => e.id);

      if (idsToQuery.length > 0) {
        const queryStr = "?ids=" + idsToQuery.join(".");
        fetch<MinimalCSSThemeInfo[]>(`${apiUrl}/themes/ids${queryStr}`)
          .then((res) => {
            return res.data;
          })
          .then((value: MinimalCSSThemeInfo[]) => {
            if (value) {
              themeArr.push(...value);
            }
          })
          .then(() => {
            if (themeArr.length > 0) {
              let updateStatusArr: [
                string,
                LocalThemeStatus,
                false | MinimalCSSThemeInfo
              ][] = [];
              localThemeList.forEach((localEntry) => {
                const remoteEntry = themeArr.find(
                  (remote) =>
                    remote.id === localEntry.id || remote.name === localEntry.id
                );
                if (remoteEntry) {
                  if (remoteEntry.version === localEntry.version) {
                    updateStatusArr.push([
                      localEntry.id,
                      "installed",
                      remoteEntry,
                    ]);
                    return;
                  }
                  updateStatusArr.push([
                    localEntry.id,
                    "outdated",
                    remoteEntry,
                  ]);
                  return;
                }
                updateStatusArr.push([localEntry.id, "local", false]);
                return;
              });
              setUpdateStatuses(updateStatusArr);
            }
          });
      }
    }
  }, [localThemeList]);

  return (
    <div className="flex items-center h-full flex-col justify-between pb-10 p-4">
      <div className="flex flex-wrap justify-center gap-2 pb-10">
        {localThemeList.map((e) => {
          let [updateStatus, remoteEntry]: [
            LocalThemeStatus,
            false | MinimalCSSThemeInfo
          ] = ["installed", false];
          const themeArrPlace = updateStatuses.find((f) => f[0] === e.id);
          if (themeArrPlace) {
            updateStatus = themeArrPlace[1];
            remoteEntry = themeArrPlace[2];
          }
          return (
            <>
              <div className="flex bg-cardDark p-4 rounded-xl items-center justify-center w-[320px] 2cols:w-[640px]">
                <div className="flex flex-col">
                  <span>{e.name}</span>
                  <span>
                    {e.version}
                    {updateStatus === "local" ? (
                      <span className="italic text-slate-200">
                        {" "}
                        - Local Theme
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
                <div className="flex ml-auto items-center justify-center gap-2 2cols:gap-4">
                  {updateStatus === "outdated" && remoteEntry && (
                    <button
                      onClick={() => remoteEntry && handleUpdate(remoteEntry)}
                      className="flex flex-col 2cols:flex-row-reverse 2cols:gap-2 items-center justify-center"
                    >
                      <BsFillCloudDownloadFill className="text-2xl 2cols:text-3xl" />
                      <span>{remoteEntry.version}</span>
                    </button>
                  )}
                  <div className="flex items-center justify-center">
                    <button
                      disabled={uninstalling}
                      onClick={() => handleUninstall(e)}
                    >
                      <BsTrashFill className="text-2xl 2cols:text-3xl" />
                    </button>
                  </div>
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
