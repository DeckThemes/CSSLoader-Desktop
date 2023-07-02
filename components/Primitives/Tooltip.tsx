import { fontContext } from "@contexts/FontContext";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { ReactElement, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
export function Tooltip({
  triggerContent,
  delayDuration = 100,
  tooltipSide = "bottom",
  contentClass = "",
  arrow = false,
  disabled = false,
  content,
  triggerRootClass = "",
  align = "center",
}: {
  triggerContent: ReactElement;
  delayDuration?: number;
  tooltipSide?: "top" | "bottom" | "left" | "right";
  contentClass?: string;
  disabled?: boolean;
  arrow?: boolean;
  content: ReactElement | string;
  triggerRootClass?: string;
  align?: "center" | "end" | "start";
}) {
  const { montserrat } = useContext(fontContext);
  const [open, setOpen] = useState(false);
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root
        open={open}
        onOpenChange={(open) => !disabled && setOpen(open)}
        delayDuration={delayDuration}
      >
        <RadixTooltip.Trigger className={triggerRootClass}>{triggerContent}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <div className={`dark ${montserrat} font-fancy`}>
            <RadixTooltip.Content
              align="end"
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
