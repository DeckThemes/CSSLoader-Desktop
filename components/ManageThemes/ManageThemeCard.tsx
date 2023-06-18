import { BsFillCloudDownloadFill, BsTrashFill } from "react-icons/bs";
import { MinimalCSSThemeInfo, Theme } from "../../ThemeTypes";
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
  let [updateStatus, remoteEntry]: [
    LocalThemeStatus,
    false | MinimalCSSThemeInfo
  ] = ["installed", false];
  const themeArrPlace = updateStatuses.find((f) => f[0] === themeData.id);
  if (themeArrPlace) {
    updateStatus = themeArrPlace[1];
    remoteEntry = themeArrPlace[2];
  }
  return (
    <div className="flex bg-cardDark p-6 rounded-xl items-center justify-center w-full 2cols:w-[480px]">
      <div className="flex flex-col">
	  	<span className="fancy-font font-bold text-md">{themeData.name}</span>
        <span className="fancy-font text-sm text-muted">
          {themeData.version} •  {themeData.author}
          {updateStatus === "local" ? (
            <span className="italic text-slate-200"> - Local Theme</span>
          ) : (
            ""
          )}
        </span>
      </div>
      <div className="flex ml-auto items-center justify-center gap-4">
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
            onClick={() => handleUninstall(themeData)}
          >
            <BsTrashFill className="text-2xl 2cols:text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
