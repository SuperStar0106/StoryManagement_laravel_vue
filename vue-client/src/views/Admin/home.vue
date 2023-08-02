<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { computed, ref, onMounted, onBeforeMount } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountMultiple,
  mdiBookOpenOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import TableUsersComponent from "@/components/TableUsersComponent.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxClient from "@/components/CardBoxClient.vue";
import LayoutAuthenticated from "@/layouts/Admin/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useUsersStore } from "@/stores/modules/user.js";
import { useStoriesStore } from "@/stores/modules/story.js";

const chartData = ref(null);
const usersStore = useUsersStore();
const storiesStore = useStoriesStore();
const users = usersStore.users;
const stories = storiesStore.stories;

const getUsers = () => {
  usersStore.getUsers();
};

const getStories = () => {
  storiesStore.getStories();
};

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

onBeforeMount(() => {
  getUsers();
  getStories();
});

onMounted(() => {
  fillChartData();
});

const mainStore = useMainStore();

const clientBarItems = computed(() => mainStore.clients.slice(0, 4));

const transactionBarItems = computed(() => mainStore.history);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Overview"
        main
      >
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <CardBoxWidget
          trend="12%"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="users.length"
          label="Users"
        />
        <CardBoxWidget
          trend="12%"
          trend-type="down"
          color="text-blue-500"
          :icon="mdiBookOpenOutline"
          :number="stories.length"
          label="Stories"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxTransaction
            v-for="(transaction, index) in transactionBarItems"
            :key="index"
            :amount="transaction.amount"
            :date="transaction.date"
            :business="transaction.business"
            :type="transaction.type"
            :name="transaction.name"
            :account="transaction.account"
          />
        </div>
        <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems"
            :key="client.id"
            :name="client.name"
            :login="client.login"
            :date="client.created"
            :progress="client.progress"
          />
        </div>
      </div>

      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Users" />

      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Users table.</b>
      </NotificationBar>

      <CardBox has-table>
        <TableUsersComponent />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
