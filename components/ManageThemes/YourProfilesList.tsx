import { useContext } from "react";
import { ManageThemeCard } from "./ManageThemeCard";
import { themeContext } from "@contexts/themeContext";
import { LocalThemeStatus } from "@pages/manage-themes";
import { Flags, MinimalCSSThemeInfo, Theme } from "ThemeTypes";
import { deletePreset } from "backend";

export function YourProfilesList({
  updateStatuses,
  uninstalling,
  handleUninstall,
  handleUpdate,
}: {
  updateStatuses: [string, LocalThemeStatus, false | MinimalCSSThemeInfo][];
  uninstalling: boolean;
  handleUninstall: (e: Theme) => void;
  handleUpdate: (e: MinimalCSSThemeInfo) => void;
}) {
  const { themes, refreshThemes } = useContext(themeContext);
  const userChangeablePresets = themes.filter((e) => e.flags.includes(Flags.isPreset));
  if (userChangeablePresets.length === 0) return null;
  return (
    <>
      <div className="flex w-full flex-col">
        <h2 className="font-fancy mx-auto mb-4 w-full max-w-[960px] text-sm font-bold">
          Your Profiles
        </h2>
        <div className="mx-auto mb-4 flex w-full max-w-[960px] flex-col gap-4">
          {userChangeablePresets.map((e) => (
            <ManageThemeCard
              themeData={e}
              updateStatuses={updateStatuses}
              uninstalling={uninstalling}
              handleUninstall={(e: Theme) => {
                deletePreset(e.name, themes, refreshThemes);
              }}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
    </>
  );
}
