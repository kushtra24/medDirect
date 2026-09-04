<template>
  <div class="bg-white dark:bg-slate-900 border border-outline-variant rounded-xl overflow-hidden shadow-sm">
    <div class="p-4 border-b border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div class="flex items-center gap-md flex-wrap">
        <span class="flex items-center gap-xs text-body-sm text-on-surface-variant">
          <FontAwesomeIcon icon="calendar-days" class="text-[16px] shrink-0" aria-hidden="true" />
          {{ reportDateDisplay }}
        </span>
        <span class="flex items-center gap-xs text-body-sm text-on-surface-variant border-l border-slate-200 dark:border-slate-700 ps-md">
          <FontAwesomeIcon icon="user" class="text-[16px] shrink-0" aria-hidden="true" />
          {{ report.created_by?.name || notAvailable }}
        </span>
      </div>
      <div class="flex items-center gap-sm shrink-0">
        <slot name="actions" />
        <span
          class="inline-flex items-center gap-xs px-2 py-1 rounded-full text-xs font-semibold shrink-0"
          :class="statusBadgeClass"
        >
          <span class="h-1.5 w-1.5 rounded-full shrink-0" :class="statusDotClass" />
          {{ statusLabel }}
        </span>
      </div>
    </div>

    <p v-if="report.doctor_note" class="px-4 pt-3 text-body-sm text-on-surface-variant italic">
      {{ report.doctor_note }}
    </p>

    <div class="overflow-x-auto">
      <table class="w-full text-start border-collapse min-w-[520px]">
        <thead>
          <tr class="bg-surface-container-low dark:bg-slate-800">
            <th class="px-4 py-2 font-label-caps text-label-caps text-on-surface-variant">{{ t('patientRecordPage.itemsTable.name') }}</th>
            <th class="px-4 py-2 font-label-caps text-label-caps text-on-surface-variant">{{ t('patientRecordPage.itemsTable.value') }}</th>
            <th class="px-4 py-2 font-label-caps text-label-caps text-on-surface-variant">{{ t('patientRecordPage.itemsTable.status') }}</th>
            <th class="px-4 py-2 font-label-caps text-label-caps text-on-surface-variant">{{ t('patientRecordPage.itemsTable.reference') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-outline-variant dark:divide-slate-700">
          <tr v-if="!items.length">
            <td colspan="4" class="px-4 py-3 text-body-sm text-on-surface-variant text-center">
              {{ t('patientRecordPage.itemsTable.empty') }}
            </td>
          </tr>
          <tr v-for="item in items" :key="item.id" class="hover:bg-surface dark:hover:bg-slate-800/40 transition-colors">
            <td class="px-4 py-3 font-body-md text-blue-900 dark:text-blue-100 font-semibold">{{ item[itemNameField] }}</td>
            <td class="px-4 py-3 font-body-md">{{ item.value || notAvailable }}</td>
            <td class="px-4 py-3">
              <span
                class="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-bold rounded-md"
                :class="item.status === 'high'
                  ? 'bg-red-50 dark:bg-red-950/50 text-error'
                  : item.status === 'low'
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                    : 'bg-tertiary/10 text-tertiary'"
              >
                {{ itemStatusLabel(item.status) }}
              </span>
            </td>
            <td class="px-4 py-3 font-body-sm text-on-surface-variant">{{ item.reference_point || notAvailable }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
  itemNameField: {
    type: String,
    required: true,
  },
  notAvailable: {
    type: String,
    default: '—',
  },
})

const { t, locale } = useI18n()

const items = computed(() => props.report.items ?? [])

const reportDateDisplay = computed(() => {
  const iso = props.report.reported_at || props.report.created_at
  if (!iso) return props.notAvailable
  try {
    const loc = locale.value === 'ar' ? 'ar' : locale.value === 'ku' ? 'ku' : 'en'
    return new Intl.DateTimeFormat(loc, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
  }
  catch {
    return iso
  }
})

const statusBadgeClass = computed(() =>
  props.report.status === 'draft'
    ? 'bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300'
    : 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300',
)

const statusDotClass = computed(() => (props.report.status === 'draft' ? 'bg-yellow-600' : 'bg-green-600'))

const statusLabel = computed(() =>
  props.report.status === 'draft' ? t('patientRecordPage.statusDraft') : t('patientRecordPage.statusCompleted'),
)

function itemStatusLabel(status) {
  if (status === 'high') return t('patientRecordPage.itemsTable.high')
  if (status === 'low') return t('patientRecordPage.itemsTable.low')
  return t('patientRecordPage.itemsTable.normal')
}
</script>
