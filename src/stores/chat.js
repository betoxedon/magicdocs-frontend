import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiAuth from '../api/api.js'

export const useChatStore = defineStore('chat', () => {
  async function createMessage(payload = null) {
    return apiAuth.api.post(`/messages/`, payload)
  }

  async function requestPrompt(payload = null) {
    await apiAuth.api
      .post(`/messages/`, { content: payload, type: 'prompt' })
      .then((res) => {
        promptResponse.value = res.data.response
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function requestDocument(payload = null) {
    await apiAuth.api
      .post(`/messages/`, { content: payload, type: 'document' })
      .then((res) => {
        promptResponse.value = res.data.response
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function getListMessages(query = null) {
    await apiAuth.api
      .get(`/messages/${query ? '?q=' + query : ''}`)
      .then((res) => {
        listMessages.value = res.data.results
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return {
    createMessage,
    getListMessages,
    requestPrompt,
    requestDocument
  }
})
