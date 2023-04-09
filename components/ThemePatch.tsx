import * as python from "../backend";
import { useState } from "react";
import { Patch } from "../ThemeTypes";
import { PatchComponent } from "./PatchComponent";

export function ThemePatch({ data, index, fullArr, themeName }) {
  const [selectedIndex, setIndex] = useState(data.options.indexOf(data.value));

  const [selectedLabel, setLabel] = useState(data.value);

  const bottomSeparatorValue =
    fullArr.length - 1 === index ? "standard" : "none";

  switch (data.type) {
    case "slider":
      return (
        <>
          <div>
            <span>{data.name}</span>
            <div className='w-[300px] max-w-[300px] flex flex-col'>
              <input
                type='range'
                min={0}
                max={data.options.length - 1}
                step={1}
                value={selectedIndex}
                onChange={(event) => {
                  const value = event.target.value;
                  python.setPatchOfTheme(
                    themeName,
                    data.name,
                    data.options[value]
                  );
                  setIndex(value);
                  setLabel(data.options[value]);
                }}
                //   notchCount={data.options.length}
                //   notchLabels={data.options.map((e, i) => ({
                //     notchIndex: i,
                //     label: e,
                //     value: i,
                //   }))}
              />
              <div className='flex justify-between'>
                {data.options.map((e) => {
                  return (
                    <div
                      className='flex flex-col items-center justify-center overflow-hidden mx-4'
                      style={{ maxWidth: 300 / data.options.length }}>
                      <span>|</span>
                      <span>{e}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {data.components.length > 0 ? (
            <>
              {data.components.map((e) => (
                <PatchComponent
                  data={e}
                  selectedLabel={selectedLabel}
                  themeName={themeName}
                  patchName={data.name}
                  bottomSeparatorValue={bottomSeparatorValue}
                />
              ))}
            </>
          ) : null}
        </>
      );
    case "checkbox":
      return (
        <>
          <div>
            <span>{data.name}</span>
            <input
              type='checkbox'
              checked={data.value === "Yes"}
              onChange={(event) => {
                const bool = event.target.checked;
                const newValue = bool ? "Yes" : "No";
                python.setPatchOfTheme(themeName, data.name, newValue);
                setLabel(newValue);
                setIndex(data.options.findIndex((e) => e === newValue));
                data.value = newValue;
              }}
            />
          </div>
          {data.components.length > 0 ? (
            <>
              {data.components.map((e) => (
                <PatchComponent
                  data={e}
                  selectedLabel={selectedLabel}
                  themeName={themeName}
                  patchName={data.name}
                  bottomSeparatorValue={bottomSeparatorValue}
                />
              ))}
            </>
          ) : null}
        </>
      );
    case "dropdown":
      return (
        <>
          <div>
            <span>{data.name}</span>
            <select>
              {data.options.map((x, i) => {
                return <option value={i}>{x}</option>;
              })}
            </select>
            {/* <DropdownItem
              bottomSeparator={bottomSeparatorValue}
              label={` ↳ ${data.name}`}
              menuLabel={`${data.name}`}
              rgOptions={data.options.map((x, i) => {
                return { data: i, label: x };
              })}
              selectedOption={selectedIndex}
              onChange={(index) => {
                setIndex(index.data);
                data.value = index.label as string;
                setLabel(data.value);
                python.execute(
                  python.setPatchOfTheme(themeName, data.name, data.value)
                );
              }}
            /> */}
          </div>
          {data.components.length > 0 ? (
            <>
              {data.components.map((e) => (
                <PatchComponent
                  data={e}
                  selectedLabel={selectedLabel}
                  themeName={themeName}
                  patchName={data.name}
                  bottomSeparatorValue={bottomSeparatorValue}
                />
              ))}
            </>
          ) : null}
        </>
      );
    case "none":
      return (
        <>
          <div>
            <span style={{ color: "#dcdedf" }}>↳ {data.name}</span>
          </div>
          {data.components.length > 0 ? (
            <>
              {data.components.map((e) => (
                <PatchComponent
                  data={e}
                  selectedLabel={selectedLabel}
                  themeName={themeName}
                  patchName={data.name}
                  bottomSeparatorValue={bottomSeparatorValue}
                />
              ))}
            </>
          ) : null}
        </>
      );
    default:
      return null;
  }
}
