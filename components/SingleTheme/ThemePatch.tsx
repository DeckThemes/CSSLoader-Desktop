import { useState, useContext } from "react";
import { Flags, Patch } from "../../ThemeTypes";
import { PatchComponent } from "./PatchComponent";
import { themeContext } from "@contexts/themeContext";
import { generatePresetFromThemeNames, setPatchOfTheme } from "../../backend";
import { SimpleRadioDropdown } from "@components/Primitives";

export function ThemePatch({
  data,
  index,
  fullArr,
  themeName,
}: {
  data: Patch;
  index: number;
  fullArr: Patch[];
  themeName: string;
}) {
  const { themes, refreshThemes, selectedPreset } = useContext(themeContext);
  const [selectedIndex, setIndex] = useState(data.options.indexOf(data.value));

  const [selectedLabel, setLabel] = useState(data.value);

  const bottomSeparatorValue = fullArr.length - 1 !== index;

  async function setPatchValue(value: string) {
    if (selectedPreset && selectedPreset.dependencies.includes(themeName)) {
      generatePresetFromThemeNames(selectedPreset.name, selectedPreset.dependencies);
    }
    return setPatchOfTheme(themeName, data.name, value);
  }

  function ComponentContainer() {
    return (
      <>
        {data.components.length > 0 ? (
          <div className="">
            {data.components.map((e) => (
              <div className="flex gap-2" key={`component_${themeName}_${data.name}_${e.name}`}>
                <PatchComponent
                  data={e}
                  selectedLabel={selectedLabel}
                  themeName={themeName}
                  patchName={data.name}
                  bottomSeparatorValue={bottomSeparatorValue}
                />
              </div>
            ))}
          </div>
        ) : null}
      </>
    );
  }

  return (
    <>
      {(() => {
        switch (data.type) {
          case "slider":
            return (
              <>
                <div>
                  <span className="font-fancy mb-4 font-medium">{data.name}</span>
                  <div className="flex w-full flex-col">
                    <input
                      type="range"
                      min={0}
                      max={data.options.length - 1}
                      step={1}
                      value={selectedIndex}
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        setPatchValue(data.options[value]);
                        setIndex(value);
                        setLabel(data.options[value]);
                      }}
                    />
                    <div className="flex w-full justify-between">
                      {data.options.map((e, i) => {
                        return (
                          <div
                            key={`ThemePatch_Slider_${data.name}_${i}`}
                            className="flex flex-col items-center justify-between overflow-hidden"
                            style={{ maxWidth: 300 / data.options.length }}
                          >
                            <span className="-mt-2 text-xs opacity-50">|</span>
                            <span className="text-xs font-bold uppercase">{e}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            );
          case "checkbox":
            return (
              <>
                <div className="flex items-center justify-between">
                  <span>{data.name}</span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      className="peer sr-only"
                      type="checkbox"
                      checked={data.value === "Yes"}
                      onChange={(event) => {
                        const bool = event.target.checked;
                        const newValue = bool ? "Yes" : "No";
                        setPatchValue(newValue).then(() => {
                          refreshThemes();
                        });
                        setLabel(newValue);
                        setIndex(data.options.findIndex((e) => e === newValue));
                      }}
                    />
                    <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700" />
                  </label>
                </div>
              </>
            );
          case "dropdown":
            return (
              <>
                <div className="flex items-center justify-between">
                  <span>{data.name}</span>
                  <SimpleRadioDropdown
                    options={data.options}
                    value={data.value}
                    onValueChange={(e) => {
                      setPatchValue(e);
                      setLabel(e);
                    }}
                  />
                </div>
              </>
            );
          case "none":
            return (
              <>
                <div>
                  <span style={{ color: "#dcdedf" }}>{data.name}</span>
                </div>
              </>
            );
          default:
            return null;
        }
      })()}
      <ComponentContainer />
      {bottomSeparatorValue && (
        <div className="my-4 h-[2px] rounded-full bg-cardLight opacity-50 dark:bg-cardDark" />
      )}
    </>
  );
}
