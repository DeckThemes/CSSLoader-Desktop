import { useState, useMemo, useContext, useEffect } from "react";
import { Flags, Theme } from "../../ThemeTypes";
import { ThemePatch } from "./ThemePatch";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { themeContext } from "@contexts/themeContext";
import { generatePreset, generatePresetFromThemeNames, setThemeState, toast } from "../../backend";
import { AlertDialog, ToggleSwitch } from "..";
import { twMerge } from "tailwind-merge";
import { BsXCircleFill } from "react-icons/bs";

function OptionalDepsModal({
  themeData,
  closeModal,
}: {
  themeData: Theme;
  closeModal: () => void;
}) {
  const { refreshThemes } = useContext(themeContext);

  const [enableDeps, setEnableDeps] = useState(true);
  const [enableDepValues, setEnableDepValues] = useState(true);
  useEffect(() => {
    if (!enableDeps) setEnableDepValues(false);
  }, [enableDeps]);

  function enableThemeOptDeps() {
    setThemeState(themeData.name, true, enableDeps, enableDepValues).then(() => {
      refreshThemes();
    });
  }
  return (
    <>
      <AlertDialog
        dontClose
        defaultOpen
        title="Optional Dependencies"
        description={`${themeData.name} enables other themes to enhance its functionality. Disabling these dependencies is allowed but it may cause the theme to break in unexpected ways`}
        Content={
          <div className="flex flex-col items-start gap-2 px-4 pb-4 text-sm">
            <div className="flex items-center justify-center gap-2">
              <ToggleSwitch checked={enableDeps} onValueChange={setEnableDeps} />
              <span>Enable dependencies</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ToggleSwitch
                disabled={!enableDeps}
                checked={enableDepValues}
                onValueChange={setEnableDepValues}
              />
              <span>Enable pre-configured settings for dependencies</span>
            </div>
          </div>
        }
        actionText={`Enable ${themeData.name}`}
        onAction={() => {
          enableThemeOptDeps();
          closeModal();
        }}
      />
    </>
  );
}

export function ThemeToggle({
  data,
  collapsible = false,
  rootClass = "",
}: {
  data: Theme;
  collapsible?: boolean;
  rootClass?: string;
}) {
  const { refreshThemes, selectedPreset } = useContext(themeContext);
  const [showOptDepsModal, setShowOptDepsModal] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const isPreset = useMemo(() => {
    if (data.flags.includes(Flags.isPreset)) {
      return true;
    }
    return false;
    // This might not actually memoize it as data.flags is an array, so idk if it deep checks the values here
  }, [data.flags]);

  return (
    <div
      className={twMerge(
        "flex w-full max-w-[960px] flex-col gap-1 rounded-xl border-2 border-borders-base1-dark bg-base-3-dark p-6 transition hover:border-borders-base2-dark",
        rootClass
      )}
    >
      {showOptDepsModal && (
        <OptionalDepsModal themeData={data} closeModal={() => setShowOptDepsModal(false)} />
      )}
      <div className="flex justify-between gap-4">
        <div className="flex flex-col">
          <span className="font-fancy text-md font-bold">{data.name}</span>
          <span className="font-fancy text-muted text-sm">
            {isPreset ? `Preset` : `${data.version} • ${data.author}`}
          </span>
        </div>

        <>
          <ToggleSwitch
            checked={data.enabled}
            onValueChange={async (switchValue) => {
              // TODO: redo this!

              // Re-collapse menu
              setCollapsed(true);
              // If theme has optional dependency flag
              if (switchValue === true && data.flags.includes(Flags.optionalDeps)) {
                setShowOptDepsModal(true);
                return;
              }
              // Actually enabling the theme
              await setThemeState(data.name, switchValue);
              await refreshThemes();

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

              if (!selectedPreset) return;
              if (switchValue) {
                generatePresetFromThemeNames(selectedPreset.name, [
                  ...selectedPreset.dependencies,
                  data.name,
                ]);
              } else {
                generatePresetFromThemeNames(selectedPreset.name, [
                  ...selectedPreset.dependencies.filter((e) => e !== data.name),
                ]);
              }
            }}
          />
        </>
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
