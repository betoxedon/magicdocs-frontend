<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useClientStore } from '../stores/clients';

const {clients} = storeToRefs(useClientStore())

const props = defineProps({
  file: {
    type: Object
  },
  client: {
    type: Boolean
  }
})

const router = useRouter()
function handleRouting() {
  router.push({ name: 'DocumentView', query: { id: props.file.id } })
}

function getClientName(id){
  return clients.value.filter(item=> item.id === id).map(item=> item.name)[0]
}

</script>
<template>
  <div class="card-container" @click.capture="handleRouting" v-if="file.type != 'image/jpeg'">
    <div class="card-title">
      <font-awesome-icon icon="file-word" size="xl" v-if="props.file.type == 'doc'" />
      <font-awesome-icon icon="image" size="xl" v-else-if="props.file.type == 'image/jpeg'" />
      <font-awesome-icon icon="file-pdf" size="xl" v-else />
      <span>{{ props.file.name }}</span> <div class="card-client-name" v-if="client">{{ getClientName(props.file.client)}}</div>
    </div>
    
    <div class="card-description">{{ props.file.description }}</div>
    <div class="card-footer">
      <span v-for="(keyword, index) in props.file.key_words.split(',')" :key="index">{{ keyword }}</span>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  width: 100%;
  min-height: 150px;
  height: fit-content;
  background-color: var(--color-primary-background);
  border-radius: 5px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-description {
  font-size: 14px;
  font-weight: 300;
  margin-top: 0.5rem;
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 56px;
}

.card-footer {
  font-size: 14px;
  font-weight: 300;
  margin-top: 8px;
  overflow-y: hidden;
  display: flex;
  gap: 1rem;
}

.card-footer span {
  padding: 5px 10px;
  height: fit-content;
  color: var(--color-white-fonts);
  background-color: var(--color-label-primary);
  border-radius: 10px;
}

.card-client-name {
  padding: .5rem;
  border-radius: 4px;
  background-color: var(--color-success);
  color: var(--color-white);
  width: fit-content  ;
}
</style>
