import { Theme, ThemeError } from "ThemeTypes";
import { createContext } from "react";

export const themeContext = createContext<{
  themes: Theme[];
  setThemes: any;
  refreshThemes: any;
  selectedPreset: Theme | undefined;
  errors: ThemeError[];
  setErrors: any;
}>({
  themes: [],
  setThemes: () => {},
  refreshThemes: () => {},
  selectedPreset: undefined,
  errors: [],
  setErrors: () => {},
});
