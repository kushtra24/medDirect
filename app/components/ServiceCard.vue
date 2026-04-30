<template>
  <div class="bg-surface-container-low border border-outline-variant p-md rounded-xl flex flex-col gap-sm">
    <div
      class="bg-white w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
      :class="iconColor"
    >
      <FontAwesomeIcon :icon="icon" />
    </div>
    <span class="font-body-sm text-body-sm font-semibold text-secondary">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: [String, Array], required: true },
  label: { type: String, required: true },
  iconColor: { type: String, default: undefined },
})
</script>
