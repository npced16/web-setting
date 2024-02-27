<template>
  <Teleport to='#modal'>
    <div class="modal-content">
      <button class="modal-mask" @click="closeModal"></button>
      <div class="modal-box  p-5">
        <component :is="getCompoent" :data="props.data" @close-modal="closeModal"></component>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits, computed, onMounted, onUnmounted } from 'vue'
import settingSpaceModal from '@modal/modalItem/settingSpaceModal.vue';
import paringListModal from '@modal/modalItem/paringListModal.vue';
import settingRoomModal from './modalItem/settingRoomModal.vue';
import settingAccountModal from '@modal/modalItem/settingAccountModal.vue'
const props = defineProps(['modalName', 'data'])
const emit = defineEmits(['closeModal'])
const getCompoent = computed(() => {
  switch (props.modalName) {
    case 'settingSpace':
      return settingSpaceModal
    case 'paringList':
      return paringListModal
    case 'settingRoomModal':
      return settingRoomModal
    case 'settingAccountModal':
      return settingAccountModal
  }
})
function closeModal() {
  emit('closeModal')
}

const closeOnEscape = (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));

onUnmounted(() => {
  document.removeEventListener('keydown', closeOnEscape);
  document.body.style.overflow = null;
});



</script>

<style   scoped>
.modal-box {
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
