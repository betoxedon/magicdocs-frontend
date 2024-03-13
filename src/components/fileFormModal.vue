<script setup>
import inputComponent from '../components/InputComponent.vue'
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { closeModal } from 'jenesius-vue-modal'
import { useFileStore } from '../stores/files.js'
import { useToast } from 'vue-toastification'
const toast = useToast()
const props = defineProps(['file'])

const { postFiles } = useFileStore()
const route = useRoute()
async function createFile(values) {
  let payload = {
    name: values.name,
    description: values.description,
    key_words: values.key_words,
    client: route.query.id
  }
  if (values.file === undefined) {
    payload.type = 'doc'
  } else {
    payload.file = values.file[0]
    payload.type = values.file.type
  }
  let formData = new FormData()
  formData = { ...payload }
  let res = await postFiles(formData)
  if (res.status === 201) {
    closeModal()
    toast.success('Arquivo salvo com sucesso.')
  } else {
    toast.warning('Houve um erro ao salvar seus arquivos. Tente novamente.')
  }
}

const schema = yup.object({
  name: yup.string().required('Este campo é obrigatório'),
  description: yup.string().required('Este campo é obrigatório'),
  key_words: yup.string().required('Este campo é obrigatório'),
  file: yup.mixed()
})
const { values, errors, setFieldValue, handleSubmit, defineField } = useForm({
  validationSchema: schema
})
const [file] = defineField('file')
const [name] = defineField('name')
const [description] = defineField('description')
const [key_words] = defineField('key_words')

const onSubmit = handleSubmit((values) => {
  createFile(values)
})

onMounted(() => {
  if (props.file) {
    setFieldValue('file', props.file)
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
      <!-- <inputComponent
        v-if="!props.file"
        label="Arquivo"
        placeholder="Selecione o arquivo"
        type="file"
        :value="props.file"
        v-model="file"
        :error="errors.file"
      /> -->
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
