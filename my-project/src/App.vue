<script setup>
import TitleVue from '@/components/title.vue';
import ThePageSettingView from '@/components/ThePageSettingView.vue'
import loginView from '@/components/loginView.vue'
</script>
<template>
  <!-- <div style="height: 100vh;">
    <loginView />
  </div> -->
  <div class="flex flex-col h-screen">
    <TitleVue />
    <!-- <TableVue /> -->
    <ThePageSettingView style="height: 93%;" />
  </div>
</template>

<style scoped></style>
