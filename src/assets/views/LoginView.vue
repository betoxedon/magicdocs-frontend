<script setup>
import { ref } from 'vue';
import {useRouter} from 'vue-router'
import inputMd from '../components/form/inputMd.vue';
import buttonMd from '../components/form/buttonMd.vue';
import passwordInput from '../components/form/passwordInput.vue'
import { useUserStore } from '../../stores/user';
const {login} = useUserStore()
const email = ref('')
const password = ref('')
const router = useRouter()

function handleLogin(){
    if (login(email.value, password.value)){
        router.push({name: 'Home'})
    } else {
        console.log('Seu login e senhas estão inválidos')
    }
}

</script>

<template>
    <form class="login-form">
        <h3 style="font-size: 1.8rem;">MagicDocs</h3>
        <span style="font-size: 1rem; font-weight: 300; ">Seja bem vindo(a)!</span>
        <inputMd v-model="email" label="Email" placeholder="email@email.com" id="login_email" icon="at"></inputMd>
        <passwordInput v-model="password" label="Senha" placeholder="Digite sua senha" id="login_senha" icon="lock"></passwordInput>
        <buttonMd label="Entrar" @click="handleLogin"></buttonMd>
        <div class="separador"></div>
        <h3 style="font-size: 1.8rem; margin-top: 2rem;">Novo por aqui?</h3>
        <buttonMd label="Cadastrar" @click="router.push({name: 'Register'})"></buttonMd>
    </form>
</template>

<style scoped>

    .login-form {
        height: fit-content;
        width: 40rem;
        padding: 3rem 3rem;
        box-sizing: border-box;
        border-radius: 10px;
        background-color: var(--color-secondary);
        font-family: 'Rubik';
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .login-form h3 {
        margin-bottom: 2rem;
    }
    .login-form span {
        margin: 1.5rem 0;
    }

    .separador {
        width: 100%;
        height: 1px;
        background-color: var(--color-neutral);
    }
@media screen and (max-width: 760px) {
    .login-form {
        width: fit-content;
    }
    
}
</style>