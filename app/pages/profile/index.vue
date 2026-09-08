<template>
  <div class="font-body-md text-on-background min-h-dvh flex flex-col md:pb-0 pb-24 bg-slate-50 dark:bg-slate-950">
    <div class="flex flex-1 min-h-0 min-w-0">
      <!-- SideNav (desktop) -->
      <aside
        class="hidden md:flex h-dvh sticky top-0 w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex-col py-6 px-4 gap-2 z-50"
      >
        <div class="mb-8 px-2">
          <h1 class="text-lg font-extrabold text-blue-900 dark:text-blue-200 font-h3">
            {{ t('patientProfile.sidebar.brandTitle') }}
          </h1>
          <p class="text-slate-500 text-[12px] font-medium font-body-sm">
            {{ t('patientProfile.sidebar.brandSubtitle') }}
          </p>
        </div>

        <nav class="flex-1 space-y-1" aria-label="Primary">
          <AppButton
            to="/"
            class="flex items-center gap-3 px-3 py-3 rounded-lg font-manrope text-[14px] font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-transform duration-200 active:scale-95"
          >
            <FontAwesomeIcon :icon="['fas', 'table-cells']" class="w-5 text-center" aria-hidden="true" />
            {{ t('patientProfile.sidebar.dashboard') }}
          </AppButton>
          <AppButton
            type="button"
            class="flex w-full items-center gap-3 px-3 py-3 rounded-lg font-manrope text-[14px] font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-transform duration-200 active:scale-95 text-left"
          >
            <FontAwesomeIcon :icon="['fas', 'clock-rotate-left']" class="w-5 text-center" aria-hidden="true" />
            {{ t('patientProfile.sidebar.medicalHistory') }}
          </AppButton>
          <AppButton
            to="/test-findings/find-test-results"
            class="flex items-center gap-3 px-3 py-3 rounded-lg font-manrope text-[14px] font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-transform duration-200 active:scale-95"
          >
            <FontAwesomeIcon :icon="['fas', 'microscope']" class="w-5 text-center" aria-hidden="true" />
            {{ t('patientProfile.sidebar.testResults') }}
          </AppButton>
          <AppButton
            type="button"
            class="flex w-full items-center gap-3 px-3 py-3 rounded-lg font-manrope text-[14px] font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-transform duration-200 active:scale-95 text-left"
          >
            <FontAwesomeIcon :icon="['fas', 'calendar-days']" class="w-5 text-center" aria-hidden="true" />
            {{ t('patientProfile.sidebar.appointments') }}
          </AppButton>
          <AppButton
            to="/profile"
            class="flex items-center gap-3 px-3 py-3 rounded-lg font-manrope text-[14px] font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 border-r-4 border-blue-900 dark:border-blue-400 transition-transform duration-200 active:scale-95"
          >
            <FontAwesomeIcon :icon="['fas', 'user']" class="w-5 text-center" aria-hidden="true" />
            {{ t('patientProfile.sidebar.userProfile') }}
          </AppButton>
        </nav>

        <div class="mt-auto space-y-1 border-t border-slate-200 dark:border-slate-800 pt-4">
          <AppButton
            type="button"
            class="flex w-full items-center gap-3 px-3 py-2 rounded-lg font-manrope text-[14px] font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-transform text-left"
          >
            <FontAwesomeIcon :icon="['fas', 'gear']" class="w-5 text-center" aria-hidden="true" />
            {{ t('patientProfile.sidebar.settings') }}
          </AppButton>
          <AppButton
            type="button"
            class="flex items-center gap-3 px-3 py-2 rounded-lg font-manrope text-[14px] font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none"
            :disabled="signingOut"
            @click="signOut"
          >
            <FontAwesomeIcon :icon="['fas', 'right-from-bracket']" class="w-5 text-center" aria-hidden="true" />
            {{ t('patientProfile.sidebar.signOut') }}
          </AppButton>
          <AppButton
            type="button"
            class="w-full mt-4 bg-tertiary text-white py-2 rounded-lg font-button text-sm hover:opacity-90 transition-opacity"
          >
            {{ t('patientProfile.sidebar.emergencyContact') }}
          </AppButton>
        </div>
      </aside>

      <!-- Main -->
      <div class="flex-1 flex flex-col min-w-0">
        <header
          class="sticky top-0 w-full z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-end px-4 md:px-6 h-16 shrink-0 gap-4"
        >
          <div class="flex items-center gap-2 md:gap-4 shrink-0">
            <AppButton
              type="button"
              class="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
              :aria-label="t('patientProfile.topBar.notificationsAria')"
            >
              <FontAwesomeIcon icon="bell" aria-hidden="true" />
            </AppButton>
            <AppButton
              type="button"
              class="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
              :aria-label="t('patientProfile.topBar.helpAria')"
            >
              <FontAwesomeIcon icon="circle-question" aria-hidden="true" />
            </AppButton>
            <div class="h-8 w-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
              <img
                :src="displayAvatar"
                alt=""
                class="h-full w-full object-cover"
                width="32"
                height="32"
              />
            </div>
          </div>
        </header>

        <main class="flex-1 p-gutter max-w-container-max mx-auto w-full">
          <div class="grid grid-cols-12 gap-gutter">
            <!-- Personal -->
            <section
              class="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-xl shadow-[0_10px_20px_-15px_rgba(0,0,0,0.04)] relative overflow-hidden"
            >
              <div class="absolute top-0 left-0 w-1.5 h-full bg-secondary" aria-hidden="true" />
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-xl">
                <div class="flex gap-md min-w-0">
                  <div class="w-24 h-24 rounded-2xl overflow-hidden shadow-md shrink-0">
                    <img
                      :src="displayAvatar"
                      :alt="t('patientProfile.personal.photoAlt')"
                      class="h-full w-full object-cover"
                      width="96"
                      height="96"
                    />
                  </div>
                  <div class="min-w-0">
                    <h2 class="font-h1 text-h2 text-blue-900 dark:text-blue-300 mb-xs break-words">
                      {{ displayName }}
                    </h2>
                    <div class="flex items-center gap-sm text-slate-500 dark:text-slate-400">
                      <FontAwesomeIcon icon="envelope" class="text-sm shrink-0" aria-hidden="true" />
                      <span class="text-body-sm font-body-sm break-all">{{ displayEmail }}</span>
                    </div>
                    <div class="mt-md flex flex-wrap gap-sm">
                      <span class="px-3 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 text-label-caps font-label-caps rounded-full">
                        {{ displayPatientId }}
                      </span>
                      <span class="px-3 py-1 bg-tertiary/10 text-tertiary text-label-caps font-label-caps rounded-full">
                        {{ t('patientProfile.personal.activeStatus') }}
                      </span>
                    </div>
                  </div>
                </div>
                <AppButton
                  to="/profile/edit"
                  class="flex items-center gap-xs px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-secondary font-button text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shrink-0 self-start"
                >
                  <FontAwesomeIcon icon="pen-to-square" class="text-sm" aria-hidden="true" />
                  {{ t('patientProfile.personal.editProfile') }}
                </AppButton>
              </div>

              <div class="flex items-center gap-2 mb-xl flex-wrap">
                <div class="relative group">
                  <AppButton
                    type="button"
                    class="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:border-tertiary/50 hover:bg-white dark:hover:bg-slate-700 transition-all text-sm font-medium"
                  >
                    <FontAwesomeIcon icon="earth-americas" class="text-lg" aria-hidden="true" />
                    <span>{{ t('patientProfile.personal.languageLabel') }}: {{ currentLocaleLabel }}</span>
                    <FontAwesomeIcon icon="chevron-down" class="text-base" aria-hidden="true" />
                  </AppButton>
                  <div
                    class="absolute left-0 mt-1 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50"
                  >
                    <div class="py-1">
                      <AppButton
                        v-for="code in localeCodes"
                        :key="code"
                        type="button"
                        class="flex w-full items-center px-4 py-2 text-sm text-left transition-colors"
                        :class="locale === code
                          ? 'text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 font-medium'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-900'"
                        @click="selectLocale(code)"
                      >
                        {{ localeLabel(code) }}
                      </AppButton>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-xl pt-xl border-t border-slate-100 dark:border-slate-800">
                <div>
                  <p class="text-label-caps font-label-caps text-slate-400 mb-xs">
                    {{ t('patientProfile.personal.fieldBirthdate') }}
                  </p>
                  <p class="font-body-md font-semibold text-blue-900 dark:text-blue-200">
                    {{ displayBirthdate }}
                  </p>
                </div>
                <div>
                  <p class="text-label-caps font-label-caps text-slate-400 mb-xs">
                    {{ t('patientProfile.personal.fieldBloodType') }}
                  </p>
                  <p class="font-body-md font-semibold text-error">
                    {{ displayBlood }}
                  </p>
                </div>
                <div>
                  <p class="text-label-caps font-label-caps text-slate-400 mb-xs">
                    {{ t('patientProfile.personal.fieldPhone') }}
                  </p>
                  <p class="font-body-md font-semibold text-blue-900 dark:text-blue-200 break-all">
                    {{ displayPhone }}
                  </p>
                </div>
                <div>
                  <p class="text-label-caps font-label-caps text-slate-400 mb-xs">
                    {{ t('patientProfile.personal.fieldLocation') }}
                  </p>
                  <p class="font-body-md font-semibold text-blue-900 dark:text-blue-200 whitespace-pre-line break-words">
                    {{ displayAddress }}
                  </p>
                </div>
              </div>
            </section>

            <!-- Profile strength -->
            <section
              class="col-span-12 lg:col-span-4 bg-surface-container-lowest dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-xl flex flex-col justify-center"
            >
              <div class="flex justify-between items-end mb-sm gap-2">
                <h3 class="font-h3 text-body-lg text-blue-900 dark:text-blue-200">
                  {{ t('patientProfile.strength.title') }}
                </h3>
                <span class="text-tertiary font-bold text-h3 tabular-nums">{{ t('patientProfile.strength.percent') }}</span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full mb-md overflow-hidden">
                <div class="bg-tertiary h-full w-[85%] rounded-full" />
              </div>
              <p class="text-body-sm font-body-sm text-slate-500 dark:text-slate-400">
                {{ t('patientProfile.strength.hint') }}
              </p>
              <AppButton
                to="/profile/edit"
                class="mt-md text-tertiary font-button text-sm flex items-center gap-1 hover:underline text-left"
              >
                {{ t('patientProfile.strength.cta') }}
                <FontAwesomeIcon icon="arrow-right" class="text-sm" aria-hidden="true" />
              </AppButton>
            </section>

            <!-- Medical table -->
            <section
              class="col-span-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-[0_10px_20px_-15px_rgba(0,0,0,0.04)]"
            >
              <div class="p-xl border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-200">
                  {{ t('patientProfile.medical.title') }}
                </h3>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left min-w-[640px]">
                  <thead class="bg-slate-50 dark:bg-slate-800/80 text-label-caps font-label-caps text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th class="px-xl py-4 font-semibold">{{ t('patientProfile.medical.tableDate') }}</th>
                      <th class="px-xl py-4 font-semibold">{{ t('patientProfile.medical.tableResult') }}</th>
                      <th class="px-xl py-4 font-semibold">{{ t('patientProfile.medical.tableStatus') }}</th>
                      <th class="px-xl py-4 font-semibold text-right">{{ t('patientProfile.medical.tableDetails') }}</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                    <template v-if="recordsLoading">
                      <tr>
                        <td colspan="4" class="px-xl py-lg text-center text-slate-500">
                          {{ t('patientProfile.medical.loading') }}
                        </td>
                      </tr>
                    </template>
                    <template v-else-if="!medicalRows.length">
                      <tr>
                        <td colspan="4" class="px-xl py-lg text-center text-slate-500">
                          {{ t('patientProfile.medical.empty') }}
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr
                        v-for="row in medicalRows"
                        :key="row.id"
                        class="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                      <td class="px-xl py-md text-body-sm font-body-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {{ row.dateLabel }}
                      </td>
                      <td class="px-xl py-md">
                        <div class="flex items-center gap-3">
                          <span class="text-tertiary bg-tertiary/10 p-1.5 rounded shrink-0">
                            <FontAwesomeIcon :icon="['fas', 'microscope']" class="text-lg" aria-hidden="true" />
                          </span>
                          <div class="min-w-0">
                            <p class="font-body-md font-semibold text-blue-900 dark:text-blue-200">
                              {{ row.title }}
                            </p>
                            <p class="text-xs text-slate-400 dark:text-slate-500">
                              {{ row.subtitle }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-xl py-md">
                        <span
                          class="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full"
                          :class="statusBadgeClasses(row.tone)"
                        >
                          <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="statusDotClasses(row.tone)" />
                          {{ row.statusLabel }}
                        </span>
                      </td>
                      <td class="px-xl py-md text-right">
                        <AppButton
                          type="button"
                          class="text-tertiary font-medium text-sm inline-flex items-center gap-1 hover:underline justify-end"
                          @click="viewReportDetails(row.report)"
                        >
                          {{ t('patientProfile.medical.viewDetails') }}
                          <FontAwesomeIcon icon="chevron-right" class="text-base" aria-hidden="true" />
                        </AppButton>
                      </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
              <div class="p-lg bg-slate-50/50 dark:bg-slate-800/30 flex justify-center border-t border-slate-100 dark:border-slate-800">
                <AppButton
                  type="button"
                  class="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  {{ t('patientProfile.medical.viewAll') }}
                  <FontAwesomeIcon icon="chevron-down" class="text-sm" aria-hidden="true" />
                </AppButton>
              </div>
            </section>

            <section
              class="col-span-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-xl shadow-[0_10px_20px_-15px_rgba(0,0,0,0.04)]"
              aria-label="Account"
            >
              <AppButton
                type="button"
                class="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-lg font-manrope text-[14px] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                :disabled="signingOut"
                @click="signOut"
              >
                <FontAwesomeIcon :icon="['fas', 'right-from-bracket']" class="w-5 text-center shrink-0" aria-hidden="true" />
                {{ t('patientProfile.sidebar.signOut') }}
              </AppButton>
            </section>
          </div>
        </main>
      </div>
    </div>

    <BottomNavBar class="md:hidden" />
    <div class="h-16 md:hidden" aria-hidden="true" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
})

const { t, locale, setLocale } = useI18n()
const { persistLocale } = useLocalePreference()
const { api, clearSession, token, user, ensureUserLoaded } = useMedDirectApi()

const recordsLoading = ref(true)
const medicalReports = ref([])

onMounted(async () => {
  await ensureUserLoaded()
  await loadMedicalRecords()
})

async function loadMedicalRecords() {
  recordsLoading.value = true
  try {
    await api('/api/user/claim-records', { method: 'POST' })
    const res = await api('/api/user/medical-records')
    medicalReports.value = res.reports ?? []
  }
  catch {
    medicalReports.value = []
  }
  finally {
    recordsLoading.value = false
  }
}

const signingOut = ref(false)

async function signOut() {
  if (signingOut.value) return
  signingOut.value = true
  try {
    if (token.value) {
      try {
        await api('/api/logout', { method: 'POST' })
      }
      catch {
        /* still clear local session */
      }
    }
    clearSession()
    await navigateTo('/auth/login')
  }
  finally {
    signingOut.value = false
  }
}

const IMG_PHOTO_PATIENT =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQIp2SeFA0BiY7NcwrfY-ovT4swpQNvKfYl4B2IYVPYmksVrkHEzJKCM992CZ25h99dpDHf-2rL3M2u9iiwF_FZW3qPUelnSGLskfBByrF4eZeiR4LNdVN5M0PoFTXXCQoN4CncOEaB0CJQoUD4IXQ23aar5y4tcRDWtWR5zU4RFxDh9JjT28yu9pRePagaTuF7TAgACP5Nr4svs_uZQ-F6AsEQTb3VxZJnCBEGO2zt-r_Ggz9OFyhGkJJtyDUY6M391m3AqFgXQ0'

function formatUserDate(iso) {
  if (!iso) return ''
  try {
    const loc = locale.value === 'ar' ? 'ar' : locale.value === 'ku' ? 'ku' : 'en'
    const d = new Date(`${iso}T12:00:00`)
    return new Intl.DateTimeFormat(loc, { dateStyle: 'long' }).format(d)
  }
  catch {
    return iso
  }
}

const displayName = computed(() => user.value?.name || t('patientProfile.personal.name'))
const displayEmail = computed(() => user.value?.email || t('patientProfile.personal.email'))
const displayPatientId = computed(() =>
  user.value?.id
    ? `${t('patientProfile.personal.fieldPatientId')}: #${user.value.id}`
    : t('patientProfile.personal.patientId'),
)
const displayBirthdate = computed(() =>
  user.value?.date_of_birth ? formatUserDate(user.value.date_of_birth) : t('patientProfile.personal.birthdate'),
)
const displayBlood = computed(() => user.value?.blood_type || t('patientProfile.personal.bloodType'))
const displayPhone = computed(() => user.value?.phone || t('patientProfile.personal.phone'))
const displayAddress = computed(() => user.value?.address || t('patientProfile.personal.location'))
const displayAvatar = computed(() => user.value?.avatar_url || IMG_PHOTO_PATIENT)

const medicalRows = computed(() =>
  medicalReports.value.map((report) => {
    const firstItem = report.items?.[0]
    const status = firstItem?.status ?? 'normal'
    return {
      id: report.id,
      report,
      dateLabel: formatReportDate(report.reported_at),
      title: firstItem?.test_name ?? t('patientProfile.medical.labResult'),
      subtitle: report.organization?.name
        ? `${t('patientProfile.medical.labResult')} • ${report.organization.name}`
        : t('patientProfile.medical.labResult'),
      statusLabel: labStatusLabel(status),
      tone: labStatusTone(status),
    }
  }),
)

function viewReportDetails(report) {
  if (!report) return
  navigateTo('/test-findings/results', { state: { report } })
}

function formatReportDate(iso) {
  if (!iso) return '—'
  try {
    const loc = locale.value === 'ar' ? 'ar' : locale.value === 'ku' ? 'ku' : 'en'
    return new Intl.DateTimeFormat(loc, { dateStyle: 'medium' }).format(new Date(iso))
  }
  catch {
    return iso
  }
}

function labStatusLabel(status) {
  if (status === 'high') return t('patientProfile.medical.statusHigh')
  if (status === 'low') return t('patientProfile.medical.statusLow')
  return t('patientProfile.medical.statusNormal')
}

function labStatusTone(status) {
  if (status === 'high') return 'amber'
  if (status === 'low') return 'blue'
  return 'green'
}

const localeCodes = /** @type {const} */ (['ar', 'en', 'ku'])

const currentLocaleLabel = computed(() => localeLabel(locale.value))

function localeLabel(code) {
  if (code === 'ar') return t('languageGate.labelArabic')
  if (code === 'ku') return t('languageGate.labelKurdish')
  return t('languageGate.labelEnglish')
}

async function selectLocale(code) {
  if (!localeCodes.includes(code)) return
  persistLocale(code)
  await setLocale(code)
}

function statusBadgeClasses(tone) {
  const map = {
    green: 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300',
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  }
  return map[tone] ?? map.blue
}

function statusDotClasses(tone) {
  const map = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
  }
  return map[tone] ?? map.blue
}

useSeoMeta({
  title: () => t('patientProfile.seoTitle'),
})
</script>
