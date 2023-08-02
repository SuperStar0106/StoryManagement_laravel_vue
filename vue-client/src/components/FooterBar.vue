<script setup>
import { containerMaxW } from "@/config.js";
import BaseLevel from "@/components/BaseLevel.vue";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="py-2 px-6" :class="containerMaxW">
    <BaseLevel>
      <div class="text-center md:text-left">
        <b>Yuka Mokata&copy;{{ year }} <a href="#" target="_blank"></a></b>
        <slot />
      </div>
    </BaseLevel>
  </footer>
</template>
