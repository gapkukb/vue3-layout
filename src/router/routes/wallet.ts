import { RouteNames } from "@/consts";
import type { RouteRecordRaw, RouteRecordSingleView } from "vue-router";

export const wallet: RouteRecordSingleView = {
  name: RouteNames.WALLET,
  path: "/wallet",
  component: () => import("@/views/user/index.vue"),
};

export default <RouteRecordRaw[]>[
  wallet,
  // other routes...
];
