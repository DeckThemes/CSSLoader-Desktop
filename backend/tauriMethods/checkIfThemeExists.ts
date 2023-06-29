import { exists, BaseDirectory } from "@tauri-apps/api/fs";

export async function checkIfThemeExists(themeName: string): Promise<boolean> {
  return await exists(`homebrew/themes/${themeName}`, {
    dir: BaseDirectory.Home,
  });
}
