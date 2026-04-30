<template>
  <section class="relative h-64 w-full">
    <img
      :alt="alt"
      :src="image"
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    <button
      class="absolute top-md left-md bg-white/90 backdrop-blur-sm p-sm rounded-full text-secondary shadow-sm"
      @click="$router.back()"
    >
      <FontAwesomeIcon icon="arrow-left" />
    </button>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  image: string
  alt: string
}>()
</script>
