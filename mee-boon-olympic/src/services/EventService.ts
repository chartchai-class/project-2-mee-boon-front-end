import type { Country } from "@/types";
import apiClient from "./AxiosCilent";
import type { AxiosResponse } from "axios";
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
  saveCountries(country: Country ) {
    return apiClient.post('/countries', country);
  // },
  // getCountryKeyword(keyword: String, countriesName: String):
  // Promise<AxiosResponse<
},getCountriesByKeyword(
  keyword: string,
  perPage: number,
  page: number
): Promise<AxiosResponse<Country[]>> {
  return apiClient.get(`/countries?name=${keyword}&_limit=${perPage}&_page=${page}`);
}

}

