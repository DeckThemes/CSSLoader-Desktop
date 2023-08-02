import * as Switch from "@radix-ui/react-switch";
import { useState, useEffect } from "react";

export function ToggleSwitch({
  checked: propChecked,
  onChange,
  disabled = false,
}: {
  checked?: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  // because checked is controlled by prop and by state, we have to do this
  const [stateChecked, setStateChecked] = useState(false);

  useEffect(() => {
    setStateChecked(propChecked ?? false);
  }, [propChecked]);

  const handleToggle = () => {
    const newValue = !stateChecked;
    setStateChecked(newValue);
    onChange(newValue);
  };

  return (
    <Switch.Root
      checked={stateChecked}
      disabled={disabled}
      onCheckedChange={() => handleToggle()}
      className="relative h-[25px] w-[42px] cursor-default rounded-full bg-base-6-dark shadow-[0_2px_10px] shadow-base-2-dark outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-[hsl(43_100%_64.0%)] data-[state=checked]:bg-brandBlue"
    >
      <Switch.Thumb className="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] shadow-base-2-dark transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
    </Switch.Root>
  );
}
