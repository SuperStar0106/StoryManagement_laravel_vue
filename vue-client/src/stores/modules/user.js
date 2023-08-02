import { defineStore } from "pinia";
import axios from "axios";

export const useUsersStore = defineStore("user", {
  state: () => ({
    users: {},
    user: {
      name: "",
      email: "",
    },
  }),

  actions: {
    getUsers() {
      return new Promise((resolve, reject) => {
        axios
          .get("api/admin/users")
          .then((response) => {
            this.users = response.data;
            resolve(response);
          })
          .catch((user_error) => {
            reject(user_error);
          });
      });
    },

    editUser(userData) {
      return new Promise((resolve, reject) => {
        axios
          .put("api/admin/users/" + userData.id)
          .then((response) => {
            console.log(response.data);
            this.users = response.data;
            resolve(response);
          })
          .catch((user_error) => {
            reject(user_error);
          });
      });
    },
  },

  getters: {},
});
