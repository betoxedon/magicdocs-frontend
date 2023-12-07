<script setup>
import buttonMd from '../components/form/buttonMd.vue';
import passwordInput from '../components/form/passwordInput.vue';
import inputMd from '../components/form/inputMd.vue';
import passwordHints from '../components/form/PasswordHints.vue'
import { ref } from 'vue';

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const password = ref('')
const passwordRepeat = ref('')
const passwordCheck = ref({
    repeatValid: false,
    lowerCaseLetterValid: false,
    upperCaseLetterValid: false,
    specialCharValid: false,
    numberValid: false,
    lengthvalid: false
})
const passwordValid = ref(false)
function validatePassword(){
    passwordValid.value = true
    if (/[0-9]/.test(password.value)) {
        passwordCheck.value.numberValid = true
    } else {
        passwordValid.value = false
        passwordCheck.value.numberValid = false
    }

    if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password.value)){
        passwordCheck.value.specialCharValid = true
    } else {
        passwordValid.value = false
        passwordCheck.value.specialCharValid = false
    }

    if (/[a-z]/.test(password.value)){
        passwordCheck.value.lowerCaseLetterValid = true
    } else {
        passwordValid.value = false
        passwordCheck.value.lowerCaseLetterValid = false
    }

    if (/[A-Z]/.test(password.value)){
        passwordCheck.value.upperCaseLetterValid = true
    } else {
        passwordValid.value = false
        passwordCheck.value.upperCaseLetterValid = false
    }

    if (password.value.length>=8){
        passwordCheck.value.lengthvalid = true
    } else {
        passwordValid.value = false
        passwordCheck.value.lengthvalid = false
    }
    return passwordValid
}

function validateEqual(){
    if (password.value === passwordRepeat.value) {
        passwordCheck.value.repeatValid = true
    }
}

function onSubmit(){
    console.log('teste')
}

</script>



<template>
    <form class="register-form" novalidate @submit.prevent="onSubmit">
        <h3 style="font-size: 1.8rem;">Cadastro de usuário</h3>
        <inputMd v-model="first_name" label="Nome" placeholder="Ex: José" id="login_first_name"></inputMd>
        <inputMd v-model="last_name" label="Sobrenome" placeholder="Ex: Melo" id="login_last_name" icon="at"></inputMd>
        <inputMd v-model="email" label="Email" placeholder="email@email.com" id="login_email" icon="at"></inputMd>
        <passwordInput @check="validatePassword" v-model="password" label="Senha" placeholder="Digite sua senha" id="login_senha" icon="lock"></passwordInput>
        <passwordInput @check="validateEqual" v-model="passwordRepeat" label="Repita a senha" placeholder="Digite sua senha" id="login_senha_repeat" icon="lock"></passwordInput>
        <div v-if="password" class="password-hints">
            <passwordHints :valid="passwordCheck.lengthvalid" message="A senha deve ter ao menos 8 caracteres"></passwordHints>
            <passwordHints :valid="passwordCheck.numberValid" message="A senha deve possuir ao menos um número"></passwordHints>
            <passwordHints :valid="passwordCheck.specialCharValid" message="A senha deve possuir ao menos um caractere especial"></passwordHints>
            <passwordHints :valid="passwordCheck.lowerCaseLetterValid" message="A senha deve possuir ao menos um caractere minúsculo"></passwordHints>
            <passwordHints :valid="passwordCheck.upperCaseLetterValid" message="A senha deve possuir ao menos um caractere maiúsculo"></passwordHints>
            <passwordHints :valid="passwordCheck.repeatValid" message="As senhas devem ser iguais"></passwordHints>
        </div>
        <div class="separador"></div>
        <buttonMd label="Cadastrar" type="submit"></buttonMd>
    </form>
</template>


<style scoped>

    .password-hints {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        width: 100%;

    }
    .password-hints span {
        margin: .2rem !important;
    }
    .register-form {
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

    .register-form h3 {
        margin-bottom: 2rem;
    }
    .register-form span {
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