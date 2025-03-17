import { Http, refreshToken } from "../http";

const http = new Http({
  baseURL: "/api",
});

// http.use(
//   refreshToken({
//     async refresh(config) {
//       return config;
//     },
//   })
// );

export default http;

export function setAuthorization(value: string) {
  http.inst.defaults.headers.common.Authorization = `Bearer ${value}`;
}
