import { BiReset } from "react-icons/bi";
import { OneColumnThemeView, TwoColumnThemeView, CreatePresetModal } from "../components";
import { useVW } from "../hooks/useVW";
import { themeContext } from "./_app";
import { useContext, useState, useEffect, useMemo } from "react";
import { LabelledInput, RadioDropdown, TwoItemToggle } from "@components/Primitives";

export default function MainPage() {
  const vw = useVW();
  const { refreshThemes, themes } = useContext(themeContext);
  const [search, setSearch] = useState<string>("");
  const [numCols, setNumCols] = useState<number>(1);
  const [sortValue, setSort] = useState<any>();

  const sortedThemes = useMemo(() => {
    const filteredThemes = themes.filter(
      (e) => e.name.toLowerCase().includes(search) || e.author.toLowerCase().includes(search)
    );
    const sortedThemes = filteredThemes.sort((a, b) => {
      switch (sortValue) {
        case "nameAZ": {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        }
        case "nameZA": {
          return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
        }
        case "authorAZ": {
          return a.author < b.author ? -1 : a.author > b.author ? 1 : 0;
        }
        case "authorZA": {
          return a.author < b.author ? 1 : a.author > b.author ? -1 : 0;
        }
        default: {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        }
      }
    });
    return sortedThemes;
  }, [themes, search, sortValue]);

  useEffect(() => {
    if (vw < 650 && numCols === 2) {
      setNumCols(1);
    }
  }, [vw]);

  return (
    <>
      {/* pl-4 negates the shift from the scrollbar */}
      <main className="page-shadow mx-4 flex w-full max-w-[calc(100vw-3rem)] flex-1 flex-grow flex-col items-center gap-4 rounded-3xl border-[1px] border-borders-base3-light bg-base-2-light py-12 dark:border-borders-base1-dark dark:bg-base-2-dark">
        {/* <div className="mt-8">
		  <div className="w-full max-w-[960px] mx-auto text-center">These are your currently installed themes. Get more themes through the Store page.</div>
		</div> */}

        <div className="mt-12 flex w-full flex-col items-center">
          <h2 className="font-fancy mx-auto mb-4 w-full max-w-[960px] text-sm font-bold">
            Installed Themes
          </h2>
          <div className="flex w-full items-center pl-8 pr-10">
            <LabelledInput value={search} onValueChange={setSearch} label="Search" />
            <RadioDropdown
              ariaLabel="Sort By Dropdown"
              headingText="Sort By"
              value={sortValue}
              onValueChange={setSort}
              options={[
                { value: "nameAZ", displayText: "Theme Name (A to Z)" },
                { value: "nameZA", displayText: "Theme Name (Z to A)" },
                { value: "authorAZ", displayText: "Author Name (A to Z)" },
                { value: "authorZA", displayText: "Author Name (Z to A)" },
                { value: "", displayText: "Recently Installed" },
                { value: "", displayText: "Last Modified" },
              ]}
            />
            <TwoItemToggle
              label="# Columns"
              rootClass="hidden 2cols:flex"
              value={numCols + ""}
              options={["1", "2"]}
              onValueChange={(e) => setNumCols(Number(e))}
            />
          </div>
          <div className="flex w-full max-w-[960px] flex-col gap-4 pb-4">
            <button
              className="flex w-fit items-center justify-center gap-2 self-start rounded-full border-2 border-[#2e2e2e] px-4 py-2"
              onClick={() => {
                // refreshThemes(true);
              }}
            >
              <BiReset size={20} color="white" />
              <span className="text-sm font-bold">Refresh Injector</span>
            </button>
          </div>
          <div className="mb-8 flex h-full w-full justify-center">
            {numCols === 1 ? (
              <OneColumnThemeView themes={sortedThemes} />
            ) : (
              <TwoColumnThemeView themes={sortedThemes} />
            )}
          </div>
        </div>
        <div className="h-96 bg-red-800">test</div>
        <div className="mx-auto mt-8 w-full max-w-[960px]">
          <CreatePresetModal />
        </div>
      </main>
    </>
  );
}
