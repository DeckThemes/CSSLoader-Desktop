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
      <div className="flex items-center flex-col pb-10">
        <div className="flex justify-center">
          {vw <= 650 ? <OneColumnThemeView /> : <TwoColumnThemeView />}
        </div>
        <CreatePresetModal />
      </div>
    </>
  );
}
