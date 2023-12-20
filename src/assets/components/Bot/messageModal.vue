<script setup>
import { closeModal } from 'jenesius-vue-modal';

const props = defineProps(['chatMessages'])
</script>

<template>
    <div class="modal-message-container">
        <font-awesome-icon icon="xmark" size="2xl" style="color: var(--color-neutral);" class="icon" @click="closeModal"/>
        <div class="chat">
            <div class="message">{{ props.chatMessages.content }}</div>
            <div class="message bot">{{ props.chatMessages.response }}</div>
        </div>
    </div>
</template>

<style scoped>


.modal-message-container {
    position: absolute;
    height: fit-content;
    max-height: 80vh;
    width: fit-content;
    max-width: 50rem;
    background-color: var(--color-ai-primary);
    z-index: 10000;
    border-radius: 2rem;
    padding: 2rem;
    overflow: hidden;
}

.chat {
    height: 100%;
    overflow-y: auto;
    overflow-x: none;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    padding-right: 1rem;
}

.message {
    padding: 1rem;
    background-color: var(--color-neutral);
    max-width: 80%;
    min-width: 8rem;
    width: fit-content;
    border-radius: .5rem;
    word-wrap: break-word;
}

.bot {
    align-self: flex-end;
}

.icon {
    position: absolute;
    right: 2rem;
    top: 2rem;
    cursor: pointer;
}
</style>