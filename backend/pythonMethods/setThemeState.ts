import { server } from "./server";
export function setThemeState(
  name: string,
  state: boolean,
  set_deps?: boolean,
  set_deps_value?: boolean
): Promise<any> {
  return server!.callPluginMethod("set_theme_state", {
    name: name,
    state: state,
    set_deps: set_deps ?? true,
    set_deps_value: set_deps_value ?? true,
  });
}
