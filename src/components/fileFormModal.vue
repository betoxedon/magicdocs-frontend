<script setup>
import inputComponent from '../components/InputComponent.vue'
import SelectComponent from './SelectComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { closeModal } from 'jenesius-vue-modal'
import { useFileStore } from '../stores/files.js'
import { useToast } from 'vue-toastification'
import { storeToRefs } from 'pinia'
const toast = useToast()
const props = defineProps(['file', 'updatefile', 'ask_client', 'client', 'text'])


import { useClientStore } from '../stores/clients'
const { getClients } = useClientStore()
const { clients } = storeToRefs(useClientStore())

onMounted(async () => {
  await getClients()
})

const clientsOptions = computed(()=>{
  let arr = clients.value.map(item => {
    return { label: item.name, value: item.id }
  })
  return arr
})


const { postFiles, updateFiles, getFiles } = useFileStore()
const route = useRoute()
const router = useRouter()
async function createFile(values) {
  let payload = {
    name: values.name,
    description: values.description,
    key_words: values.key_words,
    client: values.client
  }
  if (values.file === undefined) {
    payload.type = 'doc'
    payload.content = props.text
  } else {
    payload.file = values.file[0]
    payload.type = values.file.type
  }
  let formData = new FormData()
  formData = { ...payload }
  let res
  if (props.updatefile){
    res = await updateFiles(payload, props.updatefile.id)
  } else {
    res = await postFiles(formData)
  }
  if ([200, 201].includes(res.status)) {
    getFiles()
    closeModal()
    toast.success('Arquivo salvo com sucesso.')
    router.push({name: "DocumentView", query: {id: res.data.id}})
  } else {
    toast.warning('Houve um erro ao salvar seus arquivos. Tente novamente.')
  }
}

const schema = yup.object({
  name: yup.string().required('Este campo é obrigatório'),
  description: yup.string().required('Este campo é obrigatório'),
  key_words: yup.string().required('Este campo é obrigatório'),
  file: yup.mixed(),
  client: yup.number()
})
const { values, errors, setFieldValue, handleSubmit, defineField } = useForm({
  validationSchema: schema
})

const [file] = defineField('file')
const [name] = defineField('name')
const [description] = defineField('description')
const [key_words] = defineField('key_words')
const [client] = defineField('client')

const onSubmit = handleSubmit((values) => {
  createFile(values)
})

onMounted(() => {
  if (props.client) {
    setFieldValue('client', props.client)
  } else  {
    setFieldValue('client', route.query.id)
  }
  if (props.file) {
    setFieldValue('file', props.file)
  }
  if (props.updatefile) {
    setFieldValue('name', props.updatefile.name)
    setFieldValue('description', props.updatefile.description)
    setFieldValue('key_words', props.updatefile.key_words)
    setFieldValue('client', props.updatefile.client)
  }

})
</script>
<template>
  <div class="container wrapper">
    <h4 style="margin-bottom: 1rem">Salvar Arquivo</h4>
    <form action="" novalidate @submit.prevent="onSubmit">
      <inputComponent label="Título" placeholder="Título do arquivo" v-model="name" :error="errors.name" />
      <inputComponent
        label="Descrição"
        placeholder="Uma breve descrição do arquivo"
        v-model="description"
        :error="errors.description"
      />
      <inputComponent
        label="Palavras-chave"
        placeholder="Separe as palavras por vírgula"
        v-model="key_words"
        :error="errors.key_words"
      />
      <SelectComponent
        v-model="client"
        label="Cliente"
        placeholder="Selecione..."
        :options="clientsOptions"
        :error="errors.client"
        v-if="ask_client"
      ></SelectComponent>
      <div class="button-wrapper">
        <button>Salvar Documento</button>
        <button class="btn-danger" type="button" @click="closeModal">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  width: fit-content;
  min-width: 300px;
  width: 100%;
  max-width: 500px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.button-wrapper {
  display: flex;
  justify-content: space-around;
}
</style>
