import {
  OneColumnThemeView,
  TwoColumnThemeView,
  CreatePresetModal,
} from "../components";
import { useVW } from "../hooks/useVW";

export default function MainPage() {
  const vw = useVW();

  return (
    <>
      {/* pl-4 negates the shift from the scrollbar */}
      <div className="flex flex-col flex-1 pl-4">
        {/* <div className="mt-8">
		  <div className="w-full max-w-[960px] mx-auto text-center">These are your currently installed themes. Get more themes through the Store page.</div>
		</div> */}
        <div className="mt-8 max-w-[960px] w-full mx-auto">
          <CreatePresetModal />
        </div>
        <div className="mt-12 flex flex-col items-center">
          <h2 className="font-fancy text-sm font-bold mb-4 mx-auto max-w-[960px] w-full">
            Installed Themes
          </h2>
          <div className="w-full flex justify-center h-full mb-8">
            {vw <= 650 ? <OneColumnThemeView /> : <TwoColumnThemeView />}
          </div>
        </div>
      </div>
    </>
  );
}
