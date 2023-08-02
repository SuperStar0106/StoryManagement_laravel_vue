export default [
  {
    path: "/login",
    name: "auth.login",
    component: () => import("../views/Auth/login.vue"),
  },
];
