<template>
    <div class="flex min-h-screen bg-[#EAEFFF]">
      <!-- Sidebar -->
      <div class="hidden md:flex flex-col w-64 bg-gray-800 rounded-2xl m-4">
            <div class="flex flex-col flex-1 overflow-y-auto">
                <nav
                    class="flex flex-col flex-1 overflow-y-auto bg-gradient-to-b from-gray-700 to-blue-500 px-2 py-4 gap-10 rounded-2xl">
                    <div class="p-4 border-b border-slate-600">
                        <div class="flex items-center text-white text-xl font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Admin Dashboard
                        </div>
                    </div>
                    <div class="flex flex-col flex-1 gap-3">
                        <RouterLink to="/Admin">
                            <a href="#"
                                class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Country
                            </a>
                        </RouterLink>
                        <RouterLink to="/admin/admin-list">
                            <a href="#"
                                class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Admin List
                            </a>
                        </RouterLink>
                        <RouterLink to="/admin/user-list">
                            <a href="#"
                                class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Users List
                            </a>
                        </RouterLink>
                    </div>
                </nav>
            </div>
        </div>
  
      <!-- Main Content -->
      <div class="flex-1 p-8">
        
  
        <!-- Title -->
        <div class="mb-12">
          <h1 class="text-2xl font-semibold text-gray-800">Edit Country Information</h1>
        </div>
  
        <!-- Edit Form -->
        <div class="bg-white rounded-3xl shadow-sm p-8 max-w-5xl">
          <form @submit.prevent="saveChanges" class="space-y-8">
            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-6">
                <!-- Country Name & Flag -->
                <div class="flex items-center space-x-4">
                  <img :src="formData.flagUrl" alt="Country flag" class="w-12 h-12 rounded-lg object-cover">
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-600 mb-2">Country Name</label>
                    <input 
                      type="text" 
                      v-model="formData.name"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      readonly
                    />
                  </div>
                </div>
  
                <!-- NOC Code -->
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-2">NOC Code</label>
                  <input 
                    type="text" 
                    v-model="formData.nocCode"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    readonly
                  />
                </div>
  
                <!-- Basic Info -->
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-2">Basic Information</label>
                  <textarea 
                    v-model="formData.basicInfo"
                    rows="3"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  ></textarea>
                </div>
              </div>
  
              <!-- Medals Information -->
              <div class="bg-gray-50 p-6 rounded-xl space-y-4">
                <h3 class="font-medium text-gray-700 mb-4">Medals Count</h3>
                
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">
                      Gold 🥇
                    </label>
                    <input 
                      type="number" 
                      v-model="formData.medals[0].goldCount"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
  
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">
                      Silver 🥈
                    </label>
                    <input 
                      type="number" 
                      v-model="formData.medals[0].silverCount"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
  
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">
                      Bronze 🥉
                    </label>
                    <input 
                      type="number" 
                      v-model="formData.medals[0].bronzeCount"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Sports Section -->
            <div>
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-medium text-gray-700">Sports & Rankings</h3>
                <button 
                  type="button"
                  @click="addSport"
                  class="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  + Add Sport
                </button>
              </div>
              
              <div class="space-y-4">
                <div v-for="(sport, index) in formData.ownSports" :key="sport.id" 
                     class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div class="w-8 text-xl">{{ getMedalEmoji(sport.rankPosition) }}</div>
                  
                  <!-- Sport Dropdown -->
                  <div class="flex-1">
                    <select 
                      v-model="sport.sportName"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    >
                      <option v-for="sportOption in availableSports" 
                              :key="sportOption" 
                              :value="sportOption">
                        {{ sportOption }}
                      </option>
                    </select>
                  </div>
  
                  <!-- Ranking Dropdown -->
                  <div class="w-32">
                    <select 
                      v-model="sport.rankPosition"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    >
                      <option value="1">1st 🥇</option>
                      <option value="2">2nd 🥈</option>
                      <option value="3">3rd 🥉</option>
                    </select>
                  </div>
  
                  <!-- Remove Button -->
                  <button 
                    type="button"
                    @click="removeSport(index)"
                    class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
  
            <!-- Action Buttons -->
            <div class="flex justify-end gap-4 pt-6">
              <button 
                type="button"
                @click="$router.back()"
                class="px-6 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                class="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditCountry',
    data() {
      return {
        formData: {
          id: 1,
          name: "United States",
          nocCode: "USA",
          flagUrl: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg",
          basicInfo: "The United States of America is a federal republic consisting of 50 states.",
          ownSports: [
            {
              id: 1,
              sportName: "Athletics",
              rankPosition: 1,
              medalsUrl: "🥇"
            }
          ],
          medals: [{ 
            id: 1, 
            goldCount: 5, 
            silverCount: 3, 
            bronzeCount: 2 
          }]
        },
        availableSports: [
          "Athletics",
          "Swimming",
          "Shooting",
          "Basketball",
          "Golf",
          "Wrestling",
          "Track Cycling",
          "Sport Climbing",
          "Surfing",
          "Boxing",
          "Weightlifting",
          "Diving",
          "Table Tennis",
          "Badminton",
          "Gymnastics",
          "Judo",
          "Skateboarding",
          "Karate",
          "Baseball",
          "Football",
          "Rugby Sevens",
          "Sailing",
          "Rowing",
          "Archery",
          "Taekwondo",
          "Field Hockey"
        ]
      }
    },
    methods: {
      getMedalEmoji(position) {
        const emojis = {
          1: "🥇",
          2: "🥈",
          3: "🥉"
        }
        return emojis[position] || "🏅"
      },
      addSport() {
        const newId = Math.max(...this.formData.ownSports.map(s => s.id)) + 1
        this.formData.ownSports.push({
          id: newId,
          sportName: this.availableSports[0],
          rankPosition: 3,
          medalsUrl: "🥉"
        })
      },
      removeSport(index) {
        this.formData.ownSports.splice(index, 1)
      },
      saveChanges() {
        console.log('Saving changes:', this.formData)
        // TODO: Implement API call to save changes
        this.$router.push('/countries')
      }
    }
  }
  </script>