import { useContext } from "react";
import { themeContext } from "../../pages/_app";
import { ThemeToggle } from "../SingleTheme";

export function OneColumnThemeView() {
  const { themes } = useContext(themeContext);

  return (
    <div className="flex flex-wrap items-start w-[320px] 2cols:w-[650px] 3cols:w-[980px] 4cols:w-[1310px] 5cols:w-[1680px] gap-[10px]">
      {themes.map((e) => {
        return <ThemeToggle data={e} key={`Theme_${e.name}`} />;
      })}
    </div>
  );
}
