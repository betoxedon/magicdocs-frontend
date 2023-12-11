import axios from "axios";

const api = axios.create()
const apiRefresh = axios.create()

api.interceptors.request.use(async config => {
    refresh()
    const access = sessionStorage.getItem('access')
    config.baseURL = `/api`
    config.headers.Authorization = access ? `Bearer ${access}` : ''
    return config
})
 
const login = async (payload) => {
    return await api
        .post('/token/', payload)
        .then(
            (res)=>{
                sessionStorage.setItem('access', res.data.access) 
                sessionStorage.setItem('refresh', res.data.refresh) 
                sessionStorage.setItem('expiration', Date.now() + 4*60*1000) 
                return res.data.access
            }
        ).catch((err)=>{
            console.log(err)
        })
}


const refresh = async () => {
    return await apiRefresh
    .post('/token/refresh/', {"refresh": sessionStorage.getItem('refresh')})
    .then(
        (res)=>{
            sessionStorage.setItem('access', res.data.access) 
            sessionStorage.setItem('expiration', Date.now() + 4*60*1000) 
            return res.data.access
        }
    ).catch((err)=>{
        return err
    })
}

export default {
    login: login,
    api: api
}
