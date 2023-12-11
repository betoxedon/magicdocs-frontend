<script setup>
import TitleComponent from './TitleComponent.vue';
import inputMd from './form/inputMd.vue';
import buttonPrimary from './form/buttonPrimary.vue';
import TextArea from './form/TextArea.vue';
import { ref } from 'vue';
import {useDocumentStore} from '../../stores/documents.js'

const {createPad} = useDocumentStore()
const pad = ref({
    name: '',
    description: ''
})

async function Submit(){
    await createPad(pad.value)
}
</script>

<template>
    <div class="new-pad-form">
        <TitleComponent title="Novo Documento"></TitleComponent>
        <inputMd v-model="pad.name" placeholder="Ex: Receita de bolo" label="Nome do documento:"></inputMd>
        <TextArea v-model="pad.description" placeholder="Uma breve descrição de seu documetno" label="Descrição:"></TextArea>
        <buttonPrimary width="100%" label="Criar" @click="Submit"></buttonPrimary>
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
}

</style>