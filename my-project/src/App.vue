<script setup>
import TitleVue from '@/components/title.vue';
import ThePageSettingView from '@/components/ThePageSettingView.vue'
import loginView from '@/components/loginView.vue'
import TheAccountManagementView from './components/TheAccountManagementView.vue';
</script>
<template>
  <!-- 
  <div style="height: 100vh;">
    <loginView />
  </div>
   -->
  <div class="flex flex-col h-screen">
    <TitleVue />
    <TheAccountManagementView />

    <!-- <TableVue /> -->
    <!-- <ThePageSettingView style="height: 93%;" /> -->
  </div>
</template>

<style >
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;300;400;500;600;700;800;900&display=swap');

body {
  font-family: 'Noto Sans KR', sans-serif !important;
}
</style>