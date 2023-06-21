import { OneColumnThemeView, TwoColumnThemeView, CreatePresetModal } from "../components";
import { useVW } from "../hooks/useVW";

export default function MainPage() {
  const vw = useVW();

  return (
    <>
      {/* pl-4 negates the shift from the scrollbar */}
      <div className="flex flex-1 flex-col pl-4">
        {/* <div className="mt-8">
		  <div className="w-full max-w-[960px] mx-auto text-center">These are your currently installed themes. Get more themes through the Store page.</div>
		</div> */}
        <div className="mx-auto mt-8 w-full max-w-[960px]">
          <CreatePresetModal />
        </div>
        <div className="mt-12 flex flex-col items-center">
          <h2 className="font-fancy mx-auto mb-4 w-full max-w-[960px] text-sm font-bold">
            Installed Themes
          </h2>
          <div className="mb-8 flex h-full w-full justify-center">
            {vw <= 650 ? <OneColumnThemeView /> : <TwoColumnThemeView />}
          </div>
        </div>
      </div>
    </>
  );
}
