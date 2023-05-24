import { Platform } from "@tauri-apps/api/os";
import { useEffect, useState } from "react";

export function usePlatform() {
  const [platform, setPlatform] = useState<Platform>("linux");

  useEffect(() => {
    const getPlatform = async () => {
      const { platform: tauriPlatform } = await import("@tauri-apps/api/os");
      tauriPlatform().then((value) => {
        console.log("platform: ", value);
        setPlatform(value);
      });
    };
    getPlatform();
  }, []);
  return platform;
}
