<script setup>
import AccordionGroup from '../components/AccordionGroup.vue'
import AccordionItem from '../components/AccordionItem.vue'
import InputComponent from '../components/InputComponent.vue'
import chatComponent from '../components/ChatComponent.vue'
import { onMounted, ref, watch } from 'vue'

const content = ref(
  'De um lado, {{nomedoautor}}, inscrito (a) no CPF/MF sob o nº {{CPF}}, residente e domiciliado (a) na {{enderecocompleto}}, vem à presença de Vossa Excelência, propor a presente Ação de repetição do indébito contra {{nomedaempresa}}, pessoa jurídica de direito público, inscrita no CNPJ/MF sob o nº {{numerocnpj}}, podendo ser citada na {{enderecocompletoempresa}}, pelas razões de fato e de direito que passa a expor: De um lado, {{nomedoautor}}, inscrito (a) no CPF/MF sob o nº {{CPF}}, residente e domiciliado (a) na {{enderecocompleto}}, vem à presença de Vossa Excelência, propor a presente Ação de repetição do indébito contra {{nomedaempresa}}, pessoa jurídica de direito público, inscrita no CNPJ/MF sob o nº {{numerocnpj}}, podendo ser citada na {{enderecocompletoempresa}}, pelas razões de fato e de direito que passa a expor:'
)
const rendered_text = ref('')
const results = ref(null)
const filtro = ref('')
const campos_encontrados = ref([])

onMounted(()=>{
  results.value = document.getElementById('model_results')
})


function handleImport(e) {
  content.value.text += `\n${e}`
}

function handleFieldInput() {
  let identificadores = filtro.value.split(' ')
  const regex = `\\${identificadores[0]}.*?\\${identificadores[1]}`
  const array = [...content.value.matchAll(regex)]
  let text = content.value
  campos_encontrados.value = []
  array.forEach((item) => {
    text = text.replaceAll(item[0], `<mark>${item[0]}</mark>`)
    if (!campos_encontrados.value.includes(item[0].replace(identificadores[0], '').replace(identificadores[1], ''))){
      campos_encontrados.value.push(item[0].replace(identificadores[0], '').replace(identificadores[1], ''))
    }
  })
  rendered_text.value = text
  results.value.innerHTML = rendered_text.value
}

// function handleSaveFile() {
//   let text = model.value.text
//   const regex = `\<input.*?\>`
//   const regex3 = /(?<= value=\").*?(?=\")/
//   const array = [...model.value.text.matchAll(regex)]
//   array.forEach((item) => {
//     let actual_value = item[0].match(regex3)[0]
//     text = text.replace(item[0], ` ${actual_value} `)
//   })
//   model.value.text = text
//   openModal(fileFormModal, { client: selectedClient.value, text: model.value.text })
// }

// FORM
import * as yup from 'yup'
import { useForm } from 'vee-validate'

const schema = yup.object({
  name: yup.string().required('Este campo é obrigatório!'),
  text: yup.string(),
  description: yup.string(),
  fields: yup.string()
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
    router.push({ name: 'Modelos' })
  } else {
    toast.success('Houve um erro ao cadastrar o usuário.')
  }
})
</script>

<template>
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
    <AccordionItem title="Campos">
      <div class="row">
        <InputComponent
          label="Indicadores"
          v-model="filtro"
          placeholder="Indique quais são os identificadores dos campos: Ex: '[[ ]]'"
          :error="errors.description"
        />
        <button @click="handleFieldInput">Identificar campos</button>
      </div>
      <div class="row" v-if="campos_encontrados.length === 0">Nenhum campo foi encontrado</div>
      <div class="row" v-else>
        <span class="fields" v-for="(field, index) in campos_encontrados" :key="index">{{ field }}</span>
      </div>
    </AccordionItem>
    <AccordionItem title="Documento">
      <TinyEditor
        api-key="v9fj6n0ekkc992gxnfzqjo6vzwe0zucj30bcg30ca6bfgziz"
        v-model="content"
        @input="handleFieldInput"
        :init="{
          language: 'pt_BR',
          toolbar_mode: 'sliding',
          plugins:
            'save preview anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat ',
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
          },
        }"
        model-events="change"
      />
    </AccordionItem>
    <AccordionItem title="Visualização do modelo">
      <div id="model_results"></div>
      <div v-if="rendered_text === ''" style="display: flex; justify-content: center">
        Identifique os campos no modelo para poder visualizar o resultado
      </div>
    </AccordionItem>
    <chatComponent @import="(e) => handleImport(e)"></chatComponent>
  </AccordionGroup>
</template>

<style scoped>
.row {
  display: flex;
  align-items: end;
  gap: 1rem;
  flex-wrap: wrap;
}

.row button {
  align-self: flex-end;
}

.fields {
  padding: 10px;
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: 5px;
}
</style>
