import Image from "next/image";
import Link from "next/link";
import { NavTab } from "./NavTab";
import { RiArrowLeftLine, RiArrowRightLine, RiPaintFill, RiSettings2Fill } from "react-icons/ri";
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
      <div
        className="fixed mt-2 top-8 left-0 right-0 isolate z-[9998] dark:bg-base-6-dark"
        style={{ boxShadow: "0px 0px 15px #090a0c, 0px 4px 15px #090a0c" }}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col px-4 sm:flex-row sm:items-center sm:justify-between">
          {/* <div className="flex w-full flex-1 basis-auto select-none items-center">
            <Link
              href="/"
              className="group  my-4 flex items-center gap-2 transition duration-150 hover:scale-95 hover:active:scale-90"
            >
              <Image
                src="logo_css_darkmode.png"
                width={28}
                height={28}
                alt="CSSLoader Logo"
                className="transition duration-[750ms] group-hover:brightness-150 group-hover:hue-rotate-180"
              />
              <h1 className={`font-fancy text-xl font-semibold`}>CSSLoader</h1>
            </Link>
          </div> */}
          <div
            id="navContainer"
            className="font-fancy relative flex h-full w-full flex-grow basis-auto items-center gap-2 overflow-hidden sm:my-0"
          >
            <button
              className={`absolute left-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full bg-base-5-dark p-2 backdrop-blur-lg transition ${
                scrollPosition >= 0 ? "pointer-events-none opacity-0" : ""
              }`}
              onClick={handleScrollLeft}
              disabled={scrollPosition >= 0}
            >
              <RiArrowLeftLine />
            </button>

            <button
              className={`absolute right-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full bg-base-5-dark p-2 backdrop-blur-lg transition ${
                scrollPosition <= containerWidth - contentWidth
                  ? "pointer-events-none opacity-0"
                  : ""
              }`}
              onClick={handleScrollRight}
              disabled={scrollPosition <= containerWidth - contentWidth}
            >
              <RiArrowRightLine />
            </button>
            <div
              className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 flex h-full w-[52px] items-center justify-center p-0"
              style={{
                background: `${
                  scrollPosition >= 0
                    ? ""
                    : "linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgb(9, 10, 12) 48.08%)"
                }`,
              }}
            ></div>
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 flex h-full w-[52px] items-center justify-center p-0"
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
              className="flex w-fit flex-row"
              style={{
                transform: `translateX(${scrollPosition}px)`,
                transition: "200ms ease",
              }}
            >
              <div
                className="pointer-events-none invisible ml-auto h-[1px] w-[1px]"
                aria-hidden={true}
              ></div>
              <NavTab href="/" name="Themes" icon={<RiPaintFill />} />
              {/* Replace with actual settings page when ready */}
              <NavTab href="/store" name="Store" icon={<AiOutlineCloudDownload />} />
              <NavTab href="/manage-themes" name="Manage" icon={<BsFolder />} />
              <NavTab href="/settings" name="Settings" icon={<RiSettings2Fill />} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
