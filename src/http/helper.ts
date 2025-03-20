import type { InternalAxiosRequestConfig } from "axios";
import type { Functionable } from "./types";

export function tryExcute<T>(
  value: Functionable<T>,
  config?: InternalAxiosRequestConfig
): T {
  if (typeof value === "function") {
    return (value as (config?: InternalAxiosRequestConfig) => T)(config);
  }
  return value;
}
