<script setup>
import { useDocumentoModelStore } from '../stores/documentModels'; 
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import chatComponent from '../components/ChatComponent.vue'
import { openModal } from 'jenesius-vue-modal';
import { useToast } from 'vue-toastification'
import { useClientStore } from '../stores/clients';
import { storeToRefs } from 'pinia';
import InputComponent from '../components/InputComponent.vue';
import SelectComponent from '../components/SelectComponent.vue'
import fileFormModal from '../components/fileFormModal.vue'



const {getModelInstance, campos} = useDocumentoModelStore()
const {model} = storeToRefs(useDocumentoModelStore())
const toast = useToast()

const { getClients, getClientData } = useClientStore()
const { clients, client } = storeToRefs(useClientStore())

const clientsOptions = computed(()=>{
  let arr = clients.value.map(item => {
    return { label: item.name, value: item.id }
  })
  return arr
})

const selectedClient = ref(null)

watch(selectedClient, async (newClient) => {
  await getClientData(newClient)
  array_fields.value.forEach(item => {
    model_fields.value[item] = client.value[item] ? client.value[item] : model_fields.value[item]
    handleFieldInput(item)
  })
})



const router = useRouter()
const route = useRoute()


const array_fields = ref([])
const model_fields = ref({})

onMounted(async () => {
  await getClients()
  await getModelInstance(route.query.id)
  array_fields.value = model.value.fields.replace(' ', '').split(',')
  array_fields.value.forEach(element => {
    model_fields.value[element] = ''
  });
})

function getFieldLabel(campo){
  if (campos.hasOwnProperty(campo.replace(' ', ''))) {
    return campos[`${campo.replace(' ', '')}`]
  } else {
    return campo.charAt(0).toUpperCase() + campo.slice(1)
  }
}

function handleFieldInput(field){
  const text = model.value.text
  const regex = `\<input.*?\>`
  const regex2 = `(?<=data-value=\").*?(?=\")`
  const array = [...model.value.text.matchAll(regex)]
  let arr = array.map(item => item[0])
  let input = arr.filter(item => item.match(regex2)[0]===field)[0]
  const regex3 = /(?<= value=\").*?(?=\")/
  let output = String(input).replace(regex3, model_fields.value[`${field}`])
  model.value.text = String(text.replaceAll(input, output))
}

function handleSaveFile(){
  let text = model.value.text
  const regex = `\<input.*?\>`
  const regex3 = /(?<= value=\").*?(?=\")/
  const array = [...model.value.text.matchAll(regex)]
  array.forEach(item => {
    let actual_value = item[0].match(regex3)[0]
    text = text.replace(item[0], ` ${actual_value} `)
  })
  model.value.text = text
  openModal(fileFormModal, {client: selectedClient.value, text: model.value.text})
}




</script>

<template>
  <div class="document-container">
      <TinyEditor
        api-key="229tbl1echk2xkfmrk0brqszsiq67qrll6jr3hbxhmpj8xj3"
        v-model="model.text"
        :init="{
          language: 'pt_BR',
          toolbar_mode: 'sliding',
          plugins:
            'save preview anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          menubar: 'file edit insert view format table tools help',
          menu: {
            file: { title: 'File', items: 'restoredraft | preview | print | save' }
          },
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          height: '80vh',
          width: '100%',
          save_onsavecallback: () => {
            saveData()
          }
        }"
      />
      <form novalidate @submit.prevent="onSubmit"  class="side-menu">
        <SelectComponent
          v-model="selectedClient"
          label="Cliente"
          placeholder="Selecione..."
          :options="clientsOptions"
        ></SelectComponent>
        <InputComponent v-for="(field, index) in array_fields" :key="index" :label="getFieldLabel(field)" v-model="model_fields[field]" @input="handleFieldInput(field)"/>
        <button @click="handleSaveFile">Salvar</button>
      </form>
      <chatComponent @import="(e) => handleImport(e)"></chatComponent>
    </div>
</template>

<style scoped>


.document-container {
  width: 100%;
  min-height: 80vh;
  max-width: 1320px;
  display: flex;
  flex-direction: row;
}

.side-menu {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  gap: 1rem;
}

.campos {
  max-width: 300px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: .5rem;
}


embed {
  width: 100%;
  max-width: 1320px;
  min-height: 80vh;
  max-height: 90vh;
  margin: 0 auto;
}

.img {
  max-width: 500px;
}

.editor-container {
  display: flex;
  justify-content: space-around;
}
</style>
