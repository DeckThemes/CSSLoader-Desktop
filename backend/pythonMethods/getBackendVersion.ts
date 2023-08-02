import { server } from "./server";
export function getBackendVersion(): Promise<any> {
  return server!.callPluginMethod("get_backend_version", {});
}
