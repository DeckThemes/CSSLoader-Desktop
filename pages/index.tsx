import { useContext } from "react";
import { ThemeToggle } from "../components";
import { themeContext } from "./_app";
import { useVW } from "../hooks/useVW";
import { CreatePresetModal } from "../components";

export default function MainPage() {
  const { themes: localThemeList } = useContext(themeContext);
  const vw = useVW();

  return (
    <>
      <div className="flex items-center flex-col pb-10">
        <div className="flex justify-center">
          {vw <= 650 ? (
            <div className="flex flex-wrap items-start w-[320px] 2cols:w-[650px] 3cols:w-[980px] 4cols:w-[1310px] 5cols:w-[1680px] gap-[10px]">
              {localThemeList.map((e) => {
                return <ThemeToggle data={e} key={`Theme_${e.name}`} />;
              })}
            </div>
          ) : (
            <div className="flex gap-[10px]">
              <div className="flex flex-col items-start w-[320px] gap-[4px]">
                {localThemeList
                  .slice(0, Math.round(localThemeList.length / 2))
                  .map((e) => {
                    return <ThemeToggle data={e} key={`Theme_${e.name}`} />;
                  })}
              </div>
              <div className="flex flex-col items-start w-[320px] gap-[4px]">
                {localThemeList
                  .slice(Math.round(localThemeList.length / 2))
                  .map((e) => {
                    return <ThemeToggle data={e} key={`Theme_${e.name}`} />;
                  })}
              </div>
            </div>
          )}
        </div>
        <CreatePresetModal />
      </div>
    </>
  );
}
