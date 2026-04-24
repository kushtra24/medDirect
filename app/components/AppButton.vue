<template>
  <button
    class="bg-secondary text-on-secondary px-8 py-4 rounded-xl font-button text-button hover:bg-secondary/90 transition-all active:scale-95 shadow-md w-full"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
