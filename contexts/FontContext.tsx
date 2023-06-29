import { Montserrat, Open_Sans } from "next/font/google";
import { Children, createContext } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--opensans",
});

export const fontContext = createContext<{ montserrat: any; openSans: any }>({
  montserrat: "",
  openSans: "",
});
// TODO: add type def
export function FontContext({ children }: { children: any }) {
  return (
    <fontContext.Provider value={{ montserrat: montserrat.variable, openSans: openSans.variable }}>
      {children}
    </fontContext.Provider>
  );
}
