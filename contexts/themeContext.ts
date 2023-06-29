import { Theme } from "ThemeTypes";
import { createContext } from "react";

export const themeContext = createContext<{
  themes: Theme[];
  setThemes: any;
  refreshThemes: any;
  selectedPreset: Theme | undefined;
}>({
  themes: [],
  setThemes: () => {},
  refreshThemes: () => {},
  selectedPreset: undefined,
});
