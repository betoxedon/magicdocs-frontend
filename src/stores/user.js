import { defineStore } from "pinia";
import Api from '../api/api.js'
import {ref} from 'vue'

const api = new Api()

export const useUserStore = defineStore('user', ()=>{
    const token = ref('')
    const refresh = ref('')
    const user = ref(true)

    async function login(email, password){
        let response = await api.login(email, password)
        if (response) {
            user.value = getUserData()
            return true
        }
        return false
    }

    function verifyToken(){
        let expiration = sessionStorage.getItem('expiration')
        if (expiration < Date.now()){
            token.value = api.refresh()
        }
    }

    function getUserData(){
        verifyToken()
        return "ok"
    }

    return { login, token, refresh, user }
})