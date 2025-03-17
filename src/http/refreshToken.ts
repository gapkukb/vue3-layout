import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import type Http from "./core";
import axios from "axios";
import type { AxiosResult } from "./type";

export type RefreshTokenValidation = (result: AxiosResult) => boolean;

type XOR =
  | { trigger: "response"; validate(response: AxiosResponse): boolean }
  | { trigger?: "error"; validate?(error: AxiosError): boolean };

export type RefreshTokenPluginOption = XOR & {
  refresh(
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig | void>;
};

function $validate(result: AxiosError) {
  if (result.status !== 401) return false;
  return Reflect.get(result.config!, "__isRefreshing") === true;
}

export default function refreshTokenPlugin(option: RefreshTokenPluginOption) {
  const { trigger = "error", validate = $validate, refresh } = option;

  async function doRefresh(result: AxiosResult) {
    //@ts-ignore
    if (validate(result)) {
      const config = await refresh(result.config!);
      if (config) {
        await result.request(config);
      } else {
      }
    }

    return axios.isAxiosError(result) ? Promise.reject(result) : result;
  }

  return function refreshToken(http: Http) {
    const manager = http.inst.interceptors.response;
    if (trigger === "error") {
      manager.use(undefined, doRefresh);
    } else {
      manager.use(doRefresh);
    }
  };
}
