import { Http, errorPlugin, loadingPlugin, normalizePlugin } from "../http";
import errors from "./errors";

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

http2.eject();

export default http;
