<template>
  <div>
    <nav class="bg-[#678FFF]  ">
      <div class=" max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"> -->
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <router-link to="settingWard" class="
               rounded-md px-3 py-2 text-sm font-medium" :class="[(route.fullPath == '/settingWard') ?
                 'bg-gray-900  text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
                  병실 관리 </router-link>
                <router-link to="settingAccount" class=" rounded-md px-3 py-2 text-sm font-medium" :class="[(route.fullPath == '/settingAccount') ?
                  'bg-gray-900  text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
                  계정 관리</router-link>
                <router-link to="login"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  로그인 페이지</router-link>
              </div>
            </div>
          </div>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 text-white">
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();

</script>

<style lang="scss" scoped></style>