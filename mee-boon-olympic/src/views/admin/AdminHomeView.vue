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

            <!-- Title and Controls -->
            <div class="flex justify-between items-center mb-16">
                <h1 class="text-2xl font-semibold text-gray-800">COUNTRY</h1>
                <div class="flex items-center gap-8">
                    <!-- Search -->
                    <div class="relative">
                        <input type="text" placeholder="Search"
                            class="w-[360px] pl-6 pr-12 py-3 text-sm border rounded-full focus:outline-none focus:ring-1 focus:ring-blue-200 bg-white shadow-sm">
                        <button class="absolute right-5 top-1/2 transform -translate-y-1/2">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                    <RouterLink to="/admin/add-country">
                        <button
                            class="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clip-rule="evenodd" />
                            </svg>
                            ADD NEW COUNTRY
                        </button>

                    </RouterLink>

                </div>
            </div>

            <!-- Table -->
            <div class="bg-white rounded-3xl shadow-sm overflow-hidden">
                <table class="w-full table-fixed">
                    <thead>
                        <tr class="bg-[#F3F6FF]">
                            <th
                                class="px-10 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[8%]">
                                ID</th>
                            <th
                                class="px-10 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[30%]">
                                NAME</th>
                            <th
                                class="px-10 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[12%]">
                                MEDALS</th>
                            <th
                                class="px-10 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[12%]">
                                GOAL</th>
                            <th
                                class="px-10 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[12%]">
                                SILVER</th>
                            <th
                                class="px-10 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[12%]">
                                BRONZE</th>
                            <th
                                class="px-10 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[14%]">
                                EDIT</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="(country, index) in countries" :key="index"
                            class="hover:bg-[#F8FAFF] transition-colors">
                            <td class="px-10 py-6 text-sm text-gray-600">{{ country.id }}</td>
                            <td class="px-10 py-6 text-sm text-gray-600">{{ country.name }}</td>
                            <td class="px-10 py-6 text-sm text-gray-600">{{ country.medals }}</td>
                            <td class="px-10 py-6 text-sm text-gray-600">{{ country.goal }}</td>
                            <td class="px-10 py-6 text-sm text-gray-600">{{ country.silver }}</td>
                            <td class="px-10 py-6 text-sm text-gray-600">{{ country.bronze }}</td>
                            <td class="px-5 ">
                                <RouterLink to="/admin/edit-country">
                                    <button
                                        class="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                                        EDIT
                                    </button>
                                </RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OlympicAdmin',
    data() {
        return {
            countries: [
                {
                    id: 1,
                    name: 'United state of America',
                    medals: 126,
                    goal: 40,
                    silver: 44,
                    bronze: 42
                },
                {
                    id: 1,
                    name: 'United state of America',
                    medals: 126,
                    goal: 40,
                    silver: 44,
                    bronze: 42
                }
            ]
        }
    }
}
</script>