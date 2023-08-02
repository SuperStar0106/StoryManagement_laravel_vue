<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from "vue";
import useLogin from "@/services/useLogin.js";
import BackendErrorShow from "@/views/Error/BackendErrorShow.vue";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";

const user = ref({
  email: "admin@example.com",
  password: "secret",
  remember: true,
});
const { login, errors } = useLogin();
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="login(user)">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="user.email"
            :icon="mdiAccount"
            name="email"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="user.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <FormCheckRadio
          v-model="user.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        />

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
          </BaseButtons>
        </template>
      </CardBox>
      <BackendErrorShow :errors="errors"></BackendErrorShow>
    </SectionFullScreen>
  </LayoutGuest>
</template>
