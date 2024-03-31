<script setup>
import { useDocumentoModelStore } from '../stores/documentModels'; 
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import chatComponent from '../components/ChatComponent.vue'
import ModelField from '../components/ModelField.vue';
import { useToast } from 'vue-toastification'
import { useClientStore } from '../stores/clients';
import { storeToRefs } from 'pinia';
import InputComponent from '../components/InputComponent.vue';

const {createModel} = useDocumentoModelStore()
const toast = useToast()
const { getClientFields } = useClientStore()
const {fields} = storeToRefs(useClientStore())


const file = ref({})
const newField = ref('')
const usedFields = ref([])

const router = useRouter()

onMounted(async () => {
  await getClientFields()
})

function handleImport(e) {
  file.value.text += `\n${e}`
}

function handleNewField(value){
  fields.value.push(value)
  newField.value = ''
}

function handleDrop(value){
  if (!usedFields.value.includes(value)){
    usedFields.value.push(value)
  }
}

// FORM
import * as yup from 'yup'
import { useForm } from 'vee-validate'

const schema = yup.object({
  name: yup.string().required("Este campo é obrigatório!"),
  text: yup.string(),
  description: yup.string(),
  fields: yup.string(),
})
const { errors, defineField, handleSubmit } = useForm({
  validationSchema: schema
})
const [name] = defineField('name')
const [text] = defineField('text')
const [description] = defineField('description')
const [modelFields] = defineField('fields')

const onSubmit = handleSubmit(async (values) => {

  let payload = {
    name: values.name,
    text: values.text,
    fields: usedFields.value.toString().replace(',', ', ')
  }

  let res = await createModel(payload)
  if (res) {
    toast.success('Modelo criado com sucesso!')
    router.push({name: "Modelos"})
  } else {
    toast.success('Houve um erro ao cadastrar o usuário.')
  }
})
</script>

<template>
  <div class="document-container">
      <TinyEditor
        api-key="229tbl1echk2xkfmrk0brqszsiq67qrll6jr3hbxhmpj8xj3"
        v-model="text"
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
        <div>
          <span>Dados do Template:</span>
          <InputComponent label="Título" v-model="name" placeholder="Nome do modelo" :error="errors.name"/>
        </div>
        <div>
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: .5rem;">
            <InputComponent label="Adicionar Campos" v-model="newField" placeholder="Nome do campo" />
            <button type="button" style="align-self: end;" @click="handleNewField(newField)">+</button>
          </div>
        </div>
        <div class="campos">
          <ModelField v-for="(field, index) in fields" :key="index" :field="field" @drop="(e)=>handleDrop(e)"/>
        </div>
        <span>Ações:</span>
        <div style="display: flex; gap: 1rem;">
            <button>Salvar</button>
            <button type="button" class="btn-danger">Cancelar</button>
          </div>
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
