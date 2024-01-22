import { defineStore } from "pinia";
import apiAuth from '../api/api.js'
import {ref} from 'vue'
import { useToast } from "vue-toastification";
import axios from "axios";

const toast = useToast()

export const useUserStore = defineStore('user', ()=>{
    const token = ref(null)
    const user = ref(null)

    async function login(email, password){
        token.value = await apiAuth.login({"email":email, "password":password})
        console.log(token.value)
        if (token.value != null) {
            user.value = getUserData()
            return true
        }
        return false
    }

    
    async function getUserData(){
        user.value = await apiAuth.api.get('/users/').then((res)=>{
            sessionStorage.setItem('user', JSON.stringify(res.data.results[0]))
            return res.data.results[0]
        })
    }

    function onload() {
        try {
           user.value = JSON.parse(sessionStorage.getItem('user'))
        } catch (error) {
            console.log(error)
        }
    }

    function logout(){
        user.value = null
        sessionStorage.removeItem("refresh");
        sessionStorage.removeItem("expiration");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("access");
    }

    async function register(payload){
        const register = axios.create()
        register.interceptors.request.use(async config => {
            config.baseURL = `/api`
            return config
        })
        let res = await register.post('/users/', payload)
        // .then((res)=>{
        //     console.log(res)
        //     if (res.status===201){
        //         toast.success("Usuário criado com sucesso!")
        //         return true
        //     }
        // }).catch((err)=>{
        //     toast.error(Object.values(err.response.data)[0][0])
        //     return false
        // })
        return res
    }

    return { login, user, onload, logout, register, getUserData }
})