import { toast as reactToast } from "react-toastify";
export function toast(title: string, message?: string) {
  reactToast(`${title}${message ? ` - ${message}` : ""}`);
}
