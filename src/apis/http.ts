import { Http, refreshToken } from "../http";
import { refresh } from "./user";

const http = new Http({ baseURL: "/_front_api_" });

http.use(
  errorPlugin({
    handlers: errors,
    handle: console.log,
  })
);

http.use(
  loadingPlugin({
    enable: true,
    onTrigger(loading) {
      console.log("loading", loading);
    },
  })
);
http.use(
  normalizePlugin({
    enable: true,
    debug: true,
  })
);

export const http2 = http.copyWith({
  baseURL: "/_thirdpart_api_",
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
