import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CreateAxiosDefaults,
  type Method,
  mergeConfig,
} from "axios";
import type { Dictionary } from "lodash";

type M = Lowercase<Method>;

export default class Http {
  inst!: AxiosInstance;
  #plugins = new WeakMap<Function, number>();
  constructor(option: CreateAxiosDefaults) {
    this.inst = axios.create(option);
  }

  get(url: string, option?: AxiosRequestConfig) {
    return this.#request("get", "params", url, option);
  }
  post(url: string, option?: AxiosRequestConfig) {
    return this.#request("post", "data", url, option);
  }
  put(url: string, option?: AxiosRequestConfig) {
    return this.#request("put", "data", url, option);
  }
  delete(url: string, option?: AxiosRequestConfig) {
    return this.#request("delete", "params", url, option);
  }

  use(plugin: (ins: Http) => any) {
    // this.#plugins.set(plugin, index);
    return plugin(this);
  }

  // eject(plugin: (ins: AxiosInstance) => any) {
  //   return this.#ins.interceptors.request.eject(plugin);
  // }

  copyWith(option: CreateAxiosDefaults) {
    const ins = new Http(option);
    this.inst.request({
      method: "get",
    });
    return ins;
  }

  #request(
    method: M,
    key: "params" | "data",
    url: string,
    declOption?: AxiosRequestConfig
  ) {
    return (payload?: Dictionary<any>, option: AxiosRequestConfig = {}) => {
      if (declOption) {
        option = mergeConfig(option, declOption);
      }
      if (payload) {
        option[key] = {
          ...option[key],
          ...payload,
        };
      }

      return this.inst.request({
        method,
        url,
        ...option,
      });
    };
  }
}
