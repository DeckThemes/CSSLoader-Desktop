import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { BsDot } from "react-icons/bs";
import { useState, useContext } from "react";
import { fontContext } from "@pages/_app";

export function SimpleRadioDropdown({
  options,
  value,
  onValueChange,
  triggerClass = "",
}: {
  options: string[];
  value: string;
  onValueChange: (e: string) => void;
  triggerClass?: string;
}) {
  const { montserrat } = useContext(fontContext);

  const [selected, setSelected] = useState<string>(value);
  function handleChange(newValue: string) {
    setSelected(newValue);
    onValueChange(newValue);
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex w-full select-none flex-col items-end gap-2">
        <div
          className={twMerge(
            "flex h-8 max-w-[250px] items-center justify-center rounded-xl border-2 border-borders-base1-light  bg-base-3-light px-4 outline-none transition-all hover:border-borders-base2-light dark:border-borders-base1-dark dark:bg-base-3-dark hover:dark:border-borders-base2-dark",
            triggerClass
          )}
        >
          <div className="flex h-full w-fit flex-1 items-center justify-between text-sm">
            <span>{selected}</span>
          </div>
          <MdKeyboardArrowDown />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <div className={`dark ${montserrat} contents`}>
          {/* bg-base-3-light dark:bg-base-3-dark w-[250px] text-black dark:text-white rounded-xl border-2 border-borders-base2-light dark:border-borders-base2-dark  */}
          <DropdownMenu.Content
            align="end"
            avoidCollisions
            collisionPadding={16}
            className="font-fancy radio-dropdown z-[9999] my-1 h-max w-[250px] cursor-default select-none overflow-hidden overflow-y-auto rounded-xl bg-base-3-light text-sm text-black transition-all dark:bg-base-3-dark dark:text-white"
          >
            <DropdownMenu.RadioGroup value={selected} onValueChange={handleChange}>
              <div className="max-h-[var(--radix-popper-available-height)]">
                {options.map((e) => (
                  <DropdownMenu.RadioItem
                    value={e}
                    key={e}
                    className="relative m-1 flex items-center justify-center rounded-lg px-4 py-2 pl-8 outline-none hover:bg-brandBlue focus:bg-brandBlue dark:hover:bg-brandBlue dark:focus:bg-brandBlue"
                  >
                    <DropdownMenu.ItemIndicator className="absolute -left-1 top-1/2 -translate-y-1/2">
                      <BsDot size={36} />
                    </DropdownMenu.ItemIndicator>
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className={twMerge("flex w-fit items-center font-semibold")}>{e}</span>
                    </div>
                  </DropdownMenu.RadioItem>
                ))}
              </div>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </div>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
