<script setup>
import { useForm } from 'vee-validate'
import InputComponent from '../components/InputComponent.vue'
import SelectComponent from '../components/SelectComponent.vue'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import { onMounted } from 'vue'
import { useClientStore } from '../stores/clients.js'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
const route = useRoute()
const router = useRouter()
const { createClient, getClientData, updateClient } = useClientStore()

const toast = useToast()
const newClient = ref(true)

onMounted(() => {
  if (route.query.type === 'old') {
    newClient.value = false
  }
})

onMounted(async () => {
  let id = route.query.id
  if (id) {
    let client = await getClientData(id)
    setFieldValue('name', client.name)
    setFieldValue('email', client.email)
    setFieldValue('cpf', client.cpf)
    setFieldValue('rg', client.rg)
    setFieldValue('phone_number', client.phone_number)
    setFieldValue('postal_code', client.postal_code)
    setFieldValue('adress', client.adress)
    setFieldValue('city', client.city)
    setFieldValue('state', client.state)
    setFieldValue('number', client.number)
    setFieldValue('birth_date', client.birth_date)
    setFieldValue('neighborhood', client.neighborhood)
    setFieldValue('number', client.number)
    setFieldValue('causa', client.causa)
  }
})

const schema = yup.object({
  name: yup.string().required('Este campo é obrigatório'),
  email: yup.string().required('Este campo é obrigatório').email('Insira um email válido'),
  cpf: yup
    .string()
    .required('Este campo é obrigatório')
    .min(14, 'Verifique este campo')
    .max(14, 'Verifique este campo'),
  rg: yup.string().required('Este campo é obrigatório'),
  phone_number: yup
    .string()
    .required('Este campo é obrigatório')
    .min(16, 'Verifique este campo')
    .max(16, 'Verifique este campo'),
  postal_code: yup
    .string()
    .required('Este campo é obrigatório')
    .min(10, 'Verifique este campo')
    .max(10, 'Verifique este campo'),
  adress: yup.string().required('Este campo é obrigatório'),
  city: yup.string().required('Este campo é obrigatório'),
  state: yup.string().required('Este campo é obrigatório'),
  neighborhood: yup.string().required('Este campo é obrigatório'),
  number: yup.string(),
  birth_date: yup.string(),
  sex: yup.string().required('Este campo é obrigatório'),
  causa: yup.string()
})
const emits = defineEmits([])
const { values, errors, setFieldValue, handleSubmit, defineField } = useForm({
  validationSchema: schema
})

const [name] = defineField('name')
const [email] = defineField('email')
const [cpf] = defineField('cpf')
const [rg] = defineField('rg')
const [phone_number] = defineField('phone_number')
const [postal_code] = defineField('postal_code')
const [adress] = defineField('adress')
const [neighborhood] = defineField('neighborhood')
const [city] = defineField('city')
const [state] = defineField('state')
const [number] = defineField('number')
const [causa] = defineField('causa')
const [sex] = defineField('sex')
const [birth_date] = defineField('birth_date')

const onSubmit = handleSubmit(async (values) => {
  values.phone_number = values.phone_number
    .replaceAll('(', '')
    .replaceAll(')', '')
    .replaceAll(' ', '')
    .replaceAll('-', '')
  values.cpf = values.cpf.replaceAll('.', '').replaceAll('-', '')
  values.postal_code = values.postal_code.replaceAll('.', '').replaceAll('-', '')
  let response
  console.log(route.query.id)
  if (route.query.id) {
    response = await updateClient(values, route.query.id)
  } else {
    response = await createClient(values)
  }
  if (response != false) {
    if (route.query.id) {
      toast.success('Cliente atualizado com sucesso!')
    } else {
      toast.success('Cliente cadastrado com sucesso!')
    }
    router.push({ name: 'ClientPage', query: { id: route.query.id } })
  } else {
    toast.warning('Ocorreu um erro, tente novamente!')
  }
})

function limpaFormularioCep() {
  setFieldValue('state', '')
  setFieldValue('city', '')
  setFieldValue('adress', '')
  setFieldValue('neighborhood', '')
}

function viaCepCallback(content) {
  if (!('erro' in content)) {
    setFieldValue('state', content.uf)
    setFieldValue('city', content.localidade)
    setFieldValue('adress', content.logradouro)
    setFieldValue('neighborhood', content.bairro)
  } else {
    toast.warning('CEP não encontrado')
    limpaFormularioCep()
  }
}

async function pesquisaCEP(valor) {
  let cep = valor.replace(/\D/g, '')
  let api = axios
  if (cep != '') {
    let validaCEP = /^[0-9]{8}$/

    if (validaCEP.test(cep)) {
      setFieldValue('state', '...')
      setFieldValue('city', '...')
      setFieldValue('adress', '...')
      setFieldValue('neighborhood', '...')

      const response = await api.get('https://viacep.com.br/ws/' + cep + '/json/')
      viaCepCallback(response.data)
    } else {
      limpaFormularioCep()
      toast('Formato de CEP inválido')
    }
  } else {
    limpaFormularioCep()
  }
}
</script>

<template>
  <form class="container" style="max-width: 767px !important; gap: 1.5rem" novalidate @submit="onSubmit">
    <div class="container-header" v-if="newClient">Novo Cliente</div>
    <div class="container-header" v-else>Atualizar Cliente</div>
    <div class="container-body form">
      <InputComponent label="Nome" placeholder="Ex: Roberto Melo" v-model="name" :error="errors.name"></InputComponent>
      <InputComponent
        label="Data de Nascimento"
        placeholder="Ex: 01/01/2001"
        mask="##/##/####"
        v-model="birth_date"
        :error="errors.birth_date"
      ></InputComponent>
      <SelectComponent
        v-model="sex"
        label="Sexo"
        placeholder="Selecione..."
        :options="[
          { label: 'Masculino', value: 'MALE' },
          { label: 'Feminino', value: 'FEMALE' },
          { label: 'Outro', value: 'OTHER' }
        ]"
        :error="errors.sex"
      ></SelectComponent>
      <InputComponent label="Causa" placeholder="Ex: Divorcio" v-model="causa" :error="errors.causa"></InputComponent>
      <InputComponent
        label="Email"
        placeholder="Ex: meuemail@email.com"
        v-model="email"
        :error="errors.email"
      ></InputComponent>
      <InputComponent
        label="CPF"
        placeholder="Ex: 000.000.000-00"
        mask="###.###.###-##"
        v-model="cpf"
        :error="errors.cpf"
      ></InputComponent>
      <InputComponent label="RG" placeholder="Ex: #.###.### SSP/UF" v-model="rg" :error="errors.rg"></InputComponent>
      <InputComponent
        label="Telefone"
        placeholder="Ex: (##) 9 ####-####"
        mask="(##) 9 ####-####"
        v-model="phone_number"
        :error="errors.phone_number"
      ></InputComponent>
      <InputComponent
        label="CEP"
        placeholder="Ex: ##.###-###"
        mask="##.###-###"
        v-model="postal_code"
        :error="errors.postal_code"
        @blur="pesquisaCEP(postal_code)"
      ></InputComponent>
      <InputComponent
        label="Endereço"
        placeholder="Ex: Rua da Oliveira"
        v-model="adress"
        :error="errors.adress"
      ></InputComponent>
      <InputComponent label="Número" placeholder="Ex: 41" v-model="number" :error="errors.number"></InputComponent>
      <InputComponent
        label="Bairro"
        placeholder="Ex: Centro"
        v-model="neighborhood"
        :error="errors.neighborhood"
      ></InputComponent>
      <InputComponent label="Cidade" placeholder="Ex: Recife" v-model="city" :error="errors.city"></InputComponent>
      <InputComponent
        label="Estado"
        placeholder="Ex: Pernambuco"
        v-model="state"
        :error="errors.state"
      ></InputComponent>
    </div>
    <div class="container-footer">
      <div style="display: flex; gap: 3rem">
        <button class="btn-primary">Salvar</button>
        <button
          class="btn-danger"
          type="button"
          @click="router.push({ name: 'ClientPage', query: { id: route.query.id } })"
        >
          Cancelar
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
}

.container-footer {
  display: flex;
  justify-content: space-around;
  gap: 2rem;
}
</style>
