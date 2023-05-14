import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { themeContext } from "../../pages/_app";
import { NavTab } from "./NavTab";
import { RiUninstallLine } from "react-icons/ri";
import { BiReset, BiStoreAlt } from "react-icons/bi";
import { ImList2 } from "react-icons/im";

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
          <h1 className={`fancy-font font-semibold text-3xl hidden 2cols:flex`}>
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
          <NavTab href="/" name="Your Themes" icon={<ImList2 />} />
          <NavTab href="/store" name="Download Themes" icon={<BiStoreAlt />} />
          <NavTab
            href="/manage-themes"
            name="Manage Themes"
            icon={<RiUninstallLine />}
          />
        </div>
      </div>
    </>
  );
}
