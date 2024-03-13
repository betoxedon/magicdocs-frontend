<script setup>
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
  mask: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  nolabel: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="formgroup">
    <label :for="`${label}_input`" v-if="!nolabel">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :id="`${label}_input`"
      :value="modelValue"
      @blur="emits('blur')"
      @input="emits('update:modelValue', $event.target.value)"
      v-if="!props.mask"
    />
    <input
      :type="type"
      :placeholder="placeholder"
      :id="`${label}_input`"
      :value="modelValue"
      @blur="emits('blur')"
      @input="emits('update:modelValue', $event.target.value)"
      v-mask="props.mask"
      v-else
    />
    <font-awesome-icon :icon="icon" class="icon" v-if="icon" />
    <div class="error">
      <span v-if="error">{{ error }}</span>
      <font-awesome-icon icon="circle-exclamation" v-if="error" />
    </div>
  </div>
</template>

<style scoped>
.icon {
  position: absolute;
  top: calc((33.6px - 16px) / 2);
  right: 10px;
}
</style>
