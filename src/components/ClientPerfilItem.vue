<script setup>
const props = defineProps({
  icon: {
    type: String
  }
})
</script>
<template>
  <div class="item">
    <font-awesome-icon :icon="props.icon" />
    <span><slot></slot></span>
  </div>
</template>
<style scoped>
.item {
  display: flex;
  gap: 1rem;
}
</style>
