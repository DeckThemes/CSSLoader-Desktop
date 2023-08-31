import { BiInfoCircle, BiReset } from "react-icons/bi";
import { OneColumnThemeView, TwoColumnThemeView, PresetSelectionDropdown } from "../components";
import { useVW } from "../hooks/useVW";
import { themeContext } from "@contexts/themeContext";
import { useContext, useState, useEffect, useMemo } from "react";
import { LabelledInput, RadioDropdown, Tooltip, TwoItemToggle } from "@components/Primitives";
import { TbColumns1, TbColumns2 } from "react-icons/tb";
import { Flags } from "ThemeTypes";
import Link from "next/link";
import { storeRead, storeWrite } from "backend";
import { test } from "backend/tauriMethods/test";

export default function MainPage() {
  const vw = useVW();
  const { refreshThemes, themes } = useContext(themeContext);
  const [search, setSearch] = useState<string>("");
  const [numCols, setNumCols] = useState<number>(1);
  const [sortValue, setSort] = useState<any>("nameAZ");

  useEffect(() => {
    storeRead("desktopDisplay").then((res) => {
      if (!res.success) return;
      if (res.result === "1" || res.result === "2") setNumCols(Number(res.result));
    });
    storeRead("desktopSort").then((res) => {
      if (!res.success || res?.result?.length === 0) return;
      setSort(res.result);
    });
  }, []);

  const [sortedThemes] = useMemo(() => {
    const filteredAll = themes.filter(
      (e) =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.author.toLowerCase().includes(search)
    );
    const sortedAll = filteredAll.sort((a, b) => {
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
    // const sortedPresets = sortedAll.filter((e) => e.flags.includes(Flags.isPreset));
    const sortedThemes = sortedAll.filter((e) => !e.flags.includes(Flags.isPreset));
    return [sortedThemes];
  }, [themes, search, sortValue]);

  useEffect(() => {
    if (vw < 650 && numCols === 2) {
      setNumCols(1);
      storeWrite("desktopDisplay", "1");
    }
  }, [vw]);

  return (
    <>
      <main className="flex flex-1 flex-grow flex-col items-center gap-4">
        <div className="mt-6 flex w-full flex-col items-center">
          {/* <h2 className="font-fancy mx-auto mb-4 w-full max-w-[960px] text-sm font-bold">
            Installed Themes
          </h2> */}
          <div className="flex w-full flex-col items-center gap-4 px-4">
            <div className="flex w-full max-w-[960px] items-end justify-between gap-4">
              <LabelledInput value={search} onValueChange={setSearch} label="Search" />
              <RadioDropdown
                ariaLabel="Sort By Dropdown"
                headingText="Sort By"
                value={sortValue}
                onValueChange={(value) => {
                  setSort(value);
                  storeWrite("desktopSort", value);
                }}
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
                onValueChange={(value) => {
                  setNumCols(value);
                  storeWrite("desktopDisplay", value + "");
                }}
              />
            </div>
            <div className="flex w-full max-w-5xl items-end justify-center gap-4"></div>
          </div>

          <div className="mb-8 mt-6 flex h-full w-full flex-col items-center justify-center gap-4 px-4">
            <span className="w-full max-w-[960px] text-lg font-bold">Themes</span>
            <div className="flex w-full max-w-[960px] items-center justify-between">
              <PresetSelectionDropdown />
            </div>
            {themes.length > 0 ? (
              <>
                {numCols === 1 ? (
                  <OneColumnThemeView themes={sortedThemes} />
                ) : (
                  <TwoColumnThemeView themes={sortedThemes} />
                )}
              </>
            ) : (
              <>
                <span className="w-full max-w-[960px]">
                  You have no themes installed. Download some from{" "}
                  <Link href="/store" className="text-brandBlue underline">
                    the store
                  </Link>
                </span>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 flex w-full max-w-[960px] items-end justify-between px-4 pb-8">
          <button
            className="flex h-full w-fit items-center justify-center gap-2 rounded-full border-2 border-[#2e2e2e] px-4 py-2 focus-visible:ring-4 focus-visible:ring-amber9"
            onClick={() => {
              refreshThemes(true);
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
