<script setup>
const props = defineProps(['label', 'icon', 'id'])
const emit = defineEmits(['click'])
</script>

<template>
    <div class="menu-item" >
        <label :for="props.id">{{props.label}}</label>
        <font-awesome-icon :id="props.id" :icon="props.icon" size="xl" @click="emit('click')"/>
    </div>
</template>

<style scoped>
.menu-item {
  border-radius: .5rem;
  padding: 1rem;
  transition: all .2s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.menu-item:hover {
  background-color: var(--color-background);

}
</style>