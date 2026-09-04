<template>
  <AppModal
    :open="open"
    :title="dayLabel"
    :close-aria="t('editClinicPage.operations.hoursModal.closeAria')"
    max-width-class="max-w-sm"
    @update:open="$emit('update:open', $event)"
  >
    <div class="space-y-md">
      <label class="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-container dark:hover:bg-slate-800 cursor-pointer transition-colors">
        <input v-model="closed" type="checkbox" class="rounded border-outline-variant text-tertiary focus:ring-tertiary">
        <span class="text-body-sm font-semibold">{{ t('editClinicPage.operations.hoursModal.closedAllDay') }}</span>
      </label>

      <div v-if="!closed" class="grid grid-cols-2 gap-md">
        <div>
          <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs" :for="`${uid}-open`">
            {{ t('editClinicPage.operations.hoursModal.opens') }}
          </label>
          <input
            :id="`${uid}-open`"
            v-model="openTime"
            type="time"
            class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all bg-white dark:bg-slate-950 dark:border-slate-700"
          >
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs" :for="`${uid}-close`">
            {{ t('editClinicPage.operations.hoursModal.closes') }}
          </label>
          <input
            :id="`${uid}-close`"
            v-model="closeTime"
            type="time"
            class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all bg-white dark:bg-slate-950 dark:border-slate-700"
          >
        </div>
      </div>
    </div>

    <template #footer>
      <AppButton
        type="button"
        class="px-lg py-sm rounded-lg font-button text-body-sm text-on-surface-variant hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
        @click="$emit('update:open', false)"
      >
        {{ t('editClinicPage.operations.hoursModal.cancel') }}
      </AppButton>
      <AppButton
        type="button"
        class="px-lg py-sm rounded-lg bg-tertiary text-on-tertiary font-button text-body-sm hover:opacity-90 transition-opacity"
        @click="save"
      >
        {{ t('editClinicPage.operations.hoursModal.save') }}
      </AppButton>
    </template>
  </AppModal>
</template>

<script setup>
import { useId } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  dayLabel: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:open', 'save'])

const { t } = useI18n()

const uid = useId()

const closed = ref(false)
const openTime = ref('08:00')
const closeTime = ref('18:00')

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) return
    closed.value = !!props.modelValue.closed
    openTime.value = props.modelValue.open || '08:00'
    closeTime.value = props.modelValue.close || '18:00'
  },
  { immediate: true },
)

function save() {
  emit('save', {
    closed: closed.value,
    open: closed.value ? null : openTime.value,
    close: closed.value ? null : closeTime.value,
  })
  emit('update:open', false)
}
</script>
