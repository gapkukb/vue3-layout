import http, { http2 } from "./http";

export const queryUser = http.get("/user");
export const queryUser2 = http2.get("/user");

export const login = http.get("/login");
export const access = http.get("/protected");
export const refresh = http.get("/refreshToken");
