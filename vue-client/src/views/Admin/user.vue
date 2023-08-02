<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { mdiMonitorCellphone, mdiTableBorder } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import TableUsersComponent from "@/components/TableUsersComponent.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/Admin/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Users" main>
      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Users table.</b>
      </NotificationBar>

      <CardBox class="mb-6" has-table>
        <TableUsersComponent checkable />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
