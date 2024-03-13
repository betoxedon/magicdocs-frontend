<script setup>
import { useForm } from 'vee-validate'
import InputMd from './InputMd.vue'
import buttonPrimary from './buttonPrimary.vue'
import ErrorComponent from './ErrorComponent.vue'
import { useUserStore } from '../stores/user'
import * as yup from 'yup'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const emits = defineEmits('toggle')
const { login } = useUserStore()
const { loggedIn } = storeToRefs(useUserStore())

const router = useRouter()

const schema = yup.object({
  email: yup.string().required('Este campo é obrigatório').email('Insira um email válido.'),
  password: yup.string().required('Este campo é obrigatório')
})

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: schema
})
const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  await login(values)
  if (loggedIn) {
    router.push({ name: 'Home' })
  }
})
</script>

<template>
  <div class="form-container">
    <div class="banner">
      <img
        src="../images/login.png"
        alt="Desenho de duas pessoas mexendo em seus dispositivos apoiadas na imagem de um celular gigante na tela de login"
      />
    </div>
    <form @submit="onSubmit">
      <h3>Entrar no MagicDocs</h3>
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
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <buttonPrimary label="Entrar" style="width: 100%" type="submit"></buttonPrimary>
        <buttonPrimary
          outlined
          label="Cadastre-se gratuitamente"
          style="width: 100%"
          @click="emits('toggle')"
        ></buttonPrimary>
      </div>
    </form>
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

form {
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
