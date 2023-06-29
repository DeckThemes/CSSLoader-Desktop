export function ToggleSwitch({
  checked,
  onValueChange,
  disabled = false,
}: {
  checked: boolean;
  onValueChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="relative flex cursor-pointer items-center">
      <input
        disabled={disabled}
        className="peer sr-only"
        checked={checked}
        type="checkbox"
        onChange={(event) => {
          const switchValue = event.target.checked;
          onValueChange(switchValue);
        }}
      />
      <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-disabled:cursor-auto peer-disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700" />
    </label>
  );
}
