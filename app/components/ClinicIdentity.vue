<template>
  <section class="px-lg relative">
    <!-- Overlapping Logo -->
    <div class="absolute -top-xl left-lg">
      <div class="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
        <img :alt="`${name} logo`" :src="logo" class="w-full h-full object-cover" />
      </div>
    </div>

    <div class="pt-16 pb-md">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="font-h2 text-h2 text-secondary leading-tight">{{ name }}</h1>
          <div v-if="certified" class="flex items-center gap-xs mt-xs text-tertiary">
            <FontAwesomeIcon icon="circle-check" class="text-base" />
            <span class="font-label-caps text-label-caps">{{ t('clinicPage.certifiedBadge') }}</span>
          </div>
        </div>
        <button class="bg-secondary-container text-on-secondary-container p-sm rounded-xl">
          <FontAwesomeIcon icon="share-nodes" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  certified: { type: Boolean, default: false },
})

const { t } = useI18n()
</script>
