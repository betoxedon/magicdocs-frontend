<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
    type: {
        default: 'text',
        type: String
    },
    placeholder: {
        default: 'placeholder',
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
        type: String
    },
    modelValue: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue', 'check'])

const showPassword = ref(false)
const type = ref(props.type)
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
    emit('check', value)
  }
})

const id = ref(`input_${props.id}`)

function handleShowPassword(){
    showPassword.value = !showPassword.value
    if (type.value === 'password') {
        type.value = 'text'
    } else {
        type.value = 'password'
    }
}
</script>

<template>
    <div class="input-group">
        <label :for="id">{{ props.label }}</label>
        <textarea :id="id" :placeholder="props.placeholder" v-model="value"></textarea>
        <font-awesome-icon v-if="props.icon" class="icon" :icon="props.icon" />
        <font-awesome-icon v-if="props.type === 'password' && !showPassword" class="icon-eye" icon="eye" @click="handleShowPassword" />
        <font-awesome-icon v-if="props.type === 'password' && showPassword" class="icon-eye" icon="eye-slash" @click="handleShowPassword"/>
        <slot name="bottom-slots"></slot>
    </div>
</template>

<style scoped>
    .input-group {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 1rem;
        width: 100%;
        min-width: 15rem;
        height: fit-content;
    }

    .input-group textarea {
        box-sizing: border-box;
        padding: 1rem 1rem;
        outline: none;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        border: none;
        width: 100%;
        height: 12rem;
        background-color: var(--color-neutral);
        resize: none;
    }

    .input-group label {
        font-size: 1.5rem;
        margin-bottom: .5rem;
    }

    .icon, .icon-eye {
        position: absolute;
        height: 20px;
        width: 20px;
        right: 10px;
        top: 3.75rem;
        color: var(--color-primary);
    }

    .icon-eye {
        right: 4rem;
        top: 3.75rem;
        color: var(--color-primary);
    }
</style>