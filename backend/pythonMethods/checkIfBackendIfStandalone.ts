import { server } from "./server";
export async function checkIfBackendIsStandalone() {
  return server!
    .callPluginMethod<{}, boolean>("is_standalone", {})
    .then((data) => {
      if (data.success) {
        return data.result;
      }
      return true;
    });
}
