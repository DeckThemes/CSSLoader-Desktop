import { BsFillCloudDownloadFill, BsTrashFill } from "react-icons/bs";
import { Flags, MinimalCSSThemeInfo, Theme } from "../../ThemeTypes";
import { LocalThemeStatus } from "../../pages/manage-themes";
import { UpdateStatus } from "../../logic";

export function ManageThemeCard({
  themeData,
  updateStatuses,
  uninstalling,
  handleUninstall,
  handleUpdate,
}: {
  themeData: Theme;
  updateStatuses: UpdateStatus[];
  uninstalling: boolean;
  handleUninstall: any;
  handleUpdate: any;
}) {
  // This finds the remote entry for the current theme (if it exists), and sets the data accordingly
  let [updateStatus, remoteEntry]: [LocalThemeStatus, false | MinimalCSSThemeInfo] = [
    "installed",
    false,
  ];
  const themeArrPlace = updateStatuses.find((f) => f[0] === themeData.id);
  if (themeArrPlace) {
    updateStatus = themeArrPlace[1];
    remoteEntry = themeArrPlace[2];
  }
  return (
    <div className="flex w-full items-center justify-center rounded-xl border-2 border-borders-base1-dark p-6 transition hover:border-borders-base2-dark dark:bg-base-3-dark">
      <div className="flex flex-col">
        <span className="font-fancy text-md font-bold">{themeData.name}</span>
        <span className="font-fancy text-muted text-sm">
          {themeData.flags.includes(Flags.isPreset) ? (
            <span>Profile</span>
          ) : (
            <>
              {themeData.version}
              {themeData.author ? ` • ${themeData.author}` : ""}
              {updateStatus === "local" ? (
                <span className="text-fore-9-dark"> - Local Theme</span>
              ) : (
                ""
              )}
            </>
          )}
        </span>
      </div>
      <div className="ml-auto flex items-center justify-center gap-4">
        {updateStatus === "outdated" && remoteEntry && (
          <button
            onClick={() => remoteEntry && handleUpdate(remoteEntry)}
            className="flex flex-col items-center justify-center focus-visible:ring-4 focus-visible:ring-amber9 2cols:flex-row-reverse 2cols:gap-2"
          >
            <BsFillCloudDownloadFill className="text-2xl 2cols:text-3xl" />
            <span>{remoteEntry.version}</span>
          </button>
        )}
        <div className="flex items-center justify-center">
          <button
            className="focus-visible:ring-4 focus-visible:ring-amber9"
            disabled={uninstalling}
            onClick={() => handleUninstall(themeData)}
          >
            <BsTrashFill className="text-2xl 2cols:text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
