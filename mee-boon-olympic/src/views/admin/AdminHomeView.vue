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
                        <RouterLink to="/admin/add-country">
                            <a href="#"
                                class="flex items-center px-3 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none"
                                    stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Add New Country
                            </a>
                        </RouterLink>
                    </div>
                </nav>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 p-8">
            <div class="medalHome">
                <MedalTable />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MedalTable from '@/views/OlympicMedalTable.vue'
</script>
