<script setup>
import TitleComponent from './TitleComponent.vue';
import inputMd from './form/inputMd.vue';
import buttonPrimary from './form/buttonPrimary.vue';
import TextArea from './form/TextArea.vue';
import { ref } from 'vue';
import {useDocumentStore} from '../../stores/documents.js'
import { closeModal } from 'jenesius-vue-modal';
const props = defineProps({
    value: {
        type: Object,
    },
    action: {
        type: String,
        defaul: 'criar'
    }
})
const {createPad, updatePad} = useDocumentStore()
const padModel = ref({
    "name": '',
    "description": '',
    "client": "",
    "action": ""

})

const pad = ref(props.value ? props.value : padModel.value)

async function Submit(){
    if (props.action==='criar'){
        await createPad(pad.value)
    } else {
        await updatePad(pad.value)
    }
}
</script>

<template>
    <div class="new-pad-form">
        <TitleComponent :title="props.action==='criar' ? 'Novo Documento' : 'Atualizar Documento'"></TitleComponent>
        <font-awesome-icon class="icon" icon="times" size="xl" @click="closeModal"/>
        <inputMd v-model="pad.name" placeholder="Ex: Receita de bolo" label="Nome do documento*:"></inputMd>
        <inputMd v-model="pad.client" placeholder="Ex: Maria José" label="Nome do cliente:"></inputMd>
        <inputMd v-model="pad.action" placeholder="Ex: Petição inicial" label="Tipo do Documento:"></inputMd>
        <TextArea v-model="pad.description" placeholder="Uma breve descrição de seu documetno" label="Descrição*:"></TextArea>
        <buttonPrimary v-if="props.action==='criar'" width="100%" label="Criar" @click="Submit"></buttonPrimary>
        <buttonPrimary v-else width="100%" label="Atualizar" @click="Submit"></buttonPrimary>
    </div>
</template>

<style scoped>

.new-pad-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    background-color: white;
    min-height: fit-content;
    min-width: 30rem;
    max-width: 50rem;
    -webkit-border-radius: 3rem;
    -moz-border-radius: 3rem;
    border-radius: 3rem;
    padding: 4rem;
    position: relative;
    width: 100%;
}

.icon {
    position: absolute;
    right: 4rem;
    top: 4rem;
    cursor: pointer;
}

</style>