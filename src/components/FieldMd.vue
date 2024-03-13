<script setup>
import { ref } from 'vue'
import makeid from '../utils/id'
const emits = defineEmits(['click'])
const props = defineProps(['bottomslots'])
const id = ref(makeid(8))
</script>

<template>
  <div class="field" :id="id" @click="emits('click')">
    <slot></slot>
    <div v-if="props.bottomslots" class="bottomslots">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<style scoped>
.field {
  height: 2rem;
  min-width: 180px;
  width: 100%;
  border: 2px solid;
  border-radius: 4px;
  background-color: white;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  position: relative;
}
.bottomslots {
  width: 100;
  text-align: end;
  margin: 4px 8px 0 8px;
  font-size: 12px;
  font-weight: 300;
  color: var(--color-error);
  position: absolute;
  bottom: -1.1rem;
  right: 0px;
}
</style>
