import { type InternalAxiosRequestConfig, getAdapter } from "axios";
import type Http from "./core";

export interface LoadingOption {
  enable?: boolean;
  default?: boolean;
  onTrigger?: (loading: boolean) => void;
}

declare module "axios" {
  interface AxiosRequestConfig {
    loading?: boolean;
  }
}

export default function loadingPlugin(option?: LoadingOption) {
  const { enable = true, default: _default = true, onTrigger } = option || {};

  let n = 0;

  return function loading(http: Http) {
    if (!enable || !onTrigger) return;

    const adapter = getAdapter(http.inst.defaults.adapter);

    http.inst.defaults.adapter = function (config: InternalAxiosRequestConfig) {
      const _loading = config.loading ?? _default;

      if (_loading && n++ === 0) {
        onTrigger(true);
      }

      function close() {
        if (_loading && --n === 0) {
          onTrigger!(false);
        }
      }

      return adapter(config).finally(close);
    };
  };
}
