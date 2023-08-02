import { ThemeToggle } from "../SingleTheme";
import { Theme } from "ThemeTypes";

export function OneColumnThemeView({ themes }: { themes: Theme[] }) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      {themes.map((e) => {
        return <ThemeToggle collapsible={true} data={e} key={`Theme_${e.name}`} />;
      })}
    </div>
  );
}
