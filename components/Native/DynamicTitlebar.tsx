import dynamic from "next/dynamic";

// @ts-ignore
const DynamicTitleBar = dynamic(() => import("./Titlebar"), {
  ssr: false,
});

export default DynamicTitleBar;