import { useContext } from "react";
import Link from "next/link";
import { ThemeToggle } from "../components";
import { themeContext } from "./_app";

export default function AllThemesModal() {
  const { themes: localThemeList, refreshThemes } = useContext(themeContext);

  return (
    <div className="flex items-center flex-col">
      <h1 style={{ marginBlockEnd: "10px", marginBlockStart: "0px" }}>
        Your Themes
      </h1>
      <Link href="/store">Go To Store</Link>
      <div className="flex justify-center">
        <div className="flex flex-wrap items-start w-[320px] 2cols:w-[650px] 3cols:w-[980px] 4cols:w-[1310px] 5cols:w-[1680px] gap-[10px]">
          {localThemeList.map((e) => {
            return <ThemeToggle data={e} />;
          })}
        </div>
      </div>
      <div>
        <button>Create Preset</button>
      </div>
      <div>
        <button
          onClick={() => {
            refreshThemes();
          }}
        >
          Reset Plugin
        </button>
      </div>
    </div>
  );
}
