import { useContext } from "react";
import { themeContext } from "../../pages/_app";
import { ThemeToggle } from "../SingleTheme";

export function OneColumnThemeView() {
  const { themes } = useContext(themeContext);

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      {themes.map((e) => {
        return <ThemeToggle data={e} key={`Theme_${e.name}`} />;
      })}
    </div>
  );
}
