import { useState, useContext } from "react";
import { Patch } from "../../ThemeTypes";
import { PatchComponent } from "./PatchComponent";
import { themeContext } from "../../pages/_app";
import { setPatchOfTheme } from "../../backend";

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
  const { refreshThemes } = useContext(themeContext);
  const [selectedIndex, setIndex] = useState(data.options.indexOf(data.value));

  const [selectedLabel, setLabel] = useState(data.value);

  const bottomSeparatorValue = fullArr.length - 1 !== index;

  function ComponentContainer() {
    return (
      <>
        {data.components.length > 0 ? (
          <div className="pl-4">
            {data.components.map((e) => (
              <div
                className="flex gap-2"
                key={`component_${themeName}_${data.name}_${e.name}`}
              >
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
                  <span>{data.name}</span>
                  <div className="w-[300px] max-w-[300px] flex flex-col">
                    <input
                      type="range"
                      min={0}
                      max={data.options.length - 1}
                      step={1}
                      value={selectedIndex}
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        setPatchOfTheme(
                          themeName,
                          data.name,
                          data.options[value]
                        );
                        setIndex(value);
                        setLabel(data.options[value]);
                      }}
                    />
                    <div className="flex justify-between w-[300px]">
                      {data.options.map((e, i) => {
                        return (
                          <div
                            key={`ThemePatch_Slider_${data.name}_${i}`}
                            className="flex flex-col items-center justify-between overflow-hidden"
                            style={{ maxWidth: 300 / data.options.length }}
                          >
                            <span>|</span>
                            <span>{e}</span>
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
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      className="sr-only peer"
                      type="checkbox"
                      checked={data.value === "Yes"}
                      onChange={(event) => {
                        const bool = event.target.checked;
                        const newValue = bool ? "Yes" : "No";
                        setPatchOfTheme(themeName, data.name, newValue).then(
                          () => {
                            // TODO: This is a shim, should fix some other way
                            refreshThemes();
                          }
                        );
                        setLabel(newValue);
                        setIndex(data.options.findIndex((e) => e === newValue));
                      }}
                    />
                    <div className="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                  </label>
                </div>
              </>
            );
          case "dropdown":
            return (
              <>
                <div className="flex items-center justify-between">
                  <span>{data.name}</span>
                  <select
                    className="rounded-md"
                    defaultValue={data.value}
                    onChange={(e) => {
                      setPatchOfTheme(themeName, data.name, e.target.value);
                      setLabel(e.target.value);
                    }}
                  >
                    {data.options.map((x, i) => {
                      return (
                        <option
                          value={x}
                          key={`ThemePatch_Dropdown_${data.name}_${i}`}
                        >
                          {x}
                        </option>
                      );
                    })}
                  </select>
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
        <div className="h-1 my-2 bg-cardLight dark:bg-cardDark" />
      )}
    </>
  );
}
