// stores/countryStore.ts
import { defineStore } from 'pinia';
import EventService from '@/services/EventService';
import { ref, computed } from 'vue';
import { type Country } from '@/types';

export const useCountryStore = defineStore('country', () => {
  const countries = ref<Country[]>([]);
  const visibleCountryIds = ref<Set<number>>(new Set());
  const currentPage = ref(1);
  const countriesPerPage = ref(5);

  // Fetch the countries from the API
  const fetchCountries = async () => {
    const response = await EventService.getEvent();
    countries.value = response.data;
  };

  // Computed property for the total number of pages
  const totalPages = computed(() => {
    return Math.ceil(countries.value.length / countriesPerPage.value);
  });

  // Computed property for the countries to display on the current page
  const paginatedCountries = computed(() => {
    const start = (currentPage.value - 1) * countriesPerPage.value;
    const end = start + countriesPerPage.value;
    return countries.value.slice(start, end);
  });

  // Toggle the visibility of a country's details
  const toggleDetails = (id: number) => {
    if (visibleCountryIds.value.has(id)) {
      visibleCountryIds.value.delete(id);
    } else {
      visibleCountryIds.value.add(id);
    }
  };

  // Handle page change
  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  // Handle countries per page input with validation
  const updateCountriesPerPage = (value: number) => {
    if (value < 1) {
      countriesPerPage.value = 1;
    } else if (value > 15) {
      countriesPerPage.value = 15;
    } else {
      countriesPerPage.value = value;
    }
    currentPage.value = 1; // Reset to the first page
  };

  return {
    countries,
    visibleCountryIds,
    currentPage,
    countriesPerPage,
    fetchCountries,
    totalPages,
    paginatedCountries,
    toggleDetails,
    changePage,
    updateCountriesPerPage,
  };
});
