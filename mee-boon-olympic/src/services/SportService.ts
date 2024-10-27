import axios from "axios";
import type { SportDetail } from "@/types";
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export default {
    getSports() {
        return apiClient.get('/sports')
    },
    saveSports(sports: SportDetail) {
      return apiClient.post('/sports', sports)
    }
}