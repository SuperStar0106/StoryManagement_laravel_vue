<script setup>
import {
  mdiPlusThick,
  mdiListStatus,
  mdiSubtitlesOutline,
  mdiContentPaste,
} from "@mdi/js";
import { useSlots, computed, ref } from "vue";
import BaseIcon from "@/components/BaseIcon.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardStoryEditModal from "@/components/CardStoryEditModal.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import CardBox from "@/components/CardBox.vue";
import IconRounded from "@/components/IconRounded.vue";
import { useStoriesStore } from "@/stores/modules/story.js";

const usersStore = useStoriesStore();
const newStory = usersStore.story;

defineProps({
  icon: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  main: Boolean,
  action: {
    type: String,
    default: "Add",
  },
  actionTitle: {
    type: String,
    default: "Add",
  },
});

const isModalAddActive = ref(false);
const statusArray = ref(["Draft", "Published"]);

const openAddStoryModal = () => {
  isModalAddActive.value = true;
};

const hasSlot = computed(() => useSlots().default);
</script>

<template>
  <CardStoryEditModal
    v-model="isModalAddActive"
    :title="actionTitle"
    :buttonLabel="action"
  >
    <CardBox is-form @submit.prevent="submitProfile">
      <FormField label="Title" help="Required. Story title">
        <FormControl
          v-model="newStory.title"
          :icon="mdiSubtitlesOutline"
          name="title"
          required
          autocomplete="title"
        />
      </FormField>
      <FormField label="Content" help="Required. Story content">
        <FormControl
          v-model="newStory.content"
          :icon="mdiContentPaste"
          type="content"
          name="content"
          required
          autocomplete="content"
        />
      </FormField>
      <FormField label="Status" help="Required. Story status">
        <FormControl
          v-model="newStory.status"
          :icon="mdiListStatus"
          type="status"
          name="status"
          required
          autocomplete="status"
          :options="statusArray"
        />
      </FormField>
    </CardBox>
  </CardStoryEditModal>
  <section
    :class="{ 'pt-6': !main }"
    class="mb-6 flex items-center justify-between"
  >
    <div class="flex items-center justify-start">
      <IconRounded
        v-if="icon && main"
        :icon="icon"
        color="light"
        class="mr-3"
        bg
      />
      <BaseIcon v-else-if="icon" :path="icon" class="mr-2" size="20" />
      <h1 :class="main ? 'text-3xl' : 'text-2xl'" class="leading-tight">
        {{ title }}
      </h1>
    </div>
    <slot v-if="hasSlot" />
    <BaseButton
      v-else
      :icon="mdiPlusThick"
      color="whiteDark"
      @click="openAddStoryModal()"
    />
  </section>
</template>
