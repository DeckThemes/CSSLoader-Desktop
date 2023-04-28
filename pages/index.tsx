import { useContext } from "react";
import Link from "next/link";
import { ThemeToggle } from "../components";
import { themeContext } from "./_app";

export default function AllThemesModal() {
  const { themes: localThemeList, refreshThemes } = useContext(themeContext);

  return (
    <div className="flex items-center flex-col pb-10">
      <h1 className="text-3xl font-semibold fancy-font py-10">Your Themes</h1>
      <div className="flex justify-center">
        <div className="flex flex-wrap items-start w-[320px] 2cols:w-[650px] 3cols:w-[980px] 4cols:w-[1310px] 5cols:w-[1680px] gap-[10px]">
          {localThemeList.map((e) => {
            return <ThemeToggle data={e} />;
          })}
        </div>
      </div>
    </div>
  );
}
