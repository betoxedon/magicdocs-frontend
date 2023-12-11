<template>
    <div style="width: 100%; box-sizing: border-box; padding: 1rem; display: flex; align-items: center;">
        <form>
            <TitleComponent title="Entre com sua conta"></TitleComponent>
            <inputMd v-model="email" label="Email" placeholder="email@email.com" id="login_email" icon="at"></inputMd>
            <inputMd v-model="password" label="Senha" type="password"  placeholder="Digite sua senha" id="login_senha" icon="lock">
            </inputMd>
            <buttonPrimary width="100%" height="4rem" label="Entrar" @click="handleLogin"></buttonPrimary>
            <div class="separador"></div>
            <TitleComponent title="Novo por aqui?"></TitleComponent>
            <buttonPrimary width="100%" height="4rem" label="Cadastre-se" @click="router.push({name: 'Register'})"></buttonPrimary>
        </form>
    </div>
    <img src="../../images/login.png" alt="">
</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user';
import inputMd from './form/inputMd.vue';
import buttonPrimary from './form/buttonPrimary.vue';
import TitleComponent from './TitleComponent.vue';
import { useToast } from 'vue-toastification';
import { storeToRefs } from 'pinia';
const { login } = useUserStore()
const { user } = storeToRefs(useUserStore())
const email = ref('')
const password = ref('')
const router = useRouter()
const toast = useToast()

async function handleLogin() {
    let res = await login(email.value, password.value)!=false
    if (res) {
        router.push({ name: 'Home' })
    } else {
        toast.warning('Usuário e/ou senha incorretos')
    }
}
</script>

<style scoped> 
img {
    height: 100%;
    width: 50%;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin: 1rem 2rem;
    gap: 1rem;
}
@media screen and (min-width: 1024px) {}

@media screen and (min-width: 768px) and (max-width: 1023px) {}

@media screen and (max-width: 767px) {
    img {
        display: none;
    }
}
</style>