import { server } from "./server";
export function storeRead(key: string) {
  return server!.callPluginMethod<{ key: string }, string>("store_read", {
    key: key,
  });
}
