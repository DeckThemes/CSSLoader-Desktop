import { server } from "./server";
export function setThemeState(name: string, state: boolean): Promise<any> {
  return server!.callPluginMethod("set_theme_state", {
    name: name,
    state: state,
  });
}
