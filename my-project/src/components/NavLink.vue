<template>
  <router-link :to="to" class="rounded-md px-3 py-2 text-sm font-medium"
    :class="[isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
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
