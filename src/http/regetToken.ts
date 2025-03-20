import type { AxiosError, AxiosResponse } from "axios";
import type Http from "./core";

export interface RegetTokenPluginOption {
  enable?: boolean;
  validate: RegetTokenValidation;
}

export type RegetTokenValidation = (
  response?: AxiosResponse,
  error?: AxiosError
) => boolean;

// declare module "axios" {
//   interface AxiosRequestConfig {
//     validate?: RegetTokenValidation;
//   }
// }

export default function regetTokenPlugin(option: RegetTokenPluginOption) {
  const { validate } = option;

  return function regetToken(http: Http) {
    http.inst.interceptors.response.use(
      (response) => {
        if (validate(response)) {
        }
        return response;
      },
      (error) => {
        if (validate(undefined, error)) {
        }
        return Promise.reject(error);
      }
    );
  };
}
