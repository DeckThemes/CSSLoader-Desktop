import { BiReset } from "react-icons/bi";
import { OneColumnThemeView, TwoColumnThemeView, CreatePresetModal } from "../components";
import { useVW } from "../hooks/useVW";
import { themeContext } from "./_app";
import { useContext, useState, useEffect, useMemo } from "react";
import { LabelledInput, RadioDropdown, TwoItemToggle } from "@components/Primitives";
import { TbColumns1, TbColumns2 } from "react-icons/tb";

export default function MainPage() {
  const vw = useVW();
  const { refreshThemes, themes } = useContext(themeContext);
  const [search, setSearch] = useState<string>("");
  const [numCols, setNumCols] = useState<number>(1);
  const [sortValue, setSort] = useState<any>("nameAZ");

  const sortedThemes = useMemo(() => {
    const filteredThemes = themes.filter(
      (e) => e.name.toLowerCase().includes(search) || e.author.toLowerCase().includes(search)
    );
    console.log(filteredThemes);
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
        case "created": {
          return a.created > b.created ? -1 : a.created < b.created ? 1 : 0;
        }
        case "modified": {
          return a.modified > b.modified ? -1 : a.modified < b.modified ? 1 : 0;
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
      <main className="flex flex-1 flex-grow flex-col items-center gap-4">
        {/* <div className="mt-8">
		  <div className="w-full max-w-[960px] mx-auto text-center">These are your currently installed themes. Get more themes through the Store page.</div>
		</div> */}

        <div className="mt-12 flex w-full flex-col items-center">
          {/* <h2 className="font-fancy mx-auto mb-4 w-full max-w-[960px] text-sm font-bold">
            Installed Themes
          </h2> */}
          <div className="flex w-full flex-col items-center gap-4 px-8">
            <div className="flex w-full max-w-[960px] items-end justify-between gap-4">
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
                  { value: "created", displayText: "Recently Installed" },
                  { value: "modified", displayText: "Last Modified" },
                ]}
              />
              <TwoItemToggle
                buttonClass="h-12 rounded-xl"
                highlightClass="rounded-lg"
                label="Display"
                rootClass="hidden 2cols:flex"
                optionClass="w-4"
                value={numCols}
                options={[
                  { value: 1, displayText: <TbColumns1 size={18} /> },
                  { value: 2, displayText: <TbColumns2 size={18} /> },
                ]}
                onValueChange={setNumCols}
              />
            </div>
            <div className="flex w-full max-w-5xl items-end justify-center gap-4"></div>
          </div>

          <div className="mb-8 flex h-full w-full justify-center">
            {numCols === 1 ? (
              <OneColumnThemeView themes={sortedThemes} />
            ) : (
              <TwoColumnThemeView themes={sortedThemes} />
            )}
          </div>
        </div>
        <div className="mx-auto mt-8 w-full max-w-[960px]">
          <CreatePresetModal />
          <button
            className="flex h-full w-fit items-center justify-center gap-2 rounded-full border-2 border-[#2e2e2e] px-4 py-2"
            onClick={() => {
              // refreshThemes(true);
            }}
          >
            <BiReset size={20} color="white" />
            <span className="text-sm font-bold">Refresh Injector</span>
          </button>
        </div>
      </main>
    </>
  );
}
