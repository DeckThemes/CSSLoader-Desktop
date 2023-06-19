import { server } from "./server";
export function setPatchOfTheme(
  themeName: string,
  patchName: string,
  value: string
): Promise<any> {
  return server!.callPluginMethod("set_patch_of_theme", {
    themeName: themeName,
    patchName: patchName,
    value: value,
  });
}
