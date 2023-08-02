/** @format */

const ROLE = "user";

export default [
  {
    path: "/user",
    name: "user.home",
    component: () => import("../views/User/home.vue"),
    meta: { requiresAuth: true, role: ROLE },
  },
  {
    path: "/user/story",
    name: "user.story",
    component: () => import("../views/User/story.vue"),
    meta: { requiresAuth: true, role: ROLE },
  },
];
