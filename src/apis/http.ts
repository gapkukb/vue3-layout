import { Http, refreshToken } from "../http";
import { refresh } from "./user";

const http = new Http({
  baseURL: "/api",
});

http.use(
  refreshToken({
    async refresh(http) {
      const resp = await refresh();
      setAuthorization(resp.data.token);
      return !!resp.data.token;
    },
  })
);

export default http;

export function setAuthorization(value: string) {
  http.inst.defaults.headers.common.Authorization = `Bearer ${value}`;
}
