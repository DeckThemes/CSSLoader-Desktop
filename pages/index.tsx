import { useContext } from "react";
import Link from "next/link";
import { ThemeToggle } from "../components";
import { themeContext } from "./_app";

import * as python from "../backend";

export default function AllThemesModal() {
  const { themes: localThemeList, refreshThemes } = useContext(themeContext);

  return (
    <>
      <h1 style={{ marginBlockEnd: "10px", marginBlockStart: "0px" }}>
        Your Themes
      </h1>
      <Link href='/store'>Go To Store</Link>
      <div className='grid'>
        {localThemeList.map((e) => {
          return <ThemeToggle data={e} />;
        })}
      </div>
      <div>
        <button>Create Preset</button>
      </div>
      <div>
        <button
          onClick={() => {
            refreshThemes();
          }}>
          Reset Plugin
        </button>
      </div>
    </>
  );
}
