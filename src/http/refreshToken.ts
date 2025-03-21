import {
  mergeConfig,
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";
import type Http from "./core";
import type { AxiosResult } from "./type";

export type RefreshTokenValidation = (result: AxiosResult) => boolean;

type XOR =
  | { trigger: "response"; validate(response: AxiosResponse): boolean }
  | { trigger?: "error"; validate?(error: AxiosError): boolean };

export type RefreshTokenPluginOption = XOR & {
  refresh(http: AxiosInstance): Promise<boolean>;
};

function $validate(result: AxiosError) {
  return result.status === 401;
  // if (result.status !== 401) return false;
  // return !Reflect.get(result.config!, "__isRefreshing");
}

export default function refreshTokenPlugin(option: RefreshTokenPluginOption) {
  const { trigger = "error", validate = $validate, refresh } = option;
  let promise: Promise<boolean> | null = null;
  let unlock = true;
  return function refreshToken(http: Http) {
    const manager = http.inst.interceptors.response;

    http.inst.interceptors.request.use(async (config) => {
      if (promise && !Reflect.get(config, "__isRefreshing") && unlock) {
        const ok = await promise;
        if (ok) {
          // 更新token
          config.headers.Authorization =
            http.inst.defaults.headers.common.Authorization;
        } else {
          const controller = new AbortController();
          config.signal = controller.signal;
          controller.abort();
        }
      }

      return config;
    });

    manager.use(undefined, async (res: AxiosError) => {
      if (res.status === 401 && !Reflect.get(res.config!, "__isRefreshing")) {
        if (promise) await promise;

        promise = new Promise<boolean>(async (resolve, reject) => {
          const ok = await refresh(http);
          if (ok) {
            unlock = false;
            const resp = await http.inst.request(res.config!);
            resolve(resp);
          } else {
            reject(res);
            console.log("请登录");
          }
        }).finally(() => {
          unlock = true;
          promise = null;
        });

        return promise;
      }
      console.log(4);
      return Promise.reject(res);
    });

    // if (trigger === "error") {
    //   manager.use(undefined, doRefresh);
    // } else {
    //   manager.use(doRefresh);
    // }
  };
}
