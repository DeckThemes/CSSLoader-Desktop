import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { themeContext } from "../../pages/_app";
import { NavTab } from "./NavTab";
import { RiPaintFill, RiUninstallLine } from "react-icons/ri";
import { BiReset } from "react-icons/bi";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BsFolder } from "react-icons/bs";

export function MainNav({ dummyFuncTest }: { dummyFuncTest: any }) {
  const { refreshThemes } = useContext(themeContext);
  return (
    <>
      <div className="h-16 gap-2 flex items-center bg-cardDark">
        <Link href="/" className="flex items-center gap-2 ml-2">
          <Image
            src="logo_css_darkmode.png"
            width={48}
            height={48}
            alt="CSSLoader Logo"
          />
          <h1 className={`fancy-font font-semibold text-2xl hidden 2cols:flex`}>
            CSSLoader
          </h1>
        </Link>
        <button
          onClick={() => {
            dummyFuncTest();
            refreshThemes();
          }}
        >
          <BiReset size={24} color="white" />
        </button>
        <div className="fancy-font ml-auto mr-2 h-full flex items-end gap-2">
          <NavTab href="/" name="Your Themes" icon={<RiPaintFill />} />
          <NavTab
            href="/store"
            name="Download Themes"
            icon={<AiOutlineCloudDownload />}
          />
          <NavTab
            href="/manage-themes"
            name="Manage Themes"
            icon={<BsFolder />}
          />
        </div>
      </div>
    </>
  );
}
