import { Body, fetch } from "@tauri-apps/api/http";
export interface Server {
  callPluginMethod<TArgs = {}, TRes = {}>(
    methodName: string,
    args: TArgs
  ): Promise<ServerResponse<TRes>>;
}
export type ServerResponse<TRes> = ServerResponseSuccess<TRes> | ServerResponseError;
interface ServerResponseSuccess<TRes> {
  success: true;
  result: TRes;
}
interface ServerResponseError {
  success: false;
  result: string;
}
export const server: Server = {
  async callPluginMethod(methodName: string, args: any) {
    return fetch("http://127.0.0.1:35821/req", {
      method: "POST",
      body: Body.json({
        method: methodName,
        args: args,
      }),
    })
      .then((res) => {
        console.log(res);
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
