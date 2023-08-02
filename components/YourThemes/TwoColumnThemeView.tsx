import { useMemo } from "react";
import { ThemeToggle } from "../SingleTheme";
import { Theme } from "../../ThemeTypes";

export function TwoColumnThemeView({ themes }: { themes: Theme[] }) {
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
