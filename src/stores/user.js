import { defineStore } from 'pinia'
import apiAuth from '../api/api.js'
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
const toast = useToast()
export const useUserStore = defineStore('user', () => {
  const user = ref({})
  const loggedIn = ref(false)
  const token = ref('')

  async function login(payload) {
    let response = await apiAuth.login(payload)
    if (response.status) {
      user.value = getUserData()
      return true
    }
    return false
  }

  function getUser() {
    return user.value
  }

  function getLoggedStatus() {
    return loggedIn.value
  }
  async function getUserData() {
    user.value = await apiAuth.api.get('/users/').then((res) => {
      sessionStorage.setItem('user', JSON.stringify(res.data.results[0]))
      loggedIn.value = true
      user.value = res.data.results[0]
      return res.data.results[0]
    })
    return user.value
  }

  function onload() {
    try {
      user.value = JSON.parse(sessionStorage.getItem('user'))
    } catch (error) {
      console.log(error)
    }
  }

  function logout() {
    user.value = null
    loggedIn.value = false
    sessionStorage.removeItem('refresh')
    sessionStorage.removeItem('expiration')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('access')
  }

  async function register(payload) {
    const register = axios.create()
    register.interceptors.request.use(async (config) => {
      config.baseURL = `/api`
      return config
    })
    try {
      let res = await register.post('/users/', payload)
      return res
    } catch (error) {
      toast.warning(Object.values(error.response.data)[0][0])
      throw error
    }
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

  async function updateUser(payload) {
    let headers = {
      'Content-Type': 'multipart/form-data'
    }
    try {
      const request = await apiAuth.api.patch('/users/' + user.value.id + '/', payload, { headers })
      if (request.status === 200) {
        getUserData()
        toast.success('Perfil Atualizado com sucesso!')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return { login, user, onload, logout, register, getUserData, loggedIn, getUser, getLoggedStatus, updateUser }
})
