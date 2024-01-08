<script setup>
import inputMd from './form/inputMd.vue';
import buttonPrimary from './form/buttonPrimary.vue';
import { useChatStore } from '../../stores/chat';
import { ref } from 'vue';

const pedido = ref({})
const documento = ref({})
const decisao = ref({})
const {requestDocument} = useChatStore()

function submit(){
    let payload = `${decisao.value} || ${documento.value} || ${pedido.value}`
    requestDocument(payload)
}

</script>

<template>
    <div class="modal-document">
        <inputMd v-model="decisao.value" label="Decisão" placeholder="stj pagamento de indenização por danos morais em atraso de voo"></inputMd>
        <inputMd v-model="documento.value" label="Documento" placeholder="Petição inicial"></inputMd>
        <inputMd v-model="pedido.value" label="Pedido" placeholder="A anular a causa de um dano moral"></inputMd>
        <buttonPrimary label="Criar Documento" @click="submit"></buttonPrimary>
    </div>
</template>

<style scoped>
.modal-document {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background-color: var(--color-background);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    min-width: 50vw;
}
</style>