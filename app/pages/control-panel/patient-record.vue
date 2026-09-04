<template>
  <div class="bg-surface font-body-md text-on-surface min-h-dvh flex flex-col antialiased">
    <ControlPanelHeader />

    <main class="flex-1 px-6 md:px-12 py-8 max-w-7xl mx-auto w-full">
      <div class="mb-6">
        <AppButton
          to="/control-panel/search-patient"
          class="inline-flex items-center gap-xs text-on-surface-variant hover:text-tertiary font-button text-body-sm transition-colors"
        >
          <FontAwesomeIcon icon="arrow-left" aria-hidden="true" />
          {{ t('patientRecordPage.backToSearch') }}
        </AppButton>
      </div>

      <p v-if="patientLoading" class="text-on-surface-variant font-body-md">
        {{ t('patientRecordPage.loading') }}
      </p>

      <p v-else-if="patientLoadError" class="text-error text-body-sm" role="alert">
        {{ patientLoadError }}
      </p>

      <template v-else-if="patient">
        <section class="bg-white dark:bg-slate-900 border border-outline-variant rounded-xl p-lg shadow-sm mb-lg">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-lg">
            <div class="flex items-center gap-lg min-w-0">
              <div
                class="h-16 w-16 rounded-full bg-secondary-fixed dark:bg-secondary/40 flex items-center justify-center text-secondary dark:text-secondary-fixed font-bold text-h3 shrink-0"
              >
                {{ patientInitials }}
              </div>
              <div class="min-w-0">
                <h1 class="font-h1 text-h2 text-secondary truncate">{{ patientFullName }}</h1>
                <div class="flex flex-wrap gap-md mt-xs">
                  <span class="flex items-center gap-xs text-body-sm text-on-primary-container">
                    <FontAwesomeIcon icon="calendar-days" class="text-[18px] shrink-0" aria-hidden="true" />
                    {{ patientDobDisplay }}
                  </span>
                  <span class="flex items-center gap-xs text-body-sm text-on-primary-container border-l border-slate-200 dark:border-slate-700 ps-md">
                    <FontAwesomeIcon icon="user" class="text-[18px] shrink-0" aria-hidden="true" />
                    {{ patientGenderLabel }}
                  </span>
                  <span class="flex items-center gap-xs text-body-sm text-on-primary-container border-l border-slate-200 dark:border-slate-700 ps-md">
                    <FontAwesomeIcon icon="fingerprint" class="text-[18px] shrink-0" aria-hidden="true" />
                    {{ t('patientRecordPage.idPrefix') }}
                    #{{ patient.id }}
                  </span>
                  <span
                    class="flex items-center gap-xs text-body-sm px-2 py-0.5 rounded-full text-xs font-semibold"
                    :class="patient.is_claimed
                      ? 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300'
                      : 'bg-surface-container dark:bg-slate-800 text-on-primary-container'"
                  >
                    {{ patient.is_claimed ? t('patientRecordPage.claimed') : t('patientRecordPage.unclaimed') }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex gap-sm shrink-0">
              <AppButton
                :to="examinationResultsPath"
                class="flex items-center gap-xs px-md py-sm bg-secondary text-on-secondary rounded-lg font-button text-body-sm hover:opacity-90 transition-opacity"
              >
                <FontAwesomeIcon icon="stethoscope" aria-hidden="true" />
                {{ t('searchPatientPage.newExaminationResult') }}
              </AppButton>
              <AppButton
                :to="labResultsPath"
                class="flex items-center gap-xs px-md py-sm bg-tertiary text-on-tertiary rounded-lg font-button text-body-sm hover:opacity-90 transition-opacity"
              >
                <FontAwesomeIcon icon="plus" aria-hidden="true" />
                {{ t('searchPatientPage.newLabOrder') }}
              </AppButton>
            </div>
          </div>
        </section>

        <div class="grid grid-cols-12 gap-6 lg:gap-8">
          <section class="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div class="bg-white dark:bg-slate-900 p-6 border border-outline-variant rounded-xl shadow-sm">
              <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon="id-card" class="text-tertiary text-xl shrink-0" aria-hidden="true" />
                {{ t('patientRecordPage.details.title') }}
              </h2>
              <dl class="space-y-4">
                <div>
                  <dt class="font-label-caps text-label-caps text-on-surface-variant mb-1">{{ t('patientRecordPage.details.phone') }}</dt>
                  <dd class="font-body-md font-semibold text-blue-900 dark:text-blue-100">{{ patient.phone || notAvailable }}</dd>
                </div>
                <div>
                  <dt class="font-label-caps text-label-caps text-on-surface-variant mb-1">{{ t('patientRecordPage.details.email') }}</dt>
                  <dd class="font-body-md font-semibold text-blue-900 dark:text-blue-100 break-all">{{ patient.email || notAvailable }}</dd>
                </div>
                <div>
                  <dt class="font-label-caps text-label-caps text-on-surface-variant mb-1">{{ t('patientRecordPage.details.nationalId') }}</dt>
                  <dd class="font-body-md font-semibold text-blue-900 dark:text-blue-100">{{ patient.national_id || notAvailable }}</dd>
                </div>
                <div>
                  <dt class="font-label-caps text-label-caps text-on-surface-variant mb-1">{{ t('patientRecordPage.details.insurance') }}</dt>
                  <dd class="font-body-md font-semibold text-blue-900 dark:text-blue-100">{{ patient.insurance_provider || notAvailable }}</dd>
                </div>
                <div>
                  <dt class="font-label-caps text-label-caps text-on-surface-variant mb-1">{{ t('patientRecordPage.details.policyNumber') }}</dt>
                  <dd class="font-body-md font-semibold text-blue-900 dark:text-blue-100">{{ patient.policy_number || notAvailable }}</dd>
                </div>
                <div>
                  <dt class="font-label-caps text-label-caps text-on-surface-variant mb-1">{{ t('patientRecordPage.details.registeredOn') }}</dt>
                  <dd class="font-body-md font-semibold text-blue-900 dark:text-blue-100">{{ patientRegisteredDisplay }}</dd>
                </div>
              </dl>
            </div>

            <div class="bg-white dark:bg-slate-900 p-6 border border-outline-variant rounded-xl shadow-sm">
              <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon="droplet" class="text-tertiary text-xl shrink-0" aria-hidden="true" />
                {{ t('patientRecordPage.clinical.title') }}
              </h2>
              <dl class="space-y-4">
                <div>
                  <dt class="font-label-caps text-label-caps text-on-surface-variant mb-1">{{ t('patientRecordPage.clinical.bloodGroup') }}</dt>
                  <dd class="font-body-md font-semibold text-blue-900 dark:text-blue-100">{{ patient.blood_group || notAvailable }}</dd>
                </div>
                <div>
                  <dt class="font-label-caps text-label-caps text-on-surface-variant mb-1">{{ t('patientRecordPage.clinical.allergies') }}</dt>
                  <dd class="font-body-md text-blue-900 dark:text-blue-100 whitespace-pre-line">{{ patient.allergies || t('patientRecordPage.clinical.noneRecorded') }}</dd>
                </div>
                <div>
                  <dt class="font-label-caps text-label-caps text-on-surface-variant mb-1">{{ t('patientRecordPage.clinical.chronicConditions') }}</dt>
                  <dd class="font-body-md text-blue-900 dark:text-blue-100 whitespace-pre-line">{{ patient.chronic_conditions || t('patientRecordPage.clinical.noneRecorded') }}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section class="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div>
              <div class="flex items-center justify-between mb-md flex-wrap gap-2">
                <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100 flex items-center gap-2">
                  <FontAwesomeIcon icon="stethoscope" class="text-tertiary text-xl shrink-0" aria-hidden="true" />
                  {{ t('patientRecordPage.examSection.title') }}
                </h2>
                <div class="flex items-center gap-sm shrink-0">
                  <span class="px-3 py-1 bg-surface-container dark:bg-slate-800 rounded-full text-xs font-semibold text-on-primary-container">
                    {{ t('patientRecordPage.showingRecords', { count: examReports.length }) }}
                  </span>
                  <AppButton
                    v-if="examReports.length"
                    type="button"
                    class="flex items-center gap-xs px-sm py-1 rounded-full text-xs font-semibold bg-blue-900 text-white hover:opacity-90"
                    :aria-label="t('patientRecordPage.examSection.printAllAria')"
                    @click="printAllExamReports"
                  >
                    <FontAwesomeIcon icon="print" aria-hidden="true" />
                    {{ t('patientRecordPage.examSection.printAll') }}
                  </AppButton>
                </div>
              </div>
              <p v-if="!examReports.length" class="text-on-surface-variant text-body-sm bg-white dark:bg-slate-900 border border-outline-variant rounded-xl p-lg">
                {{ t('patientRecordPage.examSection.empty') }}
              </p>
              <div v-else class="flex flex-col gap-4">
                <ReportCard
                  v-for="report in examReports"
                  :key="`exam-${report.id}`"
                  :report="report"
                  item-name-field="finding_name"
                  :not-available="notAvailable"
                >
                  <template #actions>
                    <AppButton
                      type="button"
                      class="flex items-center justify-center h-7 w-7 rounded-full text-on-surface-variant hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
                      :aria-label="t('patientRecordPage.printReportAria')"
                      @click="printExamReport(report)"
                    >
                      <FontAwesomeIcon icon="print" aria-hidden="true" />
                    </AppButton>
                  </template>
                </ReportCard>
              </div>
            </div>

                        <div>
              <div class="flex items-center justify-between mb-md flex-wrap gap-2">
                <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100 flex items-center gap-2">
                  <FontAwesomeIcon icon="microscope" class="text-tertiary text-xl shrink-0" aria-hidden="true" />
                  {{ t('patientRecordPage.labSection.title') }}
                </h2>
                <span class="px-3 py-1 bg-surface-container dark:bg-slate-800 rounded-full text-xs font-semibold text-on-primary-container">
                  {{ t('patientRecordPage.showingRecords', { count: labReports.length }) }}
                </span>
              </div>
              <p v-if="!labReports.length" class="text-on-surface-variant text-body-sm bg-white dark:bg-slate-900 border border-outline-variant rounded-xl p-lg">
                {{ t('patientRecordPage.labSection.empty') }}
              </p>
              <div v-else class="flex flex-col gap-4">
                <ReportCard
                  v-for="report in labReports"
                  :key="`lab-${report.id}`"
                  :report="report"
                  item-name-field="test_name"
                  :not-available="notAvailable"
                />
              </div>
            </div>
          </section>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'staff',
})

const { t, locale } = useI18n()
const { api, ensureUserLoaded } = useMedDirectApi()
const { requireOrganization } = useActiveOrganization()
const route = useRoute()

const patientId = computed(() => {
  const raw = route.query.patient_id
  if (raw == null || raw === '') return null
  const id = Number(raw)
  return Number.isFinite(id) ? id : null
})

const patient = ref(null)
const patientLoading = ref(false)
const patientLoadError = ref('')

const notAvailable = computed(() => t('patientRecordPage.notAvailable'))

const labResultsPath = computed(() => ({ path: '/control-panel/lab-results', query: { patient_id: String(patientId.value) } }))
const examinationResultsPath = computed(() => ({ path: '/control-panel/examination-results', query: { patient_id: String(patientId.value) } }))

const labReports = computed(() => patient.value?.lab_result_reports ?? [])
const examReports = computed(() => patient.value?.examination_result_reports ?? [])

const patientFullName = computed(() =>
  patient.value?.full_name
  || [patient.value?.first_name, patient.value?.surname].filter(Boolean).join(' ')
  || t('patientRecordPage.unknownPatient'),
)

const patientInitials = computed(() => {
  const parts = [patient.value?.first_name, patient.value?.surname].filter(Boolean)
  if (!parts.length) return '?'
  return parts.map((p) => p.charAt(0).toUpperCase()).join('').slice(0, 2)
})

function localeCode() {
  return locale.value === 'ar' ? 'ar' : locale.value === 'ku' ? 'ku' : 'en'
}

const patientDobDisplay = computed(() => {
  const iso = patient.value?.date_of_birth
  if (!iso) return notAvailable.value
  try {
    const d = new Date(`${iso}T12:00:00`)
    const formatted = new Intl.DateTimeFormat(localeCode(), { dateStyle: 'long' }).format(d)
    const age = Math.floor((Date.now() - d.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    return t('patientRecordPage.dobWithAge', { date: formatted, age })
  }
  catch {
    return iso
  }
})

const patientGenderLabel = computed(() => {
  const gender = patient.value?.gender
  if (!gender) return notAvailable.value
  const key = { male: 'genderMale', female: 'genderFemale', other: 'genderOther' }[gender]
  return key ? t(`patientRecordPage.${key}`) : gender
})

const patientRegisteredDisplay = computed(() => {
  const iso = patient.value?.created_at
  if (!iso) return notAvailable.value
  try {
    return new Intl.DateTimeFormat(localeCode(), { dateStyle: 'long' }).format(new Date(iso))
  }
  catch {
    return iso
  }
})

function printExamReport(report) {
  if (!import.meta.client || !patientId.value) return
  const url = `${window.location.origin}/print/examination-result-slip?patient_id=${patientId.value}&report_id=${report.id}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

function printAllExamReports() {
  if (!import.meta.client || !patientId.value) return
  const url = `${window.location.origin}/print/examination-result-slip?patient_id=${patientId.value}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

async function loadPatient() {
  if (!patientId.value) {
    patientLoadError.value = t('patientRecordPage.errorNoPatient')
    return
  }
  patientLoadError.value = ''
  patientLoading.value = true
  try {
    const org = await requireOrganization()
    const res = await api(`/api/organizations/${org.id}/patients/${patientId.value}`)
    patient.value = res.patient ?? null
  }
  catch (e) {
    patient.value = null
    patientLoadError.value = e?.data?.message || e?.message || t('patientRecordPage.errorLoadFailed')
  }
  finally {
    patientLoading.value = false
  }
}

onMounted(async () => {
  await ensureUserLoaded()
  await loadPatient()
})

watch(patientId, async () => {
  await loadPatient()
})

useSeoMeta({
  title: () => t('patientRecordPage.seoTitle'),
})
</script>
