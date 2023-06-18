import Image from "next/image";
import Link from "next/link";
import { NavTab } from "./NavTab";
import { RiPaintFill } from "react-icons/ri";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BsFolder } from "react-icons/bs";

export function MainNav() {
  return (
    <>
      <div className="flex flex-col items-center">
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
        </div>
      </div>
    </>
  );
}
