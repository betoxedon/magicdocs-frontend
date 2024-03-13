<script setup>
import { ref, computed, onMounted } from 'vue'

const emits = defineEmits(['update:modelValue', 'blur'])
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  placeholder: {
    type: String,
    default: 'Placeholder'
  },
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  options: {
    type: Array
  }
})

const selected = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emits('update:modelValue', newValue)
  }
})
</script>

<template>
  <div class="formgroup">
    <label :for="`${label}_input`">{{ label }}</label>
    <select :name="label" :id="`${label}_select`" v-model="selected">
      <option value="" selected disabled>{{ placeholder }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style></style>
