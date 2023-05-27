import { server } from "./server";
export function storeRead(key: string) {
  return server!.callPluginMethod("store_read", { key: key });
}
