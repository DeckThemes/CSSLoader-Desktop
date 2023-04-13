import { useState, useMemo, useContext } from "react";
import { Flags, Theme } from "../ThemeTypes";

import * as python from "../backend";
import { ThemePatch } from "./ThemePatch";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { themeContext } from "../pages/_app";

export function ThemeToggle({
  data,
  collapsible = false,
}: {
  data: Theme;
  collapsible?: boolean;
}) {
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
    <div className='bg-cardLight dark:bg-cardDark py-2 flex flex-col gap-1 my-2 w-[320px] rounded-xl'>
      <div className='flex gap-4 justify-between px-2'>
        <div className='flex flex-col'>
          <span className='fancy-font font-medium'>{data.name}</span>
          <span className='fancy-font'>
            {isPreset ? `Preset` : `${data.version} | ${data.author}`}
          </span>
        </div>
        <label className='relative inline-flex items-center cursor-pointer'>
          <input
            className='sr-only peer'
            checked={data.enabled}
            type='checkbox'
            onChange={(event) => {
              const switchValue = event.target.checked;
              // Actually enabling the theme
              python.setThemeState(data.name, switchValue).then((e) => {
                refreshThemes();
              });
              // Re-collapse menu
              setCollapsed(true);
              // Dependency Toast
              if (data.dependencies.length > 0) {
                if (switchValue === true) {
                  python.toast(
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
                  python.toast(
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
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[14px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
        </label>
      </div>
      {data.enabled && data.patches.length > 0 && (
        <>
          <div className='w-full h-2 bg-cardLight dark:bg-cardDark' />
          <div className='flex flex-col gap-2 px-2'>
            {collapsible && (
              <div>
                <button onClick={() => setCollapsed(!collapsed)}>
                  {collapsed ? (
                    <RiArrowDownSFill
                      style={{
                        transform: "translate(0, -13px)",
                        fontSize: "1.5em",
                      }}
                    />
                  ) : (
                    <RiArrowUpSFill
                      style={{
                        transform: "translate(0, -12px)",
                        fontSize: "1.5em",
                      }}
                    />
                  )}
                </button>
              </div>
            )}
            {!collapsible || !collapsed ? (
              <div className='flex flex-col '>
                {data.patches.map((x, i, arr) => {
                  return (
                    <ThemePatch
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
