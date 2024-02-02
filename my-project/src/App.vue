
<template>
  <div class="flex flex-col h-screen">
    <TitleVue v-if="route.fullPath != '/login'" />
    <RouterView></RouterView>
  </div>
</template>
<script setup>
import TitleVue from '@/components/title.vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
router.replace('/login');

</script>
<style >
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;300;400;500;600;700;800;900&display=swap');

body {
  font-family: 'Noto Sans KR', sans-serif !important;
}
</style>