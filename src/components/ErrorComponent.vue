<script setup>
const props = defineProps(['error'])
</script>

<template>
  <span v-if="props.error">
    {{ props.error }}
    <font-awesome-icon icon="circle-exclamation" style="color: var(--color-error)" />
  </span>
</template>

<style></style>
