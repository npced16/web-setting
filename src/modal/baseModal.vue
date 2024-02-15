<template>
  <Teleport to='#modal'>
    <div class="modal-content">
      <button class="modal-mask" @click="closeModal"></button>
      <div class="container  p-5">
        <slot> </slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['closeModal'])
function closeModal() {
  emit('closeModal')
}
</script>

<style   scoped>
.container {
  z-index: 999;
  background-color: #fff;
  border-radius: 16px;

  box-shadow: 0 20px 60px -2px rgb(27 33 58 / 40%);
}

.modal-mask {
  position: fixed;
  z-index: 998;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-content {
  position: fixed;
  z-index: 900;
  top: 0%;
  left: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
