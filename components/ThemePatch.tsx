import * as python from "../backend";
import { useState } from "react";
import { Patch } from "../ThemeTypes";
import { PatchComponent } from "./PatchComponent";

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
  const [selectedIndex, setIndex] = useState(data.options.indexOf(data.value));

  const [selectedLabel, setLabel] = useState(data.value);

  const bottomSeparatorValue = fullArr.length - 1 !== index;

  console.log(data);

  function ComponentContainer() {
    return (
      <>
        {data.components.length > 0 ? (
          <div className="pl-4">
            {data.components.map((e) => (
              <>
                <div className="flex gap-2">
                  <PatchComponent
                    data={e}
                    selectedLabel={selectedLabel}
                    themeName={themeName}
                    patchName={data.name}
                    bottomSeparatorValue={bottomSeparatorValue}
                  />
                </div>
              </>
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
                        python.setPatchOfTheme(
                          themeName,
                          data.name,
                          data.options[value]
                        );
                        setIndex(value);
                        setLabel(data.options[value]);
                      }}
                    />
                    <div className="flex justify-between">
                      {data.options.map((e) => {
                        return (
                          <div
                            className="flex flex-col items-center justify-center overflow-hidden mx-4"
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
                <div>
                  <span>{data.name}</span>
                  <input
                    type="checkbox"
                    checked={data.value === "Yes"}
                    onChange={(event) => {
                      const bool = event.target.checked;
                      const newValue = bool ? "Yes" : "No";
                      python.setPatchOfTheme(themeName, data.name, newValue);
                      setLabel(newValue);
                      setIndex(data.options.findIndex((e) => e === newValue));
                    }}
                  />
                </div>
              </>
            );
          case "dropdown":
            return (
              <>
                <div>
                  <span>{data.name}</span>
                  <select
                    defaultValue={data.value}
                    onChange={(e) => {
                      python.setPatchOfTheme(
                        themeName,
                        data.name,
                        e.target.value
                      );
                      setLabel(e.target.value);
                    }}
                  >
                    {data.options.map((x, i) => {
                      return <option value={x}>{x}</option>;
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
