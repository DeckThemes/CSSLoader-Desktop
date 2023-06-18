import { useContext, useMemo } from "react";
import { themeContext } from "../../pages/_app";
import { ThemeToggle } from "../SingleTheme";
import { Theme } from "../../ThemeTypes";

export function TwoColumnThemeView() {
  const { themes } = useContext(themeContext);

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
    <div className="flex gap-4 max-w-[960px] w-full">
      <div className="flex flex-col items-start w-full max-w-[480px] gap-4 flex-1">
        {leftColumn.map((e) => {
          return <ThemeToggle collapsible={true} data={e} key={`Theme_${e.name}`} />;
        })}
      </div>
      <div className="flex flex-col items-start w-full max-w-[480px] gap-4 flex-1">
        {rightColumn.map((e) => {
          return <ThemeToggle collapsible={true} data={e} key={`Theme_${e.name}`} />;
        })}
      </div>
    </div>
  );
}