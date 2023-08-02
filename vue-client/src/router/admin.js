/** @format */

const ROLE = "admin";

export default [
  {
    path: "/admin",
    name: "admin.home",
    component: () => import("../views/Admin/home.vue"),
    meta: { requiresAuth: true, role: ROLE },
  },
  {
    path: "/admin/user",
    name: "admin.user",
    component: () => import("../views/Admin/user.vue"),
    meta: { requiresAuth: true, role: ROLE },
  },
  {
    path: "/admin/story",
    name: "admin.story",
    component: () => import("../views/Admin/story.vue"),
    meta: { requiresAuth: true, role: ROLE },
  },
];
