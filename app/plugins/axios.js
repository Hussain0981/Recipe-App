// /plugins/axios.ts
import axios from "axios"

export default defineNuxtPlugin(() => {
  const api = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  })

  return {
    provide: {
      axios: api,
    },
  }
})
