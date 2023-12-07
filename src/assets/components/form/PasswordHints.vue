<script setup>
const props = defineProps({
    message: {
        type: String,
        default: 'Message'
    },
    valid: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <span :class=" props.valid ? 'valid' : 'error' ">
        <font-awesome-icon icon="circle-exclamation" v-if="!props.valid"/>
        <font-awesome-icon icon="circle-check"  v-else/>
        {{ props.message }}
    </span>
</template>

<style scoped>
    span {
        font-weight: 300;
        font-size: .8rem;
    }
    .error {
        color: red;
    }

    .valid {
        color: green;
    }
</style>