import { useContext, useMemo } from "react";
import { themeContext } from "../../pages/_app";
import { ThemeToggle } from "../SingleTheme";
import { Theme } from "../../ThemeTypes";
import { BiReset } from "react-icons/bi";

export function TwoColumnThemeView() {
  const { themes, refreshThemes } = useContext(themeContext);

  // This takes the list of themes and returns two columns
  // When these columns are displayed as left and right, the themes inside will read alphabetically, left ro right and top to bottom.
  // A  B
  // C  D
  // E  F
  // etc, etc
  const [leftColumn, rightColumn] = useMemo(() => {
    let leftColumn: Theme[] = [],
      rightColumn: Theme[] = [];
    themes.sort().forEach((e, i) => {
      if (i % 2 === 0) {
        leftColumn.push(e);
      } else {
        rightColumn.push(e);
      }
    });
    return [leftColumn, rightColumn];
  }, [themes]);

  // If you're wondering "why not CSS grid", it's because each theme has it's own unique height
  // Having the left-col theme affect the right-col theme's height looked bad
  return (
    <div className="flex w-full max-w-[960px] flex-col gap-4">
      <button
        className="flex w-fit items-center justify-center gap-2 rounded-full border-2 border-[#2e2e2e] px-4 py-2"
        onClick={() => {
          refreshThemes(true);
        }}
      >
        <BiReset size={20} color="white" />
        <span className="text-sm font-bold">Refresh Steam</span>
      </button>
      <div className="flex w-full max-w-[960px] gap-4">
        <div className="flex w-full max-w-[480px] flex-1 flex-col items-start gap-4">
          {leftColumn.map((e) => {
            return <ThemeToggle collapsible={true} data={e} key={`Theme_${e.name}`} />;
          })}
        </div>
        <div className="flex w-full max-w-[480px] flex-1 flex-col items-start gap-4">
          {rightColumn.map((e) => {
            return <ThemeToggle collapsible={true} data={e} key={`Theme_${e.name}`} />;
          })}
        </div>
      </div>
    </div>
  );
}
