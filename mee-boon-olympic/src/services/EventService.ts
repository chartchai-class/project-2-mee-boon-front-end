import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/SammyEiei/mee-boon-server',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  // getEvents() {
  //   return apiClient.get('/events')
  getEvents(perPage: number, page: number) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
  },

  getEvent(id: number) {
    return apiClient.get(`/events/${id}`)
  }
}
