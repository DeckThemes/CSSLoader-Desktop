import { server } from "./server";
export function deleteTheme(themeName: string): Promise<any> {
  return server!.callPluginMethod("delete_theme", { themeName: themeName });
}
