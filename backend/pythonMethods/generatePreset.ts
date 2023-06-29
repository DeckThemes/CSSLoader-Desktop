import { server } from "./server";
export function generatePreset(name: string) {
  return server!.callPluginMethod("generate_preset_theme", { name: name });
}
