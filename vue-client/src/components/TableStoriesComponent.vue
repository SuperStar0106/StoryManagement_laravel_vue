<script setup>
import { computed, ref } from "vue";
import { mdiPencil, mdiTrashCan } from "@mdi/js";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import CardStoryEditModal from "@/components/CardStoryEditModal.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import CardBox from "@/components/CardBox.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useStoriesStore } from "@/stores/modules/story.js";
import { useLoginStore } from "@/stores/modules/login";

defineProps({
  checkable: Boolean,
});

const loginStore = useLoginStore();
const currentUser = loginStore.current_user;

const storiesStore = useStoriesStore();
const stories = storiesStore.stories;
let editstory = storiesStore.story;

const items = computed(() => storiesStore.stories);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const editStoryId = ref();

const openEditModal = (id) => {
  editstory.title = stories.filter((x) => x.id === id)[0].title;
  editstory.content = stories.filter((x) => x.id === id)[0].content;
  editstory.status = stories.filter((x) => x.id === id)[0].status;
  editStoryId.value = id;

  isModalActive.value = true;
};

const deleteStoryId = ref();
const openDeleteModal = (id) => {
  deleteStoryId.value = id;
  isModalDangerActive.value = true;
};

const checked = (isChecked, story) => {
  if (isChecked) {
    checkedRows.value.push(story);
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === story.id);
  }
};

const isButtonDisabled = (story) => {
  if (currentUser.role === "admin") return false;
  return !(currentUser.role === "user" && currentUser.id === story.user_id);
};
</script>

<template>
  <CardStoryEditModal
    :id="editStoryId"
    v-model="isModalActive"
    title="Edit Story"
    button-label="Edit"
  >
    <CardBox is-form @submit.prevent="submitProfile">
      <FormField label="Title" help="Required. Story title">
        <FormControl
          v-model="editstory.title"
          :icon="mdiSubtitlesOutline"
          name="title"
          required
          autocomplete="title"
        />
      </FormField>
      <FormField label="Content" help="Required. Story content">
        <FormControl
          v-model="editstory.content"
          :icon="mdiContentPaste"
          type="content"
          name="content"
          required
          autocomplete="content"
        />
      </FormField>
      <FormField label="Status" help="Required. Story status">
        <FormControl
          v-model="editstory.status"
          :icon="mdiListStatus"
          type="status"
          name="status"
          required
          autocomplete="status"
        />
      </FormField>
    </CardBox>
  </CardStoryEditModal>

  <CardStoryEditModal
    :id="deleteStoryId"
    v-model="isModalDangerActive"
    title="Warning"
    button-label="Delete"
    button="danger"
    has-cancel
  >
    <p>Would you delete this story really?</p>
  </CardStoryEditModal>

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>Title</th>
        <th>Author</th>
        <th>Content</th>
        <th>Status</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="story in itemsPaginated" :key="story.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, story)" />
        <td data-label="Title">
          {{ story.title }}
        </td>
        <td data-label="Author">
          {{ story.email }}
        </td>
        <td data-label="Content">
          {{ story.content }}
        </td>
        <td data-label="Status">
          {{ story.status }}
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiPencil"
              small
              :disabled="isButtonDisabled(story)"
              @click="openEditModal(story.id)"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              :disabled="isButtonDisabled(story)"
              @click="openDeleteModal(story.id)"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
