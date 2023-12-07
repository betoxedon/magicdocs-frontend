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

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const id = ref(`input_${props.id}`)
</script>
<template>
    <div class="input-group">
        <label :for="id">{{ props.label }}</label>
        <input :type="props.type" :id="id" :placeholder="props.placeholder" v-model="value">
        <font-awesome-icon v-if="props.icon" class="icon" :icon="props.icon" />
    </div>
</template>

<style setup>
    .input-group {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 1rem;
        width: 100%;
    }

    .input-group input {
        box-sizing: border-box;
        padding: .2rem .5rem;
        outline: none;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        border: none;
        min-width: 300px;
        width: 100%;
        height: 2rem;
    }

    .input-group label {
        font-size: .9rem;
        margin-bottom: .5rem;
    }

    .input-group .icon {
        position: absolute;
        right: 10px;
        bottom: 8px;
        color: var(--color-primary);
    }
</style>