import { Platform } from "@tauri-apps/api/os";
import { useEffect, useState } from "react";

// Unused ATM
// This was originally intended to be used to gate backend-installation to windows, as lord knows I can't write a systemd service to do it on linux
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
