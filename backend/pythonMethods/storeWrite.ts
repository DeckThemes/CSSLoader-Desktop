import { server } from "./server";
export function storeWrite(key: string, value: string) {
  return server!.callPluginMethod("store_write", { key: key, val: value });
}
