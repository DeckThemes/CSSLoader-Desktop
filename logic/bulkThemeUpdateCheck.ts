import { MinimalCSSThemeInfo, Theme } from "../ThemeTypes";
import { LocalThemeStatus } from "../pages/manage-themes";
import { apiUrl } from "../constants";
import { fetch } from "@tauri-apps/api/http";

export type UpdateStatus = [
  string,
  LocalThemeStatus,
  false | MinimalCSSThemeInfo
];

async function fetchThemeIDS(
  idsToQuery: string[]
): Promise<MinimalCSSThemeInfo[]> {
  const queryStr = "?ids=" + idsToQuery.join(".");
  return fetch<MinimalCSSThemeInfo[]>(`${apiUrl}/themes/ids${queryStr}`)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      if (data) return data;
      return [];
    })
    .catch((err) => {
      console.error("Error Fetching Theme Updates!", err);
      return [];
    });
}

export async function bulkThemeUpdateCheck(localThemeList: Theme[] = []) {
  let idsToQuery: string[] = localThemeList.map((e) => e.id);
  if (idsToQuery.length === 0) return [];

  const themeArr = await fetchThemeIDS(idsToQuery);
  if (themeArr.length === 0) return [];

  const updateStatusArr: UpdateStatus[] = localThemeList.map((localEntry) => {
    const remoteEntry = themeArr.find(
      (remote) => remote.id === localEntry.id || remote.name === localEntry.id
    );
    if (!remoteEntry) return [localEntry.id, "local", false];
    if (remoteEntry.version === localEntry.version)
      return [localEntry.id, "installed", remoteEntry];
    return [localEntry.id, "outdated", remoteEntry];
  });

  return updateStatusArr;
}
