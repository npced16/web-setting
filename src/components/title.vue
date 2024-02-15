<template>
  <div>
    <nav class="bg-[#353535] ">
      <div class=" max-w-12xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=500"
                alt="Your Company">
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <NavLink to="settingPage">병동 등록</NavLink>
                <NavLink to="settingSpace">공간 등록</NavLink>
                <NavLink to="settingRoom">병동 관리</NavLink>
                <NavLink to="settingWard">병실 관리</NavLink>
                <NavLink to="settingAccount">계정 관리</NavLink>
                <NavLink to="">기기 등록</NavLink>
              </div>
            </div>
          </div>
          <div class=" absolute inset-y-0 right-0  items-end pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 text-white">
            <NavLink to="login">로그아웃</NavLink>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import NavLink from '@components/NavLink.vue';
// import { useRoute, useRouter } from 'vue-router';
</script>

<style  scoped></style>