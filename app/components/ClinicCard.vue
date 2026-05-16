<template>
  <NuxtLink
    :to="`/med/${slug}`"
    class="block my-4 bg-white border border-outline-variant rounded-xl p-md flex gap-md hover:shadow-[0_4px_10px_rgba(0,0,0,0.04)] transition-all cursor-pointer group"
    :class="selected ? 'border-secondary ring-1 ring-secondary' : ''"
    @mouseenter="$emit('mouseenter')"
  >
    <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
      <img
        :alt="name"
        :src="image"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex justify-between items-start gap-2">
        <h3 class="font-h3 text-h3 text-secondary mb-1 truncate">{{ name }}</h3>
      </div>
      <p class="text-on-surface-variant text-body-sm font-body-sm mb-2">
        {{ t('clinicCard.milesLine', { n: distance, area: neighborhood }) }}
      </p>
      <div class="flex items-center gap-2">
        <span
          class="w-2 h-2 rounded-full flex-shrink-0"
          :class="isOpen ? 'bg-teal-500' : 'bg-error'"
        />
        <span
          class="text-label-caps font-label-caps"
          :class="isOpen ? 'text-teal-600' : 'text-error'"
        >
          {{ isOpen ? t('clinicCard.openNow') : t('clinicCard.closedOpens', { time: openTime ?? '—' }) }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineEmits(['mouseenter'])

defineProps({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  distance: { type: Number, required: true },
  neighborhood: { type: String, required: true },
  isOpen: { type: Boolean, required: true },
  openTime: { type: String, default: undefined },
  image: { type: String, required: true },
  selected: { type: Boolean, default: false },
})

const { t } = useI18n()
</script>
