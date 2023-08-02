<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { mdiMonitorCellphone, mdiTableBorder } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import TableStoriesComponent from "@/components/TableStoriesComponent.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/User/LayoutAuthenticated.vue";
import SectionTitleStoryWithButton from "@/components/SectionTitleStoryWithButton.vue";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleStoryWithButton
        :icon="mdiTableBorder"
        title="Stories"
        main
        action="Add"
        action-title="Add New Story"
      >
      </SectionTitleStoryWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Story table.</b>
      </NotificationBar>

      <CardBox class="mb-6" has-table>
        <TableStoriesComponent checkable />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
