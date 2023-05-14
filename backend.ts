import { fetch, Body } from "@tauri-apps/api/http";
import { Theme } from "./ThemeTypes";
import { Command } from "@tauri-apps/api/shell";

import { toast as reactToast } from "react-toastify";

export interface Server {
  callPluginMethod<TArgs = {}, TRes = {}>(
    methodName: string,
    args: TArgs
  ): Promise<ServerResponse<TRes>>;
}
export type ServerResponse<TRes> =
  | ServerResponseSuccess<TRes>
  | ServerResponseError;
interface ServerResponseSuccess<TRes> {
  success: true;
  result: TRes;
}
interface ServerResponseError {
  success: false;
  result: string;
}

const server: Server = {
  async callPluginMethod(methodName: string, args: any): Promise<any> {
    console.log("FETCHING", methodName);
    return fetch("http://127.0.0.1:35821/req", {
      method: "POST",
      body: Body.json({
        method: methodName,
        args: args,
      }),
    })
      .then((res) => {
        return res.data;
      })
      .then((json: any) => {
        return {
          result: json?.res || undefined,
          success: json?.success || false,
        };
      });
  },
};

export async function startBackend(onClose: any = () => {}) {
  const command = new Command("startBackend", [
    "Start-Process",
    "-FilePath",
    "([Environment]::GetFolderPath('Startup')",
    "+",
    "'\\CssLoader-Standalone-Headless.exe')",
  ]);
  command.on("close", onClose);
  await command.spawn();
}

export async function downloadBackend(onClose: any = () => {}) {
  const command = new Command("downloadBackend", [
    "Invoke-WebRequest",
    "-Uri",
    "https://github.com/suchmememanyskill/SDH-CssLoader/releases/latest/download/CssLoader-Standalone-Headless.exe",
    "-OutFile",
    "([Environment]::GetFolderPath('Startup')",
    "+",
    "'\\CssLoader-Standalone-Headless.exe')",
  ]);
  command.on("close", onClose);
  await command.spawn();
}

export function fetchThemePath() {
  return server!.callPluginMethod("fetch_theme_path", {});
}

export function resolve(promise: Promise<any>, setter: any) {
  (async function () {
    let data = await promise;
    if (data.success) {
      console.log("Got resolved", data, "promise", promise);
      setter(data.result);
    } else {
      console.log("Resolve failed:", data, "promise", promise);
    }
  })();
}

export function execute(promise: Promise<any>) {
  (async function () {
    let data = await promise;
    if (data.success) {
      console.debug("Got executed", data, "promise", promise);
    } else {
      console.warn("Execute failed:", data, "promise", promise);
    }
  })();
}

export function getInstalledThemes(): Promise<Theme[] | undefined> {
  return server!
    .callPluginMethod<{}, Theme[]>("get_themes", {})
    .then((data) => {
      if (data.success) {
        return data.result;
      }
    });
}

export function reloadBackend(): Promise<Theme[] | undefined> {
  return server!.callPluginMethod("reset", {}).then(() => {
    return getInstalledThemes();
  });
}

export function getThemes(): Promise<any> {
  return server!.callPluginMethod<{}, Theme[]>("get_themes", {});
}

export function setThemeState(name: string, state: boolean): Promise<any> {
  return server!.callPluginMethod("set_theme_state", {
    name: name,
    state: state,
  });
}

export function setPatchOfTheme(
  themeName: string,
  patchName: string,
  value: string
): Promise<any> {
  return server!.callPluginMethod("set_patch_of_theme", {
    themeName: themeName,
    patchName: patchName,
    value: value,
  });
}

export function setComponentOfThemePatch(
  themeName: string,
  patchName: string,
  componentName: string,
  value: string
): Promise<any> {
  return server!.callPluginMethod("set_component_of_theme_patch", {
    themeName: themeName,
    patchName: patchName,
    componentName: componentName,
    value: value,
  });
}

export function toast(title: string, message?: string) {
  reactToast(`${title}${message ? ` - ${message}` : ""}`);
}

export function downloadThemeFromUrl(themeId: string): Promise<any> {
  return server!.callPluginMethod("download_theme_from_url", {
    id: themeId,
    url: "https://api.deckthemes.com/",
  });
}

export function deleteTheme(themeName: string): Promise<any> {
  return server!.callPluginMethod("delete_theme", { themeName: themeName });
}

export function storeRead(key: string) {
  return server!.callPluginMethod("store_read", { key: key });
}

export function storeWrite(key: string, value: string) {
  return server!.callPluginMethod("store_write", { key: key, val: value });
}

export function getBackendVersion(): Promise<any> {
  return server!.callPluginMethod("get_backend_version", {});
}

export function dummyFunction(): Promise<any> {
  return server!.callPluginMethod("dummy_function", {});
}

// export function unpinTheme(id: string) {
//   const { unpinnedThemes } = globalState!.getPublicState();
//   const setGlobalState = globalState!.setGlobalState.bind(globalState);
//   const newArr = [...unpinnedThemes, id];
//   setGlobalState("unpinnedThemes", newArr);
//   return storeWrite("unpinnedThemes", JSON.stringify(newArr));
// }

// export function pinTheme(id: string) {
//   const { unpinnedThemes } = globalState!.getPublicState();
//   const setGlobalState = globalState!.setGlobalState.bind(globalState);
//   const newArr = unpinnedThemes.filter((e) => e !== id);
//   setGlobalState("unpinnedThemes", newArr);
//   return storeWrite("unpinnedThemes", JSON.stringify(newArr));
// }

export function generatePreset(name: string) {
  return server!.callPluginMethod("generate_preset_theme", { name: name });
}
