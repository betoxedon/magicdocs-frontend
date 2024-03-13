<script setup>
import {} from 'vee-validate'
import { ref } from 'vue'
import TranstionComponent from '../components/TransitionComponent.vue'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'

const login = ref(true)
function handleLogin() {
  login.value = !login.value
}
</script>

<template>
  <div>
    <TranstionComponent>
      <div v-if="login">
        <LoginForm @toggle="handleLogin"></LoginForm>
      </div>
      <div v-else><RegisterForm @toggle="handleLogin" /></div>
    </TranstionComponent>
  </div>
</template>

<style scoped></style>
