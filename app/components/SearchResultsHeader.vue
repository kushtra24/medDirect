<template>
  <div class="p-md bg-surface-container-lowest border-b border-outline-variant">
    <div class="flex items-center justify-between mb-sm">
      <h2 class="font-h2 text-h2 text-secondary">{{ t('searchResults.headerTitle') }}</h2>
      <button class="flex items-center gap-1 text-teal-600 font-label-caps text-label-caps hover:underline" type="button">
        <FontAwesomeIcon icon="sliders" class="text-sm" />
        {{ t('searchResults.filter') }}
      </button>
    </div>
    <div class="flex gap-2 flex-wrap">
      <span class="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-label-caps font-label-caps rounded-full">
        {{ t('searchResults.chipAvailableToday') }}
      </span>
      <span class="px-3 py-1 bg-surface-container-high text-on-surface-variant text-label-caps font-label-caps rounded-full">
        {{ t('searchResults.chipPrimaryCare') }}
      </span>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
</script>
