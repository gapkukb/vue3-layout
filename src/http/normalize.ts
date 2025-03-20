import type Http from "./core";

export interface NormalizeOption {
  enable?: boolean;
  debug?: boolean;
  validate?: Validation;
}

export type Validation = (value: any) => boolean;

declare module "axios" {
  interface AxiosRequestConfig {
    validate?: Validation;
  }
}

function defaultValidate(value: any) {
  if (value === 0 || value === false) return true;
  if (typeof value === "string") value = value.trim();
  if (!value) return false;
  if (typeof value === "object") {
    if (Object.keys(value).length === 0) return false;
    return true;
  }
  return true;
}

function filter(
  validate: Validation,
  debug: boolean,
  url: string,
  payload?: Record<string | number, any>
) {
  if (!payload) return payload;
  let value: any;

  for (const key of Object.keys(payload)) {
    value = payload[key];

    if (!validate(value)) {
      debug &&
        console.warn(
          `${key}:${value}  will be delete cause by empty value with url:{${url}}`
        );
      delete payload[key];
    }
  }

  return payload;
}

export default function normalizePlugin(option: NormalizeOption) {
  const {
    enable = true,
    debug = false,
    validate = defaultValidate,
  } = option || {};

  return function normalize(http: Http) {
    http.inst.interceptors.request.use(function normalizeRequest(config) {
      if (!enable) return config;

      const $validate = config.validate || validate;
      const $filter = (o: any) => filter($validate, debug, config.url!, o);

      config.data = $filter(config.data);
      config.params = $filter(config.params);

      return config;
    });
  };
}
