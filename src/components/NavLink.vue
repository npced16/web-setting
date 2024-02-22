<template>
  <router-link :to="to" class="rounded-md px-3 py-2  text-base  font-medium text-white w-full sm:w-full"
    :class="[isActive ? 'bg-[#8C8C8C] ' : ' hover:bg-[#6C6C6C]']">
    <slot></slot>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const props = defineProps(['to', 'path', 'id']);
const route = useRoute()
const isActive = computed(() => {
  const fullPath = route.fullPath.split('?')[0]; // 파라미터를 제외한 경로 부분만 추출
  return fullPath == '/' + props.to;
});

</script>

<style scoped></style>
