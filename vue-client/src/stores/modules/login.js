import { defineStore } from "pinia";
import env from "@/config/env.js";
import axios from "axios";

export const useLoginStore = defineStore("login", {
  state: () => ({
    token_response: {},
    current_user: null,
    is_loading: false,
  }),

  actions: {
    login(user) {
      return new Promise((resolve, reject) => {
        let data = {
          client_id: env.CLIENT_ID,
          grant_type: env.GRANT_TYPE,
          client_secret: env.CLIENT_SECRET,
          username: user.email,
          password: user.password,
        };

        axios
          .post("oauth/token", data)
          .then((response) => {
            this.token_response = response.data.access_token;
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.access_token}`;
            resolve(response);
          })
          .catch((login_error) => {
            reject(login_error);
          });
      });
    },

    getUser() {
      return new Promise((resolve, reject) => {
        axios
          .get("api/user")
          .then((response) => {
            this.current_user = response.data;
            // context.commit("updateCurrentUser", response.data);
            resolve(response);
          })
          .catch((user_error) => {
            reject(user_error);
          });
      });
    },

    logout() {
      return new Promise((resolve) => {
        this.current_user = null;
        this.token_response = {};
        // context.commit("logout");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      }).catch((login_error) => {
        console.log(login_error);
      });
    },
  },

  getters: {
    getAccessToken(state) {
      return state.token_response.access_token;
    },
    getCurrentUser(state) {
      return state.current_user;
    },
    getTest() {
      return "test";
    },
  },
});
