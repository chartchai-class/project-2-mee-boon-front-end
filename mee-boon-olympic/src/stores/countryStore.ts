// // stores/countryStore.ts
// import { defineStore } from 'pinia';
// import EventService from '@/services/EventService';
// import { ref, computed } from 'vue';
// import { useRouter, useRoute } from 'vue-router';
// import { type Country, type Sport, type Detail } from '@/types';
//
// export const useCountryStore = defineStore('country', () => {
//   const countries = ref<Country[]>([]);
//   const sports = ref<Sport[]>([]);
//   const details = ref<Detail[]>([]);
//   const currentCountry = ref<Country | null>(null);
//
//   const currentPage = ref(1);
//   const countriesPerPage = ref(5);
//   const totalCountries = ref(0);
//
//   const router = useRouter();
//   const route = useRoute();
//
//   const fetchCountries = async () => {
//     try {
//       const response = await EventService.getEvent();
//       countries.value = response.data;
//       totalCountries.value = countries.value.length;
//     } catch (error) {
//       console.error('Error fetching countries:', error);
//       router.push({ name: 'network-error-view' });
//     }
//   };
//
//   const fetchCountryDetails = async (countryId: number) => {
//     try {
//       const response = await EventService.getCountry(countryId);
//       currentCountry.value = response.data;
//       // Assume details and sports are part of the country object
//       details.value = response.data.details;
//       sports.value = response.data.sports;
//     } catch (error) {
//       console.error('Error fetching country details:', error);
//     }
//   };
//
//   const totalPages = computed(() => {
//     return Math.ceil(totalCountries.value / countriesPerPage.value);
//   });
//
//   const paginatedCountries = computed(() => {
//     const start = (currentPage.value - 1) * countriesPerPage.value;
//     const end = start + countriesPerPage.value;
//     return countries.value.slice(start, end);
//   });
//
//   const changePage = (page: number) => {
//     if (page >= 1 && page <= totalPages.value) {
//       currentPage.value = page;
//       router.push({ query: { page: String(page), pageSize: String(countriesPerPage.value) } });
//     }
//   };
//
//   const updateCountriesPerPage = (value: number) => {
//     const pageSize = value < 1 ? 1 : value > 15 ? 15 : value;
//     countriesPerPage.value = pageSize;
//     currentPage.value = 1;
//     router.push({ query: { page: '1', pageSize: String(pageSize) } });
//   };
//
//   const syncWithRoute = () => {
//     const page = parseInt(route.query.page as string) || 1;
//     const pageSize = parseInt(route.query.pageSize as string) || 5;
//     countriesPerPage.value = pageSize;
//     currentPage.value = page;
//     fetchCountries();
//   };
//
//   return {
//     countries,
//     sports,
//     details,
//     currentCountry,
//     currentPage,
//     countriesPerPage,
//     totalCountries,
//     fetchCountries,
//     fetchCountryDetails,
//     totalPages,
//     paginatedCountries,
//     changePage,
//     updateCountriesPerPage,
//     syncWithRoute,
//   };
// });
// src/stores/countryStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import { type Country } from '@/types';

export const useCountryStore = defineStore('countryStore', {
  state: () => ({
    countries: [] as Country[],
    currentPage: 1,
    countriesPerPage: 10,
    totalPages: 1,
  }),
  actions: {
    async fetchCountries() {
      try {
        const response = await axios.get<Country[]>('http://localhost:8080/countries');
        this.countries = response.data;

        // คำนวณจำนวนเหรียญรวมสำหรับแต่ละประเทศ
        this.countries.forEach((country) => {
          if (country.medals && country.medals.length > 0) {
            const medal = country.medals[0];
            country.gold = medal.goldCount;
            country.silver = medal.silverCount;
            country.bronze = medal.bronzeCount;
            country.total = medal.goldCount + medal.silverCount + medal.bronzeCount;
          } else {
            country.gold = 0;
            country.silver = 0;
            country.bronze = 0;
            country.total = 0;
          }
        });

        // คำนวณจำนวนหน้าทั้งหมด
        this.updateTotalPages();
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    },
    updateTotalPages() {
      this.totalPages = Math.ceil(this.countries.length / this.countriesPerPage);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    },
    updateCountriesPerPage(perPage: number) {
      this.countriesPerPage = perPage;
      this.updateTotalPages();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    },
  },
  getters: {
    paginatedCountries: (state) => {
      const start = (state.currentPage - 1) * state.countriesPerPage;
      const end = start + state.countriesPerPage;
      return state.countries.slice(start, end);
    },
  },
});