<script setup>
import TitleVue from '@/components/title.vue';
import HelloWorld from '@/components/HelloWorld.vue'
import TableVue from '@/components/table.vue';
import loginView from '@/components/loginView.vue'
</script>
<template>
  <!-- <div style="height: 100vh;">
    <loginView />
  </div> -->
  <!-- <TitleVue /> -->
  <!-- <TableVue /> -->
  <HelloWorld />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
