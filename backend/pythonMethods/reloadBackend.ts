import { Theme } from "../../ThemeTypes";
import { getInstalledThemes } from "./getInstalledThemes";
import { server } from "./server";
export function reloadBackend(): Promise<Theme[] | undefined> {
  return server!.callPluginMethod("reset", {}).then(() => {
    return getInstalledThemes();
  });
}
