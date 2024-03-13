<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import imageCropper from '../components/imageCropper.vue'
import { useForm } from 'vee-validate'
import InputComponent from '../components/InputComponent.vue'
import SelectComponent from '../components/SelectComponent.vue'
import { useToast } from 'vue-toastification'
import * as yup from 'yup'
import axios from 'axios'

const { user } = storeToRefs(useUserStore())
const { getUserData, updateUser } = useUserStore()

const toast = useToast()

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

let userData = ref(null)
const userCreatedOn = ref('')
onMounted(() => {
  let date = new Date(user.value.created_at)
  let ano = date.getFullYear()
  let mes = date.getMonth()
  let dia = date.getDate()
  console.log(`${dia} de ${months[mes]} de ${ano}`)
  userCreatedOn.value = `${dia} de ${months[mes]} de ${ano}`
})

const schema = yup.object({
  first_name: yup.string().required('Este campo é obrigatório'),
  last_name: yup.string().required('Este campo é obrigatório'),
  email: yup.string().required('Este campo é obrigatório'),
  birth_date: yup.date().required('Este campo é obrigatório'),
  sex: yup.string().required('Este campo é obrigatório'),
  cpf: yup
    .string()
    .required('Este campo é obrigatório')
    .min(14, 'Verifique este campo')
    .max(14, 'Verifique este campo'),
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
  uf: yup.string().required('Este campo é obrigatório').min(2, 'Verifique este campo').max(2, 'Verifique este campo'),
  city: yup.string().required('Este campo é obrigatório'),
  neighborhood: yup.string().required('Este campo é obrigatório'),
  adress: yup.string().required('Este campo é obrigatório'),
  number: yup.string(),
  complement: yup.string(),
  profile_picture: yup.mixed()
})

const { defineField, values, errors, setFieldValue, handleSubmit } = useForm({
  validationSchema: schema
})

const [profile_picture] = defineField('profile_picture')
const [first_name] = defineField('first_name')
const [last_name] = defineField('last_name')
const [email] = defineField('email')
const [sex] = defineField('sex')
const [birth_date] = defineField('birth_date')
const [cpf] = defineField('cpf')
const [phone_number] = defineField('phone_number')
const [postal_code] = defineField('postal_code')
const [uf] = defineField('uf')
const [adress] = defineField('adress')
const [number] = defineField('number')
const [complement] = defineField('complement')
const [city] = defineField('city')
const [neighborhood] = defineField('neighborhood')

onMounted(async () => {
  userData.value = await getUserData()
  setFieldValue('profile_picture', userData.value.profile_picture ? userData.value.profile_picture : '')
  setFieldValue('first_name', userData.value.first_name ? userData.value.first_name : '')
  setFieldValue('last_name', userData.value.last_name ? userData.value.last_name : '')
  setFieldValue('email', userData.value.email ? userData.value.email : '')
  setFieldValue('birth_date', userData.value.birth_date ? userData.value.birth_date : '')
  setFieldValue('cpf', userData.value.cpf ? userData.value.cpf : '')
  setFieldValue('sex', userData.value.sex ? userData.value.sex : '')
  setFieldValue('phone_number', userData.value.phone_number ? userData.value.phone_number : '')
  setFieldValue('postal_code', userData.value.postal_code ? userData.value.postal_code : '')
  setFieldValue('uf', userData.value.uf ? userData.value.uf : '')
  setFieldValue('adress', userData.value.adress ? userData.value.adress : '')
  setFieldValue('number', userData.value.number ? userData.value.number : '')
  setFieldValue('city', userData.value.city ? userData.value.city : '')
  setFieldValue('neighborhood', userData.value.neighborhood ? userData.value.neighborhood : '')
  setFieldValue('complement', userData.value.complement ? userData.value.complement : '')

  let date = new Date(userData.value.created_at)
  let ano = date.getFullYear()
  let mes = date.getMonth()
  let dia = date.getDate()
  console.log(`${dia} de ${months[mes]} de ${ano}`)
  userCreatedOn.value = `${dia} de ${months[mes]} de ${ano}`
})

const onSubmit = handleSubmit((values) => {
  values.phone_number = values.phone_number
    .replaceAll('(', '')
    .replaceAll(')', '')
    .replaceAll(' ', '')
    .replaceAll('-', '')
  values.cpf = values.cpf.replaceAll('.', '').replaceAll('-', '')
  values.postal_code = values.postal_code.replaceAll('.', '').replaceAll('-', '')
  let formData = new FormData()
  formData = { ...values }
  updateUser(formData)
  getUserData()
})
// PREENCHENDO ENDEREÇO COM OS DADOS DO VIACEP

function limpaFormularioCep() {
  setFieldValue('uf', '')
  setFieldValue('city', '')
  setFieldValue('adress', '')
  setFieldValue('neighborhood', '')
}

function viaCepCallback(content) {
  if (!('erro' in content)) {
    setFieldValue('uf', content.uf)
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
      setFieldValue('uf', '...')
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
function handleFile(value) {
  setFieldValue('profile_picture', value)
}
</script>

<template>
  <form novalidate @submit="onSubmit">
    <div class="profile-area picture-form">
      <div class="section">
        <h3>{{ user.first_name + ' ' + user.last_name }}</h3>
        <h4>{{ user.email }}</h4>
      </div>
      <div class="section">
        <imageCropper v-model="profile_picture" style="align-self: center" @file="(e) => handleFile(e)"></imageCropper>
        <div class="hint">
          <div>Suba uma nova foto de perfil. Imagens grandes serão automaticamente reduzidas.</div>
          <div>Tamanho máximo de upload: <strong>1MB</strong></div>
        </div>
      </div>
      <div class="section">
        <span class="member-since"
          >Membro desde: <strong>{{ userCreatedOn }}</strong></span
        >
      </div>
    </div>

    <div class="profile-form">
      <div class="header">
        <h2>Editar Perfil</h2>
      </div>
      <div class="form-container">
        <h3>Dados Pessoais</h3>
        <div class="separator"></div>
        <div class="form">
          <InputComponent
            v-model="first_name"
            placeholder="Ex: Roberto"
            label="Nome"
            :error="errors.first_name"
          ></InputComponent>
          <InputComponent
            v-model="last_name"
            placeholder="Ex: Melo"
            label="Sobrenome"
            :error="errors.last_name"
          ></InputComponent>
          <InputComponent
            v-model="email"
            placeholder="Ex: meuemail@mail.com"
            label="Email"
            :error="errors.email"
          ></InputComponent>
          <InputComponent
            v-model="birth_date"
            placeholder="Ex: 01/01/2001"
            label="Data de Nascimento"
            type="date"
            :error="errors.birth_date"
          ></InputComponent>
          <SelectComponent
            v-model="sex"
            label="Sexo"
            placeholder="Selecione..."
            :options="[
              { label: 'Masculino', value: 'MALE' },
              { label: 'Feminino', value: 'FEMALE' }
            ]"
            :error="errors.sex"
          ></SelectComponent>
          <InputComponent
            v-model="cpf"
            placeholder="Ex: '###.###.###-##'"
            mask="###.###.###-##"
            label="CPF"
            :error="errors.cpf"
          ></InputComponent>
          <InputComponent
            v-model="phone_number"
            placeholder="Ex: '(##) # ####-####'"
            mask="(##) # ####-####"
            label="Celular"
            :error="errors.phone_number"
          ></InputComponent>
          <InputComponent
            v-model="postal_code"
            placeholder="Ex: '#####-###'"
            mask="##.###-###"
            label="CEP"
            @blur="pesquisaCEP(postal_code)"
            :error="errors.postal_code"
          ></InputComponent>
          <InputComponent v-model="uf" placeholder="Ex: 'PE'" label="UF" :error="errors.uf"></InputComponent>
          <InputComponent
            v-model="city"
            placeholder="Ex: 'Recife'"
            label="Cidade"
            :error="errors.city"
          ></InputComponent>
          <InputComponent
            v-model="neighborhood"
            placeholder="Ex: 'Centro'"
            label="Bairro"
            :error="errors.neighborhood"
          ></InputComponent>
          <InputComponent
            v-model="adress"
            placeholder="Ex: 'Av. Caxangá'"
            label="Endereço"
            :error="errors.adress"
          ></InputComponent>
          <InputComponent
            v-model="number"
            placeholder="Ex: '41'"
            label="Número"
            :error="errors.number"
          ></InputComponent>
          <InputComponent
            v-model="complement"
            placeholder="Ex: 'Prox. a...'"
            label="Complemento"
            :error="errors.complement"
          ></InputComponent>
        </div>
        <div class="separator" style="margin-top: 1rem"></div>
        <div class="section row">
          <button class="btn-primary">Atualizar Dados</button>
          <button class="btn-danger" type="button">Cancelar</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 1320px;
  background-color: var(--color-secondary-background);
  padding: 1rem;
  border-radius: 8px;
}

h4 {
  font-size: 0.75rem;
  color: var(--color-font-secondary);
}
.profile-area {
  background-color: white;
  border-radius: 4px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.picture-form {
  max-width: 220px;
  height: fit-content;
}

.profile-area h3 {
  align-self: center;
}

.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.hint {
  font-size: 0.8rem;
  font-weight: 300;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: var(--color-hint);
  line-height: 1rem;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1.8px solid var(--color-font-secondary);
}

.hint div {
  text-align: center;
}

strong {
  font-weight: 500;
}

.member-since {
  font-size: 12px;
  font-weight: 300;
}

.profile-form {
  width: 100%;
  background-color: white;
  border-radius: 4px;
}

.header {
  height: 5rem;
  font-size: 2rem;
  background-color: var(--color-background);
  color: var(--color-white-fonts);
  padding: 2rem;
  display: flex;
  align-items: flex-end;
  border-radius: 4px 4px 0 0;
}

.form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
}

.form-container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.separator {
  border: 1px solid;
  margin-bottom: 1rem;
}

.row {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 767px) {
  form {
    flex-direction: column;
  }
  .picture-form {
    max-width: 100%;
  }
}
</style>
