<script setup>
import { computed, onMounted, ref } from 'vue'
import makeid from '../utils/id'
import FieldMd from './FieldMd.vue'

const id = ref(makeid(8))
const input = ref(null)
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: 'Placeholder'
  },
  modelValue: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  bottomslots: {
    type: Boolean,
    default: false
  },
  mask: {
    type: String,
    default: ''
  },
  accept: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue', 'blur', 'action', 'change'])
const showPassword = ref(false)
function handleClick() {
  input.value.focus()
}
function handlePasswordVisibility() {
  showPassword.value = !showPassword.value
  handleClick()
}
const inputType = computed(() => {
  if (props.type === 'password' && !showPassword.value) {
    return 'password'
  } else {
    return 'text'
  }
})

function handleInput(event) {
  console.log(event.target.value)
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <FieldMd @click="handleClick" :bottomslots="bottomslots">
    <input
      ref="input"
      :id="id"
      :type="props.type === 'password' ? inputType : props.type"
      :value="modelValue"
      @input="handleInput($event)"
      @blur="emit('blur')"
      :placeholder="props.placeholder"
      @change="emit('change')"
      :accept="props.accept"
    />
    <font-awesome-icon
      v-if="props.type === 'password'"
      icon="eye"
      class="icon"
      @click="handlePasswordVisibility"
      style="cursor: pointer"
    />
    <font-awesome-icon v-if="props.icon" :icon="props.icon" class="icon" @click="handleClick" />
    <template v-slot:bottom>
      <slot name="bottom"></slot>
    </template>
  </FieldMd>
</template>

<style scoped>
input {
  outline: none;
  width: 100%;
  padding: 5px 10px;
  border: none;
}

.icon {
  margin: 0 0.5rem;
}
</style>
