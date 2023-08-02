import { server } from "./server";
export async function dummyFunction() {
  try {
    return await server!.callPluginMethod<{}, boolean>("dummy_function", {});
  } catch {
    // If backend is not running, fetch fails
    return false;
  }
}
