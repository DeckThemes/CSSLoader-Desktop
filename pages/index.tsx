import { BiReset } from "react-icons/bi";
import { OneColumnThemeView, TwoColumnThemeView, CreatePresetModal } from "../components";
import { useVW } from "../hooks/useVW";
import { themeContext } from "./_app";
import { useContext } from "react";

export default function MainPage() {
  const vw = useVW();
  const { refreshThemes } = useContext(themeContext);

  return (
    <>
      {/* pl-4 negates the shift from the scrollbar */}
      <div className="flex flex-1 flex-col pl-4 ">
        {/* <div className="mt-8">
		  <div className="w-full max-w-[960px] mx-auto text-center">These are your currently installed themes. Get more themes through the Store page.</div>
		</div> */}

        <div className="mt-12 flex flex-col items-center">
          <h2 className="font-fancy mx-auto mb-4 w-full max-w-[960px] text-sm font-bold">
            Installed Themes
          </h2>
          <div className="flex w-full max-w-[960px] flex-col gap-4 pb-4">
            <button
              className="flex w-fit items-center justify-center gap-2 self-start rounded-full border-2 border-[#2e2e2e] px-4 py-2"
              onClick={() => {
                refreshThemes(true);
              }}
            >
              <BiReset size={20} color="white" />
              <span className="text-sm font-bold">Refresh Injector</span>
            </button>
          </div>
          <div className="mb-8 flex h-full w-full justify-center">
            {vw <= 650 ? <OneColumnThemeView /> : <TwoColumnThemeView />}
          </div>
        </div>
        <div className="mx-auto mt-8 w-full max-w-[960px]">
          <CreatePresetModal />
        </div>
      </div>
    </>
  );
}
