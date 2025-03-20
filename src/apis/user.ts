import http from "./http";

export const login = http.get("/login");
export const access = http.get("/protected");
export const access2 = http.get("/protected2");
export const refresh = http.get("/refreshToken", {
  __isRefreshing: true,
});
