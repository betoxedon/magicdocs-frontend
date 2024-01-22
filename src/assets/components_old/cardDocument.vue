<script setup>
import titlecomponent from './TitleComponent.vue';
import buttonPrimary from './form/buttonPrimary.vue'
const props = defineProps(['object'])
import { useDocumentStore } from '../../stores/documents';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter()

const { deletePad } = useDocumentStore()

function handleDetail(id){
    router.push({name: 'PadDetail', query: {pad_id: id}})
}
</script>

<template>
    <div class="card">
        <titlecomponent :title="`Título: ${props.object.name}`"></titlecomponent>
        <div>Cliente:{{ props.object.description }}</div>
        <div>Ação:{{ props.object.description }}</div>
        <div>Descrição:{{ props.object.description }}</div>
        <div style="display: flex; width: 100%; justify-self: flex-end;">
            <buttonPrimary width="100%" label="Abrir" @click=handleDetail(props.object.pad_id)></buttonPrimary>
            <buttonPrimary width="100%" label="Apagar" @click="deletePad(props.object.pad_id)"></buttonPrimary>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    flex-basis: 25rem;
    flex-grow: 1;
    width: calc(30%);
    height: 20rem;
    background-color: var(--color-neutral);
    padding: 2rem;
    color: black;
    justify-content: space-between;
    align-items: flex-start;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>