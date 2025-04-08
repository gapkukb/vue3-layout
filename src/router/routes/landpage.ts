import { RouteNames } from "@/consts";
import type { RouteRecordRaw, RouteRecordSingleView } from "vue-router";

export const home: RouteRecordSingleView = {
  name: RouteNames.HOME,
  path: "",
  component: () => import("@/views/home/index.vue"),
};

export default <RouteRecordRaw[]>[
  {
    name: RouteNames.ACTIVITY_NBA,
    path: "/activity",
    component: () => import("@/views/activity/nba/index.vue"),
  },
];
