<script setup>
import ContextMenu from '../components/ContextMenu.vue'
import AccordionGroup from '../components/AccordionGroup.vue'
import AccordionItem from '../components/AccordionItem.vue'
import { useDocumentoModelStore } from '../stores/documentModels'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import chatComponent from '../components/ChatComponent.vue'
import ModelField from '../components/ModelField.vue'
import { useToast } from 'vue-toastification'
import { useClientStore } from '../stores/clients'
import { storeToRefs } from 'pinia'
import InputComponent from '../components/InputComponent.vue'

const route = useRoute()
const update = ref(false) 
onMounted(async ()=> {
  if (route.query.id) {
    let instance = await getModelInstance(route.query.id)
    console.log(instance)
    setFieldValue('name', instance.name)
    setFieldValue('description', instance.description)
    file.value = instance.text
    update.value = true
    usedFields.value = instance.fields.split(", ")
    newFields.value = usedFields.value.filter(item => !fields.value.includes(item))
  }
})

const { createModel, getModelInstance, updateModel } = useDocumentoModelStore()
const toast = useToast()
const { fields } = storeToRefs(useClientStore())

const file = ref('')
const newField = ref('')
const newFields = ref([])
const usedFields = ref([])

const router = useRouter()


function handleImport(e) {
  file.value += `\n ${e}`
}

function handleNewField(value) {
  console.log(value)
  newFields.value.push(value)
  console.log(newFields.value)
  newField.value = ''
}

function handleDrop(value) {
  if (!usedFields.value.includes(value)) {
    usedFields.value.push(value)
  }
}

function handleRemove(value) {
  for (let index = 0; index < newFields.value.length; index++) {
    if (newFields.value[index] === value) {
      newFields.value.splice(index, 1)
    }
  
  }
}


// FORM
import * as yup from 'yup'
import { useForm } from 'vee-validate'

const schema = yup.object({
  name: yup.string().required('Este campo é obrigatório!'),
  text: yup.string(),
  description: yup.string().required('Este campo é obrigatório!'),
  fields: yup.string()
})
const { errors, defineField, handleSubmit, values, setFieldValue } = useForm({
  validationSchema: schema
})
const [name] = defineField('name')
const [text] = defineField('text')
const [description] = defineField('description')
const [modelFields] = defineField('fields')
const [published] = defineField('published')

const onSubmit = handleSubmit(async (values) => {
  let payload = {
    name: values.name,
    text: file.value,
    description: values.description,
    fields: usedFields.value.toString().replace(',', ', '),
    published: values.published
  }

  let res
  if (update.value) {
    res = await updateModel(payload, route.query.id)
  } else {
    res = await createModel(payload)
    
  }
  if (res) {
    toast.success('Modelo criado com sucesso!')
    router.push({ name: 'Modelos' })
  } else {
    toast.success('Houve um erro ao efetuar sua solicitação.')
  }
})

// function handleContextMenu(e){
//   let selectedText = tinymce.value.getEditor().selection.getContent()
//   if (selectedText.length>0) {
//     e.preventDefault()
//     let x = e.x + 45
//     let y = e.y + 45
//     let node = tinymce.value.getEditor().selection.getSel()
//     contextmenu.value.defineCoordinates(x, y)
//     contextmenu.value.showMenu()
//     contextmenu.value.defineText(selectedText)
//     node.anchorNode.data.replace(selectedText, "teste")
//     console.log(selectedText)
//   }
// }

const tinymce = ref(null)
// const contextmenu = ref(null)
async function handle_draft(){
  setFieldValue('published', false)
  onSubmit()
}

async function handle_save(){
  setFieldValue('published', true)
  onSubmit()
}

</script>

<template>
  <div class="document-container">
    <!-- <ContextMenu ref="contextmenu" @handleAssistant="handleAssistPrompt"></ContextMenu> -->
    <div class="tiny-container" >
      <TinyEditor
        ref="tinymce"
        api-key="v9fj6n0ekkc992gxnfzqjo6vzwe0zucj30bcg30ca6bfgziz"
        v-model="file"
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
          contextmenu: false,
          save_onsavecallback: () => {
            saveData()
          },
        }"
      />

    </div>
    <form novalidate @submit.prevent="onSubmit" class="side-menu">
      <div style="display: flex; flex-direction: column; align-items: stretch; gap: 1rem">
        <button class="full-width-button" type="button" @click="handle_save">Salvar</button>
        <button class="full-width-button" type="button" @click="handle_draft">Salvar Rascunho</button>
        <button class="full-width-button btn-danger" type="button">Cancelar</button>
      </div>
      <AccordionGroup>
        <AccordionItem title="Dados do Documento">
          <InputComponent
            label="Título do Modelo"
            v-model="name"
            placeholder="Escreva aqui o título que deseja para o documento"
            :error="errors.name"
          />
          <InputComponent
            label="Descrição"
            v-model="description"
            placeholder="Faça uma breve descrição do modelo"
            :error="errors.description"
          />
        </AccordionItem>
        <AccordionItem title="Campos Padrão">
          <div class="campos">
            <ModelField v-for="(field, index) in fields" :key="index" :field="field" @drop="(e) => handleDrop(e)" />
          </div>
        </AccordionItem>
        <AccordionItem title="Campos Personalizados">
          <div>
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem">
              <InputComponent label="Adicionar Campos" v-model="newField" placeholder="Nome do campo" />
              <button type="button" style="align-self: end" @click="handleNewField(newField)">+</button>
            </div>
          </div>
          <div class="campos">
            <ModelField v-for="(field, index) in newFields" :key="index" :field="field" @drop="(e) => handleDrop(e)" @remove="(e)=>handleRemove(e)"  />
              {{ newFields.value }}
          </div>
        </AccordionItem>
      </AccordionGroup>

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
  box-sizing: border-box;
}
.tiny-container {
  flex-shrink: 1;
  width: calc(100% - 350px);
}

.side-menu {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  gap: 1rem;
  max-height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
  width: 300px;
}

.campos {
  max-width: 100%;
  height: fit-content;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem 0rem;
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

.full-width-button {
  width: 100%;
}
</style>
