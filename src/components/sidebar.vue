<template>
  <!--Sidebar with Dimmer -->
  <div class="fixed inset-0 flex z-40">
    <!-- Sidebar -->
    <div class="absolute flex top-0 h-screen z-20" :class="[right ? 'right-0 flex-row' : 'left-0 flex-row-reverse']">
      <!-- Drawer -->
      <button @click.prevent="toggle()"
        class="w-16 h-64 p-1 my-auto rounded text-white bg-[#8B8B8B] text-center focus:outline-none hover:bg-gray-500 transition-color duration-300 hidden">
        <span :class="[right ? '-rotate-90' : 'rotate-90']" class="block  transform origin-center font-bold">
          Drawer
        </span>
      </button>
      <!-- Sidebar Content -->
      <div ref="content" class="transition-all duration-700 bg-white overflow-hidden flex items-center justify-center"
        :class="[open ? 'max-w-lg' : 'max-w-0']">
        <slot>
        </slot>
      </div>
    </div>

  </div>
  <!-- Page Content -->
</template>

<script>
export default {
  data() {
    return {
      open: false,
      dimmer: true,
      right: false
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.absolute:hover button {
  display: inline-block;
  /* Show the button when the parent div is hovered */
}
</style>
