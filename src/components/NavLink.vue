<template>
  <router-link :to="to" class="rounded-md px-3 py-2 text-sm font-medium text-white"
    :class="[isActive ? 'bg-[#8C8C8C] ' : ' hover:bg-[#6C6C6C]']">
    <slot></slot>

  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const props = defineProps(['to', 'path']);
const route = useRoute()
const isActive = computed(() => { return route.fullPath == '/' + props.to })

</script>

<style scoped></style>
