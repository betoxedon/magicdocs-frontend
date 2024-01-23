<script setup>
import buttonPrimary from './form/buttonPrimary.vue';
import inputMd from '../components/form/inputMd.vue';
import passwordHints from '../components/form/PasswordHints.vue'
import TitleComponent from './TitleComponent.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';
import { useForm } from 'vee-validate';
import * as yup from 'yup'
const {register} = useUserStore()

const {errors, defineField, handleSubmit } = useForm({
    validationSchema: yup.object({
        email: yup.string().email().required("Informe seu email."),
        first_name: yup.string().required("Informe seu nome.").min(3, "Mínimo 3 caracteres"),
        last_name: yup.string().required("Informe seu sobrenome.").min(3, "Mínimo 3 caracteres"),
        phone_number: yup.string().required("Informe seu telefone.").min(11, "Verifique o telefone").max(11, "Verifique o telefone"),
        password: yup.string().min(8, "A senha deve ter ao menos 8 caracteres").required("Insira sua senha."),
        passwordRepeat: yup.string().oneOf([yup.ref("password"), null], 'As senhas não coincidem.')
    })
})

const [email] = defineField('email', {validateOnModelUpdate: true})
const [first_name] = defineField('first_name', {validateOnModelUpdate: true})
const [last_name] = defineField('last_name', {validateOnModelUpdate: true})
const [password] = defineField('password', {validateOnModelUpdate: true})
const [passwordRepeat] = defineField('passwordRepeat', {validateOnModelUpdate: true})
const [phone_number] = defineField('phone_number', {validateOnModelUpdate: true})

const router = useRouter()

const onSubmit = handleSubmit(values=>{
    if (register(values)){
        router.push({name: 'Login'})
    }
    })
</script>

<template>
    <img src="../../images/register.png" alt="">
    <form class="register-form" novalidate @submit.prevent="onSubmit">
        <TitleComponent title="Cadastro"></TitleComponent>
        <div class="row">
            <inputMd class="inline-input"  v-model="first_name" label="Nome" placeholder="Ex: José" id="register_first_name">
                <template v-slot:bottom-slots>
                    <passwordHints v-if="errors.first_name"  :message=" errors.first_name "></passwordHints>
                </template>
            </inputMd>
            <inputMd class="inline-input"  v-model="last_name" label="Sobrenome" placeholder="Ex: Melo" id="register_last_name">
                <template v-slot:bottom-slots>
                    <passwordHints v-if="errors.last_name" :message=" errors.last_name "></passwordHints>
                </template>
            </inputMd>
        </div>
        <div class="row">
            <inputMd  v-model="email" class="inline-input" label="Email" placeholder="email@email.com" id="register_email" icon="at">
                <template v-slot:bottom-slots>
                    <passwordHints v-if="errors.email" :message=" errors.email "></passwordHints>
                </template>
            </inputMd>
            <inputMd  v-model="phone_number" class="inline-input" label="Telefone" placeholder="81999999999" id="register_phone_number" icon="phone">
                <template v-slot:bottom-slots>
                    <passwordHints v-if="errors.phone_number" :message=" errors.phone_number "></passwordHints>
                </template>
            </inputMd>
        </div>
        <div class="row">
            <inputMd class="inline-input" v-model="password" label="Senha" placeholder="Digite sua senha" id="register_senha" icon="lock" type="password">
                <template v-slot:bottom-slots>
                    <passwordHints v-if="errors.password" :message=" errors.password "></passwordHints>
                </template>
            </inputMd>
            <inputMd class="inline-input"  v-model="passwordRepeat" label="Repita a senha" placeholder="Digite sua senha" id="register_senha_repeat" icon="lock" type="password"> 
                <template v-slot:bottom-slots>
                    <passwordHints v-if="errors.passwordRepeat" :message="errors.passwordRepeat"></passwordHints>
                </template>
            </inputMd>
        </div>
        <buttonPrimary width="100%" height="4rem" label="Cadastrar" type="submit"></buttonPrimary>
        <TitleComponent title="Já é cadastrado?"></TitleComponent>
        <buttonPrimary width="100%" height="4rem" label="Fazer Login" @click="router.push({name: 'Login'})"></buttonPrimary>
    </form>
</template>


<style scoped>
img {
    height: 100%;
    width: 50%;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 3rem 2rem;
    height: fit-content;
}

.row {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 2rem;
}

.inline-input {
    width: 47.5%;
}
@media screen and (min-width: 1024px) {}

@media screen and (min-width: 768px) and (max-width: 1023px) {}

@media screen and (max-width: 767px) {
    img {
        display: none;
    }
    .row {
        flex-direction: column;
        height: fit-content;
    }
    .inline-input {
        width: 100%;
    }
}
</style>