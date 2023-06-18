import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { themeContext } from "../../pages/_app";
import { NavTab } from "./NavTab";
import { RiPaintFill } from "react-icons/ri";
import { BiReset } from "react-icons/bi";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BsFolder } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";

export function MainNav() {
  const { refreshThemes } = useContext(themeContext);
  return (
    <>
      <div className="flex flex-col items-center bg-cardDark">
        <Link href="/" className="flex items-center gap-2 my-4">
          <Image
            src="logo_css_darkmode.png"
            width={48}
            height={48}
            alt="CSSLoader Logo"
          />
          <h1 className={`fancy-font font-semibold text-2xl`}>
            CSSLoader
          </h1>
        </Link>
        <div className="fancy-font h-full flex items-center gap-2 my-4">
          <NavTab href="/" name="Themes" icon={<RiPaintFill />} />
          <NavTab
            href="/store"
            name="Store"
            icon={<AiOutlineCloudDownload />}
          />
          <NavTab href="/manage-themes" name="Manage" icon={<BsFolder />} />
          {/* <NavTab href="/manage-themes" name="Settings" icon={<FiSettings />} /> */}
          <button
		  	className="flex items-center justify-center border-2 border-[#2e2e2e] rounded-full p-2 gap-2"
            onClick={() => {
              refreshThemes(true);
            }}
          >
            <BiReset size={20} color="white" />
			<span className="text-sm font-bold">Refresh Steam</span>
          </button>
        </div>
      </div>
    </>
  );
}
