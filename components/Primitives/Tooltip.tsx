import { fontContext } from "@contexts/FontContext";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { ReactElement, useContext } from "react";
import { twMerge } from "tailwind-merge";
export function Tooltip({
  triggerContent,
  delayDuration = 100,
  tooltipSide = "bottom",
  contentClass = "",
  arrow = false,
  content,
}: {
  triggerContent: ReactElement;
  delayDuration?: number;
  tooltipSide?: "top" | "bottom" | "left" | "right";
  contentClass?: string;
  arrow?: boolean;
  content: ReactElement | string;
}) {
  const { montserrat } = useContext(fontContext);
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={delayDuration}>
        <RadixTooltip.Trigger>{triggerContent}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <div className={`dark ${montserrat} font-fancy`}>
            <RadixTooltip.Content
              side={tooltipSide}
              className={twMerge(
                "font-fancy rounded-xl bg-fore-3-light p-2 px-4 text-black dark:bg-fore-3-dark dark:text-white",
                contentClass
              )}
            >
              {arrow && <RadixTooltip.Arrow />}
              {content}
            </RadixTooltip.Content>
          </div>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
