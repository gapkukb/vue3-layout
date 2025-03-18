import type { InternalAxiosRequestConfig } from "axios";

export type Functionable<T> = T | ((config: InternalAxiosRequestConfig) => T);
