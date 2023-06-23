import * as Label from "@radix-ui/react-label";
import { twMerge } from "tailwind-merge";

export function LabelledInput({
  label,
  value,
  onValueChange,
  rootClass = "",
  labelClass = "",
  placeholder = "",
  inputClass = "",
}: {
  label: string;
  value: string;
  onValueChange: (e: string) => void;
  rootClass?: string;
  labelClass?: string;
  placeholder?: string;
  inputClass?: string;
}) {
  return (
    <div className={twMerge("flex w-full flex-col items-start justify-between gap-2", rootClass)}>
      <Label.Root className={twMerge("font-fancy text-sm font-bold", labelClass)}>
        {label}
      </Label.Root>
      <input
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={twMerge(
          "h-12 w-full rounded-xl border-2 border-borders-base1-light bg-base-3-light px-2 outline-none transition-all hover:border-borders-base2-light focus:border-borders-base3-light dark:border-borders-base1-dark dark:bg-base-3-dark hover:dark:border-borders-base2-dark focus:dark:border-borders-base3-dark",
          inputClass
        )}
      />
    </div>
  );
}
