<script setup>
import { useForm } from 'vee-validate'
import InputMd from './InputMd.vue'
import buttonPrimary from './buttonPrimary.vue'
import ErrorComponent from './ErrorComponent.vue'
import { useUserStore } from '../stores/user'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

const router = useRouter()
const toast = useToast()
const emits = defineEmits('toggle')
const { login, register } = useUserStore()

const schema = yup.object({
  email: yup.string().required('Este campo é obrigatório').email('Insira um email válido.'),
  password: yup.string().required('Este campo é obrigatório'),
  first_name: yup.string().required('Este campo é obrigatório'),
  password_repeat: yup
    .string()
    .required('Este campo é obrigatório')
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
})

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: schema
})
const [email] = defineField('email')
const [first_name] = defineField('first_name')
const [password] = defineField('password')
const [password_repeat] = defineField('password_repeat')

const onSubmit = handleSubmit(async (values) => {
  let res = await register(values)
  console.log(res)
  if (res.status === 201) {
    toast.success('Usuário criado com sucesso!')
    window.location.reload()
  } else {
    toast.success('Houve um erro ao cadastrar o usuário.')
  }
})
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <h3>Faça parte do MagicDocs</h3>
      <InputMd placeholder="Nome" icon="at" bottomslots v-model="first_name">
        <template v-slot:bottom>
          <ErrorComponent :error="errors.first_name"></ErrorComponent>
        </template>
      </InputMd>
      <InputMd placeholder="Email" icon="at" bottomslots v-model="email">
        <template v-slot:bottom>
          <ErrorComponent :error="errors.email"></ErrorComponent>
        </template>
      </InputMd>
      <InputMd placeholder="Password" type="password" icon="lock" bottomslots v-model="password">
        <template v-slot:bottom>
          <ErrorComponent :error="errors.password"></ErrorComponent>
        </template>
      </InputMd>
      <InputMd placeholder="Password" type="password" icon="lock" bottomslots v-model="password_repeat">
        <template v-slot:bottom>
          <ErrorComponent :error="errors.password_repeat"></ErrorComponent>
        </template>
      </InputMd>
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <buttonPrimary label="Cadastrar" style="width: 100%" type="submit"></buttonPrimary>
        <buttonPrimary outlined label="Já possuo login" style="width: 100%" @click="emits('toggle')"></buttonPrimary>
      </div>
    </form>
    <div class="banner">
      <img
        src="../images/register.png"
        alt="Desenho de duas pessoas mexendo em seus dispositivos apoiadas na imagem de um celular gigante na tela de login"
      />
    </div>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  padding: 2rem;
  border-radius: 8px;
  background-color: white;
  align-items: center;
}

h3 {
  margin-bottom: 2rem;
  width: 100%;
  text-align: center;
  font-size: 24px;
}

@media screen and (max-width: 667px) {
  .form-container {
    flex-direction: column;
  }
  .form-container .banner {
    display: none;
  }
}
</style>
