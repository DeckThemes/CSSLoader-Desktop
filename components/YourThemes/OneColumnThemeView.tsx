import { useContext } from "react";
import { themeContext } from "../../pages/_app";
import { ThemeToggle } from "../SingleTheme";

export function OneColumnThemeView() {
  const { themes } = useContext(themeContext);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {themes.map((e) => {
        return <ThemeToggle collapsible={true} data={e} key={`Theme_${e.name}`} />;
      })}
    </div>
  );
}
