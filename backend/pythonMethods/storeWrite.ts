import { server } from "./server";
export function storeWrite(key: string, value: string) {
  return server!.callPluginMethod<{ key: string; val: string }, void>(
    "store_write",
    { key: key, val: value }
  );
}
