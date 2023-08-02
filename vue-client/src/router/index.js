import { createRouter, createWebHashHistory } from "vue-router";
import AuthRoutes from "./auth.js";
import AdminRoutes from "./admin.js";
import UserRoutes from "./user.js";
import { useLoginStore } from "@/stores/modules/login.js";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("../views/Auth/login.vue"),
    },
    ...AuthRoutes,
    ...AdminRoutes,
    ...UserRoutes,
    {
      path: "/:pathMatch(.*)*",
      name: "error.404",
      component: () => import("../views/Error/404.vue"),
    },
  ],
});

// guard
router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore();
  const USER = loginStore.current_user;
  const ROLE = USER ? USER.role : null;
  const IS_LOGGED_IN = USER ? true : false;

  if (to.meta.requiresAuth) {
    if (IS_LOGGED_IN && to.meta.role === USER.role) next();
    else next({ name: "auth.login" });
  } else {
    if (
      IS_LOGGED_IN &&
      (to.name === "auth.login" || to.name === "auth.register")
    ) {
      if (ROLE === "admin") router.push({ name: "admin.home" });
      else if (ROLE === "user") router.push({ name: "user.home" });
    } else next();
  }
});

export default router;
