import { Theme } from "../../ThemeTypes";
import { server } from "./server";
export function getInstalledThemes(): Promise<Theme[] | undefined> {
  return server!
    .callPluginMethod<{}, Theme[]>("get_themes", {})
    .then((data) => {
      if (data.success) {
        return data.result;
      }
    });
}
