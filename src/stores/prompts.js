import { defineStore } from 'pinia'
import apiAuth from '../api/api.js'

export const usePromptStore = defineStore('prompt', () => {
  async function getPrompts() {
    let request = await apiAuth.api.get(`/prompts/`)
    return request
  }

  return { getPrompts }
})
