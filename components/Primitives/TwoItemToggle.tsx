import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";

export function TwoItemToggle({
  value,
  label,
  onValueChange,
  options,
  rootClass = "",
}: {
  value: string;
  label?: string;
  onValueChange: Dispatch<SetStateAction<string>>;
  options: string[];
  rootClass?: string;
}) {
  return (
    <>
      <div className={twMerge("flex flex-col items-start gap-1", rootClass)}>
        {label && <span className="font-fancy text-sm font-bold">{label}</span>}
        <div className="font-fancy relative flex h-10 gap-8 rounded-full border-2 border-borders-base1-light bg-base-3-light p-2 px-4 dark:border-borders-base2-dark dark:bg-base-5-dark">
          <button className="relative z-20 w-16" onClick={() => onValueChange(options[0])}>
            <span className={`w-full text-center`}>{options[0]}</span>
          </button>
          <button className="relative z-20 w-16" onClick={() => onValueChange(options[1])}>
            <span className={`w-full text-center`}>{options[1]}</span>
          </button>
          <div
            className={`absolute top-0 z-10 m-1 h-[calc(100%-8px)] w-[calc(100%-50%-8px)] rounded-3xl bg-brandBlue transition-all duration-100`}
            style={{ left: value === options[0] ? 0 : "50.2%" }}
          />
        </div>
      </div>
    </>
  );
}
