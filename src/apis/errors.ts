import type { Functionable } from "@/http";

export default <Record<string | number, Functionable<string>>>{
  401() {
    alert("请登录");
    return "请登录";
  },
  500: "服务器错误",
  200(config) {
    console.log(config);

    return "请登录";
  },
};
