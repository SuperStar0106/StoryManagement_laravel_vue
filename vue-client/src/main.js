import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import env from "@/config/env.js";
import { useLoginStore } from "@/stores/modules/login.js";
import { useStyleStore } from "@/stores/style.js";
import { darkModeKey, styleKey } from "@/config.js";

import "./css/main.css";

/* Init Pinia */
const pinia = createPinia();

/* Create Vue app */
createApp(App).use(router).use(pinia).mount("#app");

// baseURL(server) for axios
axios.defaults.baseURL = env.BASE_API_URL;

// allowing axios, auth api and store to be used in the global scope
window.axios = axios;
window.LoginStore = useLoginStore;

if (useLoginStore.getAccessToken)
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${useLoginStore.getAccessToken}`;

/* Init Pinia stores */
const styleStore = useStyleStore(pinia);

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(true);
}

/* Default title tag */
const defaultDocumentTitle = "Story Management System";

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});
