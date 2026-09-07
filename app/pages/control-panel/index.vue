<template>
  <div
    class="bg-surface font-body-md text-on-surface antialiased min-h-dvh flex flex-col pb-20 md:pb-0"
  >
    <ControlPanelHeader />

    <main
      class="max-w-screen-2xl mx-auto px-6 md:px-12 py-8 grid grid-cols-1 md:grid-cols-12 gap-8 flex-1 w-full"
    >
      <aside class="hidden md:block md:col-span-3 space-y-6">
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-outline-variant shadow-sm">
          <div class="flex flex-col items-center text-center mb-6">
            <div class="relative w-24 h-24 mb-4">
              <div
                class="absolute inset-0 rounded-full bg-secondary/20 opacity-20"
                aria-hidden="true"
              />
              <svg class="w-24 h-24 transform -rotate-90" aria-hidden="true">
                <circle cx="48" cy="48" fill="transparent" r="40" stroke="#e2e8f0" stroke-width="8" />
                <circle
                  cx="48"
                  cy="48"
                  fill="transparent"
                  r="40"
                  stroke="#006a6a"
                  stroke-dasharray="251.2"
                  :stroke-dashoffset="profileStrengthDashOffset"
                  stroke-linecap="round"
                  stroke-width="8"
                  class="transition-[stroke-dashoffset] duration-500"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="font-h2 text-secondary text-2xl">{{ profileStrengthLoading ? '–' : `${profileStrengthPercent}%` }}</span>
              </div>
            </div>
            <h3 class="font-h3 text-secondary mb-1">{{ t('controlPanel.profileStrength.title') }}</h3>
            <p class="font-body-sm text-outline">{{ t('controlPanel.profileStrength.hint') }}</p>
          </div>
          <AppButton
            to="/control-panel/edit-clinic"
            class="w-full px-4 py-2.5 bg-tertiary text-on-tertiary font-button rounded-lg shadow-sm active:scale-95 transition-all text-center inline-flex items-center justify-center"
          >
            {{ t('controlPanel.profileStrength.updateProfileCta') }}
          </AppButton>
        </div>
      </aside>

      <section class="md:col-span-9 space-y-8">
        <header class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="font-h1 text-secondary">{{ t('controlPanel.overview.title') }}</h1>
            <p class="font-body-lg text-outline">
              {{ t('controlPanel.overview.welcome', { name: displayUserName }) }}
            </p>
          </div>
          <div class="flex gap-3">
            <AppButton
              to="/control-panel/import-patients"
              class="px-6 py-2.5 bg-white dark:bg-slate-900 border border-tertiary text-tertiary font-button rounded-lg shadow-sm active:scale-95 transition-all text-center inline-flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon="file-arrow-up" aria-hidden="true" />
              {{ t('controlPanel.importPatients') }}
            </AppButton>
            <AppButton
              to="/control-panel/add-new-patient"
              class="px-6 py-2.5 bg-tertiary text-on-tertiary font-button rounded-lg shadow-sm active:scale-95 transition-all text-center inline-flex items-center justify-center"
            >
              {{ t('controlPanel.newPatient') }}
            </AppButton>
          </div>
        </header>

        <p v-if="statsLoadError" class="text-error text-body-sm" role="alert">
          {{ statsLoadError }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-outline-variant shadow-sm">
            <div class="flex justify-between items-start mb-4">
              <div class="p-3 bg-secondary-container/30 rounded-lg">
                <FontAwesomeIcon icon="stethoscope" class="text-secondary text-xl" aria-hidden="true" />
              </div>
            </div>
            <p class="font-label-caps text-outline mb-1 uppercase tracking-wide">
              {{ t('controlPanel.stats.examinationsToday') }}
            </p>
            <h2 class="font-h2 text-secondary">
              {{ statsLoading ? '–' : stats.examinations_today }}
            </h2>
          </div>
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-outline-variant shadow-sm">
            <div class="flex justify-between items-start mb-4">
              <div class="p-3 bg-tertiary-fixed-dim/30 rounded-lg">
                <FontAwesomeIcon icon="user-plus" class="text-tertiary text-xl" aria-hidden="true" />
              </div>
            </div>
            <p class="font-label-caps text-outline mb-1 uppercase tracking-wide">
              {{ t('controlPanel.stats.newPatientsThisMonth') }}
            </p>
            <h2 class="font-h2 text-secondary">
              {{ statsLoading ? '–' : stats.new_patients_this_month }}
            </h2>
          </div>
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-outline-variant shadow-sm opacity-70">
            <div class="flex justify-between items-start mb-4">
              <div class="p-3 bg-surface-container rounded-lg">
                <FontAwesomeIcon icon="magnifying-glass" class="text-outline text-xl" aria-hidden="true" />
              </div>
              <span class="text-outline font-semibold text-[11px] uppercase tracking-wide bg-surface-container px-2 py-1 rounded-full">
                {{ t('controlPanel.stats.comingSoon') }}
              </span>
            </div>
            <p class="font-label-caps text-outline mb-1 uppercase tracking-wide">
              {{ t('controlPanel.stats.searchAppearances') }}
            </p>
            <h2 class="font-h2 text-outline">—</h2>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-xl border border-outline-variant overflow-hidden">
          <div class="p-6 border-b border-outline-variant flex justify-between items-center">
            <h3 class="font-h3 text-secondary">{{ t('controlPanel.patientLogs.title') }}</h3>
            <AppButton
              to="/control-panel/search-patient"
              class="text-tertiary font-button text-sm hover:underline"
            >
              {{ t('controlPanel.patientLogs.viewAll') }}
            </AppButton>
          </div>
          <p v-if="statsLoadError" class="text-error text-body-sm p-6" role="alert">
            {{ statsLoadError }}
          </p>
          <p v-else-if="!statsLoading && !recentActivity.length" class="text-on-surface-variant text-body-sm p-6 text-center">
            {{ t('controlPanel.patientLogs.empty') }}
          </p>
          <div v-else class="divide-y divide-outline-variant">
            <div v-for="(entry, index) in recentActivity" :key="index" class="p-6 flex gap-4">
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                :class="entry.status === 'finalized' ? 'bg-secondary/10' : 'bg-secondary-container/20'"
              >
                <FontAwesomeIcon
                  :icon="entry.status === 'finalized' ? 'circle-check' : 'arrows-rotate'"
                  class="text-secondary"
                  aria-hidden="true"
                />
              </div>
              <div class="flex-grow min-w-0">
                <div class="flex justify-between gap-2 mb-1 flex-wrap">
                  <h4 class="font-body-md font-bold text-secondary">{{ entry.patient_name || t('examinationResultsPage.patientInfo.notAvailable') }}</h4>
                  <span
                    class="text-[12px] font-semibold px-2 py-0.5 rounded shrink-0"
                    :class="entry.status === 'finalized' ? 'text-tertiary bg-tertiary/10' : 'text-secondary bg-secondary/10'"
                  >
                    {{ entry.status === 'finalized' ? t('controlPanel.patientLogs.completed') : t('controlPanel.patientLogs.inProgress') }}
                  </span>
                </div>
                <p class="font-body-sm text-on-surface">
                  {{ entry.type === 'lab' ? t('controlPanel.patientLogs.labBody') : t('controlPanel.patientLogs.examinationBody') }}
                </p>
                <span class="text-[12px] text-outline mt-2 block">{{ activityMeta(entry) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-outline-variant shadow-sm">
          <h3 class="font-h3 text-secondary mb-4">{{ t('controlPanel.upcomingFeatures.title') }}</h3>
          <div class="flex flex-wrap gap-3">
            <AppButton
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.appointmentScheduling') }}
            </AppButton>
            <AppButton
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.contactPatients') }}
            </AppButton>
            <AppButton
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.crm') }}
            </AppButton>
            <AppButton
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.telemedicine') }}
            </AppButton>
            <AppButton
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.aiDiagnostics') }}
            </AppButton>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'staff',
})

const { t, locale } = useI18n()
const { api, ensureUserLoaded, user } = useMedDirectApi()
const { requireOrganization } = useActiveOrganization()

useSeoMeta({
  title: () => t('controlPanel.seoTitle'),
})

const displayUserName = computed(() => user.value?.name || '')

const stats = ref({ examinations_today: 0, new_patients_this_month: 0 })
const recentActivity = ref([])
const statsLoading = ref(false)
const statsLoadError = ref('')

async function loadStats() {
  statsLoadError.value = ''
  statsLoading.value = true
  try {
    const org = await requireOrganization()
    const res = await api(`/api/organizations/${org.id}/dashboard-stats`)
    stats.value = res.stats
    recentActivity.value = res.recent_activity || []
  }
  catch (e) {
    statsLoadError.value = e?.data?.message || e?.message || t('controlPanel.stats.errorLoadFailed')
  }
  finally {
    statsLoading.value = false
  }
}

const RELATIVE_TIME_UNITS = [
  ['year', 60 * 60 * 24 * 365],
  ['month', 60 * 60 * 24 * 30],
  ['week', 60 * 60 * 24 * 7],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
]

function formatRelativeTime(isoString) {
  const then = new Date(isoString).getTime()
  if (Number.isNaN(then)) return ''
  const seconds = Math.round((then - Date.now()) / 1000)
  const rtf = new Intl.RelativeTimeFormat(locale.value, { numeric: 'auto' })
  for (const [unit, secondsInUnit] of RELATIVE_TIME_UNITS) {
    if (Math.abs(seconds) >= secondsInUnit) {
      return rtf.format(Math.round(seconds / secondsInUnit), unit)
    }
  }
  return rtf.format(seconds, 'second')
}

function activityMeta(entry) {
  const parts = [formatRelativeTime(entry.occurred_at)]
  if (entry.staff_title) parts.push(entry.staff_title)
  if (entry.staff_name) parts.push(entry.staff_name)
  return parts.filter(Boolean).join(' | ')
}

const CIRCLE_CIRCUMFERENCE = 251.2

const profileStrengthPercent = ref(0)
const profileStrengthLoading = ref(false)

const profileStrengthDashOffset = computed(() =>
  CIRCLE_CIRCUMFERENCE * (1 - profileStrengthPercent.value / 100),
)

async function loadProfileStrength() {
  profileStrengthLoading.value = true
  try {
    const org = await requireOrganization()
    const res = await api(`/api/organizations/${org.id}`)
    profileStrengthPercent.value = res.profile?.completeness_percent ?? 0
  }
  catch {
    profileStrengthPercent.value = 0
  }
  finally {
    profileStrengthLoading.value = false
  }
}

onMounted(async () => {
  await ensureUserLoaded()
  await Promise.all([loadStats(), loadProfileStrength()])
})
</script>
