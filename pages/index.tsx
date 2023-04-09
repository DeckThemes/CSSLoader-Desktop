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
      <a href='https://www.google.com/search?client=firefox-b-d&q=what+is+my+user+agent'>
        Test
      </a>
      <Link href='/store'>Go To Store</Link>
      <a href='http://localhost:3001'>localhost3001</a>
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
