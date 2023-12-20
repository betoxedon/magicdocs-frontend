import { defineStore } from "pinia";
import {ref} from 'vue'
import apiAuth from "../api/api.js";

export const useChatStore = defineStore('chat', ()=>{
    const chatMessages = ref([])
    const loadingChat = ref(false)

    async function createMessage(payload = null){
        loadingChat.value = true
        await apiAuth.api.post(`/messages/`,{content: payload}).then((res)=>{
            loadingChat.value = false
            chatMessages.value.push({
                origin: 'bot',
                content: res.data.response
            }) 
        }).catch((err)=> {
            console.log(err)
        })
    }

    return { createMessage, chatMessages, loadingChat }
})