<template>
  <AppModal
    :open="open"
    :title="t('editClinicPage.operations.servicesModal.title')"
    :close-aria="t('editClinicPage.operations.servicesModal.closeAria')"
    max-width-class="max-w-md"
    @update:open="$emit('update:open', $event)"
  >
    <p class="text-body-sm text-on-surface-variant mb-md">
      {{ t('editClinicPage.operations.servicesModal.subtitle') }}
    </p>
    <p v-if="!services.length" class="text-body-sm text-on-surface-variant italic">
      {{ t('editClinicPage.operations.servicesModal.empty') }}
    </p>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-xs">
      <label
        v-for="service in services"
        :key="service.id"
        class="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-container dark:hover:bg-slate-800 cursor-pointer transition-colors"
      >
        <input
          type="checkbox"
          class="rounded border-outline-variant text-tertiary focus:ring-tertiary"
          :checked="selected.has(service.id)"
          @change="toggle(service.id)"
        >
        <FontAwesomeIcon v-if="service.icon" :icon="service.icon" class="text-tertiary text-sm shrink-0" aria-hidden="true" />
        <span class="text-body-sm">{{ service.name }}</span>
      </label>
    </div>

    <template #footer>
      <AppButton
        type="button"
        class="px-lg py-sm rounded-lg font-button text-body-sm text-on-surface-variant hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
        @click="$emit('update:open', false)"
      >
        {{ t('editClinicPage.operations.servicesModal.cancel') }}
      </AppButton>
      <AppButton
        type="button"
        class="px-lg py-sm rounded-lg bg-tertiary text-on-tertiary font-button text-body-sm hover:opacity-90 transition-opacity"
        @click="save"
      >
        {{ t('editClinicPage.operations.servicesModal.apply') }}
      </AppButton>
    </template>
  </AppModal>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  services: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:open', 'save'])

const { t } = useI18n()

const selected = ref(new Set())

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) return
    selected.value = new Set(props.modelValue)
  },
  { immediate: true },
)

function toggle(id) {
  const next = new Set(selected.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  selected.value = next
}

function save() {
  emit('save', Array.from(selected.value))
  emit('update:open', false)
}
</script>
