<script setup>
const props = defineProps({
    field: {
        type: String
    }
})

const emits = defineEmits(['drop'])

const campos = {
    name: "Nome",
    email: "Email",
    sex: "Sexo",
    cpf: "CPF",
    rg: "RG",
    postal_code: "CEP",
    phone_number: "Telefone",
    adress: "Endereço",
    neighborhood: "Bairro",
    city: "Cidade",
    state: "Estado",
    number: "Número",
    causa: "Causa",
    birth_date: "Data de Nascimento",
}

function dragstart_handler(event, value){
    var data
    if (campos.hasOwnProperty(value)){
        data =event.dataTransfer.setData("text/html", `<input id="${`id_${value}`}" disabled value="${campos[`${value}`]}" data-value="${value}"  style="width: 120px; margin: 0 5px"/>`);
    } else {
        data =event.dataTransfer.setData("text/html", `<input id="${`id_${value}`}" disabled value="${value}" data-value="${value}"  style="width: 120px; margin: 0 5px"/>`);
    }
    event.dataTransfer.dropEffect = "copy";
    emits('drop', value)
}


</script>

<template>
    <div class="field" v-if="campos.hasOwnProperty(field)" draggable="true" @dragstart="(e)=>dragstart_handler(e, field)" @drop="(e)=>drop_handler(e)">
        {{ campos[`${field}`] }}
    </div>
    <div v-else-if="field!='is_active'" class="field" draggable="true" @dragstart="(e)=>dragstart_handler(e, field)" @drop="(e)=>drop_handler(e)">{{ field }}</div>
</template>

<style scoped>
.field {
    padding: 10px;
    background-color: var(--color-label-primary);
    color: var(--color-white);
    cursor: grab;
    border-radius: 4px;
    height: fit-content;
}
</style>