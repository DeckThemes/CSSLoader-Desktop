import { ThemeError } from "../../ThemeTypes";
import { server } from "./server";
export function getLastLoadErrors(): Promise<ThemeError[] | undefined> {
  return server!
    .callPluginMethod<{}, { fails: ThemeError[] }>("get_last_load_errors", {})
    .then((data) => {
      if (data.success) {
        return data.result.fails;
      }
    });
}
