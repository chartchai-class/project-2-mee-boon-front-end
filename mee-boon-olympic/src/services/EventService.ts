import type { Country } from '@/types';
import axios from 'axios'
// import apiClient from './AxiosClient';
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvent() {
    return apiClient.get('/countries');
  },
  getCountry(id: number) {
    return apiClient.get(`/countries/${id}`);
  },
  getCountries(perPage: number, page: number) {
    return apiClient.get(`/countries?_limit=${perPage}&_page=${page}`);
  },
  saveCountries(country: Country){
    return apiClient.post('/countries',country)
    .then(response => response.data)
      .catch(error => {
        console.error('Failed to create country:', error);
        if (error.response) {
          console.error('Response error:', error.response.data);
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      });
  }
}

