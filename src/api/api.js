import axios from 'axios'
import { useToast } from 'vue-toastification'
const api = axios.create()
const apiRefresh = axios.create()
const toast = useToast()

api.interceptors.request.use(async (config) => {
  if (parseInt(sessionStorage.getItem('expiration')) < Date.now()) {
    await refresh()
  }
  const access = sessionStorage.getItem('access')
  config.baseURL = `/api`
  config.headers.Authorization = access ? `Bearer ${access}` : ''
  return config
})

const login = async (payload) => {
  return await api
    .post('/token/', payload)
    .then((res) => {
      sessionStorage.setItem('access', res.data.access)
      sessionStorage.setItem('refresh', res.data.refresh)
      sessionStorage.setItem('expiration', Date.now() + 4 * 60 * 1000)
      return res
    })
    .catch((err) => {
      toast.error(err.response.data['detail'])
      throw err
    })
}

const refresh = async () => {
  return await apiRefresh
    .post('/api/token/refresh/', { refresh: sessionStorage.getItem('refresh') })
    .then((res) => {
      sessionStorage.setItem('access', res.data.access)
      sessionStorage.setItem('expiration', Date.now() + 4 * 60 * 1000)
      return res.data.access
    })
    .catch((err) => {
      return err
    })
}

export default {
  login: login,
  api: api
}
