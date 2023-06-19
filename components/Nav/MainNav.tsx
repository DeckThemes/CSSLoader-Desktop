import Image from "next/image";
import Link from "next/link";
import { NavTab } from "./NavTab";
import {
  RiArrowLeftFill,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiPaintFill,
} from "react-icons/ri";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BsFolder } from "react-icons/bs";
import { useState, useEffect } from "react";

export function MainNav() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [contentWidth, setContentWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById("navContainer");
      const content = document.getElementById("navContent");
      if (container && content) {
        setContainerWidth(container.offsetWidth);
        setContentWidth(content.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScrollLeft = () => {
    const minScrollPosition = 0;
    const maxScrollPosition = containerWidth - contentWidth;
    const windowWidth = window.innerWidth;

    setScrollPosition((prevPosition) => {
      const newPosition = prevPosition - windowWidth;
      return Math.max(minScrollPosition, newPosition);
    });
  };

  const handleScrollRight = () => {
    const minScrollPosition = 0;
    const maxScrollPosition = containerWidth - contentWidth;
    const windowWidth = window.innerWidth;

    setScrollPosition((prevPosition) => {
      const newPosition = prevPosition + windowWidth;
      return Math.min(maxScrollPosition, newPosition);
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 max-w-5xl w-full mx-auto">
        <div className="w-full flex basis-auto">
          <Link href="/" className="flex items-center gap-2 my-4">
            <Image
              src="logo_css_darkmode.png"
              width={48}
              height={48}
              alt="CSSLoader Logo"
            />
            <h1 className={`fancy-font font-semibold text-2xl`}>CSSLoader</h1>
          </Link>
        </div>
        <div
          id="navContainer"
          className="fancy-font h-full w-full flex flex-grow basis-auto items-center gap-2 my-4 sm:my-0 overflow-hidden relative"
        >
          <button
            className={`absolute left-0 z-20 top-1/2 -translate-y-1/2 p-2 flex items-center justify-center bg-base-5-dark backdrop-blur-lg rounded-full transition ${
              scrollPosition >= 0 ? "opacity-0 pointer-events-none" : ""
            }`}
            onClick={handleScrollLeft}
            disabled={scrollPosition >= 0}
          >
            <RiArrowLeftLine />
          </button>

          <button
            className={`absolute right-0 z-20 top-1/2 -translate-y-1/2 p-2 flex items-center justify-center bg-base-5-dark backdrop-blur-lg rounded-full transition ${
              scrollPosition <= containerWidth - contentWidth
                ? "opacity-0 pointer-events-none"
                : ""
            }`}
            onClick={handleScrollRight}
            disabled={scrollPosition <= containerWidth - contentWidth}
          >
            <RiArrowRightLine />
          </button>
          <div
            className="flex w-[52px] h-full left-0 top-0 bottom-0 p-0 pointer-events-none absolute items-center justify-center z-10"
            style={{
              background: `${
                scrollPosition >= 0
                  ? ""
                  : "linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgb(9, 10, 12) 48.08%)"
              }`,
            }}
          ></div>
          <div
            className="flex w-[52px] h-full right-0 top-0 bottom-0 p-0 pointer-events-none absolute items-center justify-center z-10"
            style={{
              background: `${
                scrollPosition <= containerWidth - contentWidth
                  ? ""
                  : "linear-gradient(270deg, rgb(9,10,12) 51.92%, rgba(0, 0, 0, 0) 100%)"
              }`,
            }}
          ></div>
          <div
            id="navContent"
            className="w-fit flex flex-row"
            style={{
              transform: `translateX(${scrollPosition}px)`,
              transition: "200ms ease",
            }}
          >
            <div
              className="h-[1px] w-[1px] pointer-events-none invisible ml-auto"
              aria-hidden={true}
            ></div>
            <NavTab href="/" name="Themes" icon={<RiPaintFill />} />
			{/* Replace with actual settings page when ready */}
            {/* <NavTab href="/b" name="Settings" icon={<RiPaintFill />} /> */}
            <NavTab
              href="/store"
              name="Store"
              icon={<AiOutlineCloudDownload />}
            />
            <NavTab href="/manage-themes" name="Manage" icon={<BsFolder />} />
          </div>
        </div>
      </div>
    </>
  );
}
