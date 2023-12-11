import axios from "axios";

const api = axios.create()

const auth = {
    username: 'api_user',
    password: 'N6V2AKsBa76!qHWARZi*Ha&wMbxSox'
  }

api.interceptors.request.use(async config => {
    config.baseURL = `/ai`
    config.headers.Authorization = 'Basic ' + btoa(auth.username + ':' + auth.password)
    return config
})

const pesquisarJurisprudencia = async (payload, prompt = "Vocé não é o ChatGPT, você é um assistente especializado em perguntas gerais.") => {

    let url = '/chabot_web_search'
    let body = {
        "busca": "duck",
        "conversation": [
          {}
        ],
        "language": "português brasileiro",
        "material_core": [
          "jusbrasil.com.br",
          "planalto.gov.br",
        //   "jus.br",
        //   "portal.tcu.gov.br",
        //   "corpus927.enfam.jus.br"
        ],
        "model": "standard",
        "prompt": prompt,
        "query": payload,
        "scalations": [
          {
            "resposta": "Para Falar com um atendente clique aqui...",
            "sentenca": "Quero falar com um atendente"
          },
          {
            "resposta": "Para Falar com um atendente clique aqui...",
            "sentenca": "Quero falar com um humano"
          },
          {
            "resposta": "O contato do setor do ISS é ...",
            "sentenca": "Qual o telefone para falar sobre o ISS?"
          }
        ],
        "sources": 2
      }
    return await api.post(url, body).then((res)=>{
        return res.data.response
    })
}

export default {
    jurisprudencia: pesquisarJurisprudencia,
    api: api
}
