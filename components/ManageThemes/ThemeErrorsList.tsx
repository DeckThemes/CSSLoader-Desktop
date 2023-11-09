import { themeContext } from "@contexts/themeContext";
import { useContext } from "react";

export function ThemeErrorsList() {
  const { errors } = useContext(themeContext);
  return (
    <div className="flex w-full max-w-[960px] flex-col">
      <h2 className="font-fancy mx-auto mb-4 w-full max-w-[960px] text-sm font-bold">Errors</h2>
      <div className="flex flex-col gap-4">
        {errors.map((e) => {
          const [themeName, error] = e;
          return (
            <div className="w-full overflow-hidden rounded-xl border-2 border-borders-base1-dark transition hover:border-borders-base2-dark dark:bg-base-3-dark">
              <div className="flex h-full w-full flex-col items-start bg-red-800/20 p-4 sm:flex-row sm:items-center sm:gap-4">
                <span className="font-semibold">{themeName}</span>
                <span>{error}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
