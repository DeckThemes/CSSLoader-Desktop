import { server } from "./server";
export function dummyFunction() {
  return server!.callPluginMethod<{}, boolean>("dummy_function", {});
}
