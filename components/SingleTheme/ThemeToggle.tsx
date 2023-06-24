import { useState, useMemo, useContext } from "react";
import { Flags, Theme } from "../../ThemeTypes";
import { ThemePatch } from "./ThemePatch";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { themeContext } from "../../pages/_app";
import { setThemeState, toast } from "../../backend";

export function ThemeToggle({ data, collapsible = false }: { data: Theme; collapsible?: boolean }) {
  const { refreshThemes } = useContext(themeContext);

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const isPreset = useMemo(() => {
    if (data.flags.includes(Flags.isPreset)) {
      return true;
    }
    return false;
    // This might not actually memoize it as data.flags is an array, so idk if it deep checks the values here
  }, [data.flags]);

  return (
    <div className="flex w-full max-w-[960px] flex-col gap-1 rounded-xl border-2 border-borders-base1-dark bg-cardLight p-6 transition hover:border-borders-base2-dark dark:bg-base-3-dark">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col">
          <span className="font-fancy text-md font-bold">{data.name}</span>
          <span className="font-fancy text-muted text-sm">
            {isPreset ? `Preset` : `${data.version} • ${data.author}`}
          </span>
        </div>
        <label className="relative flex cursor-pointer items-center">
          <input
            className="peer sr-only"
            checked={data.enabled}
            type="checkbox"
            onChange={(event) => {
              const switchValue = event.target.checked;
              // Actually enabling the theme
              setThemeState(data.name, switchValue).then(() => {
                refreshThemes();
              });
              // Re-collapse menu
              setCollapsed(true);
              // Dependency Toast
              if (data.dependencies.length > 0) {
                if (switchValue === true) {
                  toast(
                    `${data.name} enabled other themes`,
                    `${
                      data.dependencies.length === 1
                        ? `1 other theme is required by ${data.name}`
                        : `${data.dependencies.length} other themes are required by ${data.name}`
                    }`
                  );
                  return;
                }
                if (!data.flags.includes(Flags.dontDisableDeps)) {
                  toast(
                    `${data.name} disabled other themes`,
                    // @ts-ignore
                    `${
                      data.dependencies.length === 1
                        ? `1 theme was originally enabled by ${data.name}`
                        : `${data.dependencies.length} themes were originally enabled by ${data.name}`
                    }`
                  );
                  return;
                }
              }
            }}
          />
          <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700" />
        </label>
      </div>
      {data.enabled && data.patches.length > 0 && (
        <>
          <div className="mt-4 flex w-full max-w-[960px] flex-col gap-2 rounded-lg px-4 py-2 dark:bg-cardDark">
            {collapsible && (
              <div className="relative flex flex-row items-center py-2">
                <h3 className="font-fancy flex flex-1 items-center gap-2 text-xs font-bold">
                  Theme Settings
                </h3>
                <button
                  className="absolute inset-0 flex items-center justify-end"
                  aria-controls="content"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  {collapsed ? (
                    <RiArrowDownSFill
                      className="flex"
                      style={{
                        fontSize: "1.5em",
                      }}
                    />
                  ) : (
                    <RiArrowUpSFill
                      style={{
                        fontSize: "1.5em",
                      }}
                    />
                  )}
                </button>
              </div>
            )}
            {!collapsible || !collapsed ? (
              <div className="flex flex-col ">
                {data.patches.map((x, i, arr) => {
                  return (
                    <ThemePatch
                      key={`ThemePatch_${data.name}_${i}`}
                      data={x}
                      index={i}
                      fullArr={arr}
                      themeName={data.name}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
