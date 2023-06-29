import { getStandaloneVersion } from "../";
import { fetchNewestBackend } from "./fetchNewestBackend";
import semver from "semver";
export async function checkForNewBackend(): Promise<boolean | string> {
  const current = await getStandaloneVersion();
  const remote = await fetchNewestBackend();
  const remoteVersion = remote?.tag_name;
  console.log(current, remote?.tag_name);
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
