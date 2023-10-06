import { osContext } from "@contexts/osContext";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";

export function AppFrame({ children }: { children: any }) {
  const { maximized } = useContext(osContext);
  return (
    <div
      className={twMerge(
        "cssloader-app-frame absolute inset-0 overflow-hidden border-x-[1px] border-b-[1px] border-[#2f2f2f]",
        maximized ? "rounded-none" : "rounded-lg"
      )}
    >
      {children}
    </div>
  );
}
