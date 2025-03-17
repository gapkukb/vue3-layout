import http from "./http";

export const login = http.get("/login");
export const access = http.get("/protected");
export const refresh = http.get("/refreshToken");
