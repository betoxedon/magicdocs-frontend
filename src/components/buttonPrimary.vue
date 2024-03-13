<script setup>
import { ref } from 'vue'
const props = defineProps({
  type: {
    default: 'button',
    type: String
  },
  id: {
    default: 'id',
    type: String
  },
  label: {
    type: String,
    default: 'Label'
  },
  icon: {
    type: String,
    default: ''
  },
  width: {
    default: 'fit-content'
  },
  height: {
    default: 'fit-content'
  },
  outlined: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['click'])
const style = ref(`width: ${props.width}; height: ${props.height};`)
</script>

<template>
  <button @click="emit('click')" :type="props.type" :style="style" :class="{ outlined: outlined }">
    {{ props.label }}
    <font-awesome-icon v-if="props.icon" :icon="props.icon" />
  </button>
</template>

<style scoped>
button {
  border: solid 2px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  color: var(--color-neutral);
  background-color: var(--color-primary);
  padding: 8px 16px;
  cursor: pointer;
  width: fit-content;
  font-family: 'Rubik';
  margin: auto;
}

.outlined {
  border: 2px solid var(--color-primary);
  background-color: var(--color-neutral);
  color: var(--color-primary);
}
</style>
