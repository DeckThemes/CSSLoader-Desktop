import { fetch, Body } from "@tauri-apps/api/http";
import { Theme } from "./ThemeTypes";
import { Command } from "@tauri-apps/api/shell";
import {
  writeTextFile,
  readTextFile,
  BaseDirectory,
  createDir,
  exists,
} from "@tauri-apps/api/fs";
import { toast as reactToast } from "react-toastify";
import semver from "semver";

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

export async function killBackend(onClose: any = () => {}) {
  const command = new Command("killBackend", [
    "taskkill",
    "/IM",
    "CssLoader-Standalone-Headless.exe",
    "/F",
  ]);
  command.on("close", onClose);
  command.on("error", onClose);
  await command.spawn();
}

export async function getStandaloneVersion() {
  const version = await readTextFile("standaloneVersion.txt", {
    dir: BaseDirectory.AppData,
  }).catch((err) => {
    return false;
  });
  return version;
}

export async function setStandaloneVersion(value: string) {
  const appDataExists = await exists("", { dir: BaseDirectory.AppData });
  if (!appDataExists) {
    console.log("AppData dir does not exist! Creating.");
    await createDir("", { dir: BaseDirectory.AppData });
  }
  writeTextFile("standaloneVersion.txt", value, { dir: BaseDirectory.AppData });
}

export async function fetchNewest() {
  return await fetch<any>(
    "https://api.github.com/repos/suchmememanyskill/SDH-CssLoader/releases/latest"
  )
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .then((json) => {
      if (json) {
        return json;
      }
      return;
    })
    .catch((err) => {
      console.error("Error Fetching Latest Backend From Github!", err);
      return;
    });
}

export async function checkForNewStandalone(): Promise<boolean | string> {
  const current = await getStandaloneVersion();
  const remote = await fetchNewest();
  const remoteVersion = remote?.tag_name;
  console.log(current, remoteVersion);
  // This returns remoteVersion because if it's not valid, it means your current install borked
  if (!current || typeof current !== "string") return remoteVersion;
  if (!semver.valid(current)) return remoteVersion;

  // This is after ensuring you have a standaloneVersion.txt
  if (!remote) return false;
  if (!semver.valid(remoteVersion)) return false;
  if (semver.gt(remoteVersion, current)) {
    return remoteVersion;
  }
  return false;
}

export async function checkIfBackendExists() {
  const backendExists = await exists(
    "Microsoft\\Windows\\Start Menu\\Programs\\Startup\\CssLoader-Standalone-Headless.exe",
    {
      dir: BaseDirectory.Config,
    }
  );
  return backendExists;
}

export async function downloadBackend(onClose: any = () => {}) {
  const release = await fetchNewest();
  const url = release.assets.find((e: any) =>
    e.name.includes("Standalone-Headless.exe")
  ).url;
  const version = semver.clean(release.tag_name || "v1.0.0") || "v1.6.0";
  setStandaloneVersion(version);
  const command = new Command("downloadBackend", [
    "Invoke-WebRequest",
    "-Uri",
    url,
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
