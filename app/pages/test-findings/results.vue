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

      <div v-if="!report" class="text-center py-xxl">
        <p class="font-body-md text-on-surface-variant mb-lg">
          {{ t('testResults.noReport') }}
        </p>
        <AppButton
          to="/profile"
          class="inline-flex items-center gap-2 bg-secondary text-on-secondary py-sm px-lg rounded-lg font-button text-button hover:opacity-90 transition-all"
        >
          {{ t('testResults.backToProfile') }}
        </AppButton>
      </div>

      <template v-else>
        <header class="mb-xl">
          <div class="flex justify-between items-start mb-md gap-md">
            <div class="min-w-0">
              <h1 class="font-h2 text-h2 text-secondary mb-xs break-words">
                {{ displayPatientName }}
              </h1>
              <p class="font-body-sm text-on-surface-variant flex items-center gap-xs flex-wrap">
                <FontAwesomeIcon icon="calendar-days" class="text-[18px] shrink-0" aria-hidden="true" />
                {{ displayReportDate }}
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
                {{ displayOrganization }}
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

          <div v-if="!markerRows.length" class="bg-white border border-outline-variant rounded-xl p-md text-center text-on-surface-variant font-body-sm">
            {{ t('testResults.noMarkers') }}
          </div>

          <div v-else class="space-y-sm">
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
                </div>
                <div class="text-right shrink-0">
                  <p
                    class="font-h2 text-h2 tabular-nums"
                    :class="row.flag === 'normal' ? 'text-secondary' : 'text-error'"
                  >
                    {{ row.value }}
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

        <section
          v-if="report.doctor_note"
          class="mt-xl p-md bg-secondary-container/20 rounded-xl border border-secondary-container/30 print:break-inside-avoid"
        >
          <div class="flex items-start gap-sm">
            <FontAwesomeIcon icon="circle-info" class="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
            <p class="font-body-sm text-on-secondary-container">
              <strong>{{ t('testResults.doctorNoteLead') }}</strong>
              {{ ' ' }}
              {{ report.doctor_note }}
            </p>
          </div>
        </section>
      </template>
    </main>

    <BottomNavBar class="print:hidden" />
    <div class="h-16 md:hidden print:hidden" aria-hidden="true" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
})

const { t, locale } = useI18n()

const report = ref(null)

onMounted(() => {
  const state = window.history.state || {}
  report.value = state.report ?? null
})

function localeCode() {
  return locale.value === 'ar' ? 'ar' : locale.value === 'ku' ? 'ku' : 'en'
}

const markerRows = computed(() => {
  const items = report.value?.items ?? []
  return items.map((item) => ({
    key: item.id,
    name: item.test_name || t('testResults.unnamedMarker'),
    value: item.value || t('examinationResultSlip.notAvailable'),
    ref: item.reference_point || t('examinationResultSlip.notAvailable'),
    flag: item.status || 'normal',
    statusLabel: t(`testResults.status.${item.status === 'high' || item.status === 'low' ? item.status : 'normal'}`),
  }))
})

const displayPatientName = computed(() =>
  report.value?.patient?.full_name || t('testResults.demoPatientName'),
)

const displayOrganization = computed(() =>
  report.value?.organization?.name || t('testResults.panelSubtitle'),
)

const displayReportDate = computed(() => {
  const iso = report.value?.reported_at
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat(localeCode(), { dateStyle: 'long' }).format(new Date(iso))
  }
  catch {
    return ''
  }
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
