/** @format */

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLoginStore } from "@/stores/modules/login.js";

export default function () {
  const router = useRouter();
  const loginStore = useLoginStore();

  const is_loading = ref(false);
  const errors = ref(null);

  function routerPush(role) {
    if (role === "admin") router.push({ name: "admin.home" });
    else if (role === "user") router.push({ name: "user.home" });
  }

  function errorAndLoader(response) {
    errors.value = response.response.data;
    is_loading.value = false;
  }

  function login(user) {
    delete axios.defaults.headers.common["Authorization"];
    is_loading.value = true;

    loginStore
      .login(user)
      .then(() => {
        loginStore
          .getUser()
          .then((current_user_response) => {
            routerPush(current_user_response.data.role);
          })
          .catch((get_current_user_error) => {
            errorAndLoader(get_current_user_error);
          });
        errors.value = null;
      })
      .catch((login_error) => {
        errorAndLoader(login_error);
      });
  }

  return {
    login,
    is_loading,
    errors,
  };
}
