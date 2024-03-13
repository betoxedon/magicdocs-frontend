<script setup>
const props = defineProps({
  message: {
    type: Object
  }
})

const emits = defineEmits(['import'])
function handleCopy() {
  navigator.clipboard.writeText(props.message.message)
}
</script>

<template>
  <div class="message" :class="{ user: message.origin === 'user', agent: message.origin === 'agent' }">
    <div v-if="message.origin === 'user'">{{ message.message }}</div>
    <div v-else class="bot-message">
      {{ message.message }}
      <div class="bot-message-nav">
        <font-awesome-icon icon="file-import" class="nav-icons" size="lg" @click="emits('import', message.message)" />
        <font-awesome-icon icon="copy" class="nav-icons" size="lg" @click="handleCopy" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.message {
  font-size: 15px;
  font-weight: 400;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
}

.user,
.agent {
  background-color: var(--color-secondary-background);
  border-radius: 4px;
  width: fit-content;
  max-width: 80%;
  padding: 0.5rem 1rem;
}

.user {
  align-self: flex-start;
}

.agent {
  align-self: flex-end;
}

.bot-message {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bot-message-nav {
  display: flex;
  gap: 1rem;
  cursor: pointer;
  color: var(--color-label-primary);
  justify-content: flex-end;
}
</style>
