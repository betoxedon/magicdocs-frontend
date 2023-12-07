import axios from "axios";

const api = axios.create()


class Api {
    constructor() {
        this.api = axios.create()
    }
    async login(email, password){
        let body = {
            "email":email, 
            "password":password
        }
        return await api.post('/api/token/', body)
        .then( res=> {
            if (res.status === 200){
                sessionStorage.setItem('expiration', Date.now() + 270000)
                sessionStorage.setItem('email', email)
                sessionStorage.setItem('refresh', res.data.refresh)
                this.api.interceptors.use(async config => {
                    config.headers.Authorization = `Bearer ${res.data.access}`
                    return config
                })
                return true
            }
            return false
        })
        .catch((err) => {
            return err
        })
    }

    async refresh(){
        let refreshToken = sessionStorage.getItem('refresh')
        let body = {
            "refresh": refreshToken
        }
        return await api.post('/api/token/refresh/', body)
        .then( res=> {
            if (res.status === 200){
                let token = res.data.access
                this.api.interceptors.use(async config => {
                    config.headers.Authorization = `Bearer ${token}`
                    return config
                })
            }
            return false
        })
        .catch((err) => {
            return err
        })
    }

    async getUser(){
        let body = {
            'email': sessionStorage.getItem('refresh')
        }
        return await api.post('/api/token/refresh/', body)
        .then( res=> {
            if (res.status === 200){
                let token = res.data.access
                sessionStorage.setItem('token', token)
                return token
            }
            return false
        })
        .catch((err) => {
            return err
        })
    }
}

export default Api