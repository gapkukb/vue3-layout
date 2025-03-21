import {
  Http,
  errorPlugin,
  loadingPlugin,
  normalizePlugin,
  refreshToken,
} from "../http";
import errors from "./errors";
import { refresh } from "./user";

// const http = new Http({ baseURL: "/_front_api_" });
const http = new Http({ baseURL: "/api" });

// http.use(
//   errorPlugin({
//     handlers: errors,
//     handle: console.log,
//   })
// );

// http.use(
//   loadingPlugin({
//     enable: true,
//     onTrigger(loading) {
//       console.log("loading", loading);
//     },
//   })
// );
// http.use(
//   normalizePlugin({
//     enable: true,
//     debug: true,
//   })
// );

http.use(
  refreshToken({
    async refresh(config) {
      const resp = await refresh();
      return config;
    },
  })
);

export const http2 = http.copyWith({
  baseURL: "/_thirdpart_api_",
});

export default http;

export function setAuthorization(value: string) {
  http.inst.defaults.headers.common.Authorization = `Bearer ${value}`;
}
