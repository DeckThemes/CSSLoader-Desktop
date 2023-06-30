import { Command } from "@tauri-apps/api/shell";

export function wrappedInvoke(commandName: string, commandArgs: string[]) {
  return new Promise<any>((resolve, reject) => {
    const command = new Command(commandName, commandArgs);
    command.on("close", (args: any) => resolve(args));
    command.on("error", (args: any) => reject(args));
    command.spawn();
  });
}
