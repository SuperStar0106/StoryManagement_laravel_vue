import { defineStore } from "pinia";
import axios from "axios";
import { useLoginStore } from "./login.js";

export const useStoriesStore = defineStore("story", {
  state: () => ({
    stories: {},
    story: {
      title: "",
      content: "",
      status: "",
    },
  }),

  actions: {
    getStories() {
      return new Promise((resolve, reject) => {
        axios
          .get("api/" + useLoginStore().current_user.role + "/stories")
          .then((response) => {
            this.stories = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addNewStory() {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "api/" + useLoginStore().current_user.role + "/stories",
            this.story
          )
          .then((response) => {
            if (response.data.status === "success") {
              this.story["created_at"] = new Date();
              this.story["updated_at"] = new Date();
              this.story["email"] = useLoginStore().current_user.email;
              this.story["user_id"] = useLoginStore().current_user.id;
              this.stories.push(this.story);
            }
            console.log(response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    editStory(storyId) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            "api/" + useLoginStore().current_user.role + "/stories/" + storyId,
            this.story
          )
          .then((response) => {
            if (response.data.status === "success") {
              const index = this.stories.indexOf(
                this.stories.find((x) => x.id === storyId)
              );
              this.stories[index].title = this.story.title;
              this.stories[index].content = this.story.content;
              this.stories[index].status = this.story.status;
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteStory(storyId) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            "api/" + useLoginStore().current_user.role + "/stories/" + storyId
          )
          .then((response) => {
            if (response.data.status === "success") {
              const index = this.stories.indexOf(
                this.stories.find((x) => x.id === storyId)
              );
              this.stories.splice(index, 1);
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },

  getters: {},
});
