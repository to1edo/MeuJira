import axios from "axios"


const entriesApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export default entriesApi
