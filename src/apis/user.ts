import http, { http2 } from "./http";

export const queryUser = http.get("/user");
export const queryUser2 = http2.get("/user");
