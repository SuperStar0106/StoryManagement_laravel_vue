<template>
  <div
    v-if="errors"
    class="mt-4 px-3 py-2 w-full rounded text-sm text-red-400 animate-pulse"
  >
    <p class="font-semibold tracking-wide">
      <strong>Error:</strong> {{ errors.message }}
    </p>
    <ul class="mt-1 ml-2 list-disc list-inside">
      <li v-for="allErrors in errors.errors" :key="allErrors">
        <span v-for="errorKeys in allErrors" :key="errorKeys">
          <span v-for="errorMessage in errorKeys" :key="errorMessage">
            {{ errorMessage }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["errors"],
};
</script>
