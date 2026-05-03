<template>
  <div class="min-h-dvh flex flex-col bg-surface text-on-surface font-body-md antialiased">
    <main
      id="test-results-print-root"
      class="max-w-md mx-auto px-md py-xl pb-24 w-full flex-1 print:max-w-none print:w-full print:px-[12mm] print:py-[10mm] print:pb-[12mm]"
    >
      <!-- Logo: visible only when printing (A4 slip header) -->
      <div
        class="mb-0 hidden items-center justify-center gap-sm border-b border-outline-variant pb-6 mb-8 print:flex print:flex-col"
        aria-hidden="true"
      >
        <div class="flex items-center justify-center gap-sm">
          <FontAwesomeIcon
            :icon="['fas', 'briefcase-medical']"
            class="text-secondary text-3xl"
          />
          <span class="font-h1 text-h2 text-secondary tracking-tight">{{ t('brand.name') }}</span>
        </div>
      </div>

      <header class="mb-xl">
        <div class="flex justify-between items-start mb-md gap-md">
          <div class="min-w-0">
            <h1 class="font-h2 text-h2 text-secondary mb-xs break-words">
              {{ displayPatientName }}
            </h1>
            <p class="font-body-sm text-on-surface-variant flex items-center gap-xs flex-wrap">
              <FontAwesomeIcon icon="calendar-days" class="text-[18px] shrink-0" aria-hidden="true" />
              {{ t('testResults.reportDate') }}
            </p>
          </div>
          <AppButton
            type="button"
            class="bg-secondary text-on-secondary p-sm rounded-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform shrink-0 print:hidden"
            :aria-label="t('testResults.printAria')"
            @click="printReport"
          >
            <FontAwesomeIcon icon="print" aria-hidden="true" />
          </AppButton>
        </div>

        <div
          class="bg-white border border-outline-variant rounded-xl p-md flex items-center gap-md shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
        >
          <div class="h-12 w-12 bg-secondary-fixed rounded-full flex items-center justify-center shrink-0">
            <FontAwesomeIcon :icon="['fas', 'microscope']" class="text-on-secondary-fixed text-xl" aria-hidden="true" />
          </div>
          <div class="min-w-0">
            <h2 class="font-h3 text-h3 text-on-surface">
              {{ t('testResults.panelTitle') }}
            </h2>
            <p class="font-body-sm text-on-surface-variant">
              {{ t('testResults.panelSubtitle') }}
            </p>
          </div>
        </div>
      </header>

      <section class="space-y-md">
        <div class="flex justify-between items-center px-xs gap-sm flex-wrap">
          <h3 class="font-label-caps text-label-caps text-on-primary-container uppercase tracking-widest">
            {{ t('testResults.parametersTitle') }}
          </h3>
          <span class="font-body-sm text-on-tertiary-container bg-tertiary-fixed/30 px-sm py-[2px] rounded-full">
            {{ t('testResults.markersCount', { count: markerRows.length }) }}
          </span>
        </div>

        <div class="space-y-sm">
          <div
            v-for="row in markerRows"
            :key="row.key"
            class="bg-white border border-outline-variant rounded-xl p-md shadow-sm break-inside-avoid"
          >
            <div class="flex justify-between items-start mb-sm gap-sm">
              <div class="min-w-0">
                <p class="font-h3 text-[18px] text-on-surface">
                  {{ row.name }}
                </p>
                <p class="font-body-sm text-on-surface-variant">
                  {{ row.subtitle }}
                </p>
              </div>
              <div class="text-right shrink-0">
                <p
                  class="font-h2 text-h2 tabular-nums"
                  :class="row.flag === 'normal' ? 'text-secondary' : 'text-error'"
                >
                  {{ row.value }}
                  <span class="text-body-sm font-normal text-on-surface-variant">{{ row.unitLabel }}</span>
                </p>
              </div>
            </div>
            <div class="flex items-center justify-between pt-sm border-t border-surface-container gap-sm flex-wrap">
              <p class="font-body-sm text-on-surface-variant">
                {{ row.ref }}
              </p>
              <span
                class="px-sm py-1 rounded-lg text-[12px] font-bold uppercase shrink-0"
                :class="statusBadgeClass(row.flag)"
              >
                {{ row.statusLabel }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-xl p-md bg-secondary-container/20 rounded-xl border border-secondary-container/30 print:break-inside-avoid">
        <div class="flex items-start gap-sm">
          <FontAwesomeIcon icon="circle-info" class="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
          <p class="font-body-sm text-on-secondary-container">
            <strong>{{ t('testResults.doctorNoteLead') }}</strong>
            {{ ' ' }}
            {{ t('testResults.doctorNoteBody') }}
          </p>
        </div>
      </section>
    </main>

    <BottomNavBar class="print:hidden" />
    <div class="h-16 md:hidden print:hidden" aria-hidden="true" />
  </div>
</template>

<script setup>
const { t } = useI18n()
const route = useRoute()

/** Demo values; in production these would come from an API keyed by patient + PIN */
const MARKER_DEFS = [
  { key: 'glucose', value: '92', unitKey: 'mgDl', flag: 'normal' },
  { key: 'cholesterol', value: '215', unitKey: 'mgDl', flag: 'high' },
  { key: 'hemoglobin', value: '14.2', unitKey: 'gDl', flag: 'normal' },
  { key: 'wbc', value: '3.8', unitKey: 'ten3uL', flag: 'low' },
  { key: 'creatinine', value: '0.9', unitKey: 'mgDl', flag: 'normal' },
]

const markerRows = computed(() =>
  MARKER_DEFS.map((m) => ({
    ...m,
    name: t(`testResults.markers.${m.key}.name`),
    subtitle: t(`testResults.markers.${m.key}.subtitle`),
    ref: t(`testResults.markers.${m.key}.ref`),
    unitLabel: t(`testResults.units.${m.unitKey}`),
    statusLabel: t(`testResults.status.${m.flag}`),
  })),
)

const displayPatientName = computed(() => {
  const q = route.query.patient
  if (typeof q === 'string' && q.trim().length) {
    return q.trim()
  }
  return t('testResults.demoPatientName')
})

useSeoMeta({
  title: () => t('testResults.seoTitle'),
})

function statusBadgeClass(flag) {
  if (flag === 'normal') {
    return 'bg-on-tertiary-container/10 text-on-tertiary-container'
  }
  return 'bg-error/10 text-error'
}

function printReport() {
  if (import.meta.client) {
    window.print()
  }
}
</script>

<style>
/* A4 report slip; content in #test-results-print-root prints with logo */
@page {
  size: A4 portrait;
  margin: 12mm;
}

@media print {
  html,
  body {
    background: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
