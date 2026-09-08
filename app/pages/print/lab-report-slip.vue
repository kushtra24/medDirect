<template>
  <div class="min-h-screen bg-slate-100 text-slate-800 font-body-md antialiased print:bg-white print:p-0">
    <p class="no-print mx-auto max-w-[800px] px-4 pt-4 text-center text-body-sm text-slate-500">
      {{ t('labReportSlip.nonPrintHint') }}
    </p>

    <div v-if="loading" class="no-print mx-auto max-w-[800px] px-4 py-12 text-center text-body-sm text-slate-500">
      {{ t('labReportSlip.loading') }}
    </div>

    <div v-else-if="loadError" class="no-print mx-auto max-w-[800px] px-4 py-12 text-center text-error" role="alert">
      {{ loadError }}
    </div>

    <div v-else-if="!reports.length" class="no-print mx-auto max-w-[800px] px-4 py-12 text-center text-body-sm text-slate-500">
      {{ t('labReportSlip.noReports') }}
    </div>

    <main v-else class="flex w-full flex-col items-center justify-center p-4 md:p-8 print:p-0">
      <div class="no-print mb-6 flex w-full max-w-[800px] justify-end">
        <AppButton
          type="button"
          class="flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-button text-body-sm text-white hover:opacity-90"
          @click="printSlip"
        >
          <FontAwesomeIcon icon="print" aria-hidden="true" />
          {{ t('labReportSlip.printButton') }}
        </AppButton>
      </div>

      <article
        v-for="(report, index) in reports"
        :key="report.id"
        class="print-area w-full max-w-[800px] border border-slate-200 bg-white p-8 font-body-md shadow-sm md:p-12 print:max-w-none print:border-0 print:shadow-none"
        :class="{ 'mb-8 print:mb-0': index < reports.length - 1 }"
      >
        <!-- Header -->
        <div class="mb-8 flex flex-col gap-6 border-b border-slate-100 pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-center gap-3">
            <div v-if="logoUrl" class="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-slate-100">
              <img :src="logoUrl" :alt="orgName" class="h-full w-full object-contain">
            </div>
            <div v-else class="rounded-lg bg-blue-900 p-2">
              <FontAwesomeIcon icon="notes-medical" class="text-3xl text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 class="font-h3 text-h3 leading-none text-blue-900">
                {{ orgName }}
              </h1>
              <p v-if="orgAddress" class="mt-1 text-body-sm text-slate-500">
                {{ orgAddress }}
              </p>
            </div>
          </div>
          <div class="text-start sm:text-end">
            <h2 class="font-h2 text-h2 uppercase tracking-tighter text-blue-900 opacity-20">
              {{ t('labReportSlip.officialReportTitle') }}
            </h2>
          </div>
        </div>

        <!-- Patient grid -->
        <div class="mb-8 grid grid-cols-1 gap-x-8 gap-y-6 rounded-lg border border-slate-100 bg-slate-50 p-6 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <span class="mb-1 block font-label-caps text-slate-400">{{ t('labReportSlip.patientNameLabel') }}</span>
            <span class="text-body-lg font-bold text-blue-900">{{ patientFullName }}</span>
          </div>
          <div>
            <span class="mb-1 block font-label-caps text-slate-400">{{ t('labReportSlip.dobLabel') }}</span>
            <span class="text-body-md font-medium">{{ patientDobDisplay }}</span>
          </div>
          <div>
            <span class="mb-1 block font-label-caps text-slate-400">{{ t('labReportSlip.genderLabel') }}</span>
            <span class="text-body-md font-medium">{{ patientGenderLabel }}</span>
          </div>
          <div>
            <span class="mb-1 block font-label-caps text-slate-400">{{ t('labReportSlip.patientIdLabel') }}</span>
            <span class="text-body-md font-medium text-teal-600">{{ patientIdDisplay }}</span>
          </div>
          <div>
            <span class="mb-1 block font-label-caps text-slate-400">{{ t('labReportSlip.collectionLabel') }}</span>
            <span class="text-body-md font-medium">{{ reportDateDisplay(report) }}</span>
          </div>
          <div>
            <span class="mb-1 block font-label-caps text-slate-400">{{ t('labReportSlip.reportStatusLabel') }}</span>
            <span class="inline-flex items-center gap-1 font-bold text-teal-600">
              <FontAwesomeIcon icon="circle-check" class="text-[16px]" aria-hidden="true" />
              {{ reportStatusLabel(report) }}
            </span>
          </div>
        </div>

        <!-- Results table (only when items exist) -->
        <div v-if="report.items?.length" class="mb-10 overflow-hidden">
          <table class="w-full border-collapse text-start">
            <thead>
              <tr class="bg-blue-900 text-white">
                <th class="px-4 py-3 font-label-caps text-[11px]">{{ t('labReportSlip.table.testDescription') }}</th>
                <th class="px-4 py-3 font-label-caps text-[11px]">{{ t('labReportSlip.table.result') }}</th>
                <th class="px-4 py-3 font-label-caps text-[11px]">{{ t('labReportSlip.table.referenceRange') }}</th>
                <th class="px-4 py-3 text-end font-label-caps text-[11px]">{{ t('labReportSlip.table.status') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="item in report.items" :key="item.id" class="print:hover:bg-transparent hover:bg-slate-50">
                <td class="px-4 py-4 font-semibold text-blue-900">{{ item.test_name || notAvailable }}</td>
                <td class="px-4 py-4 font-bold" :class="item.status === 'normal' ? 'text-slate-900' : 'text-red-600'">
                  {{ item.value || notAvailable }}
                </td>
                <td class="px-4 py-4 text-body-sm text-slate-500">{{ item.reference_point || notAvailable }}</td>
                <td class="px-4 py-4 text-end">
                  <span class="inline-block rounded px-2 py-1 text-[10px] font-bold uppercase" :class="itemBadgeClass(item.status)">
                    {{ itemStatusLabel(item.status) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Doctor's note -->
        <div
          v-if="report.doctor_note || !report.items?.length"
          class="mb-10 rounded-lg border border-teal-100 bg-teal-50/40 p-6"
        >
          <h4 class="mb-2 flex items-center gap-2 font-label-caps text-teal-700">
            <FontAwesomeIcon icon="circle-info" class="text-[16px]" aria-hidden="true" />
            {{ t('labReportSlip.doctorNoteTitle') }}
          </h4>
          <p class="text-body-sm leading-relaxed text-slate-700">
            {{ report.doctor_note || t('labReportSlip.noFindingsRecorded') }}
          </p>
        </div>

        <!-- Secure PIN -->
        <div class="mb-12 grid items-center gap-6 border-t border-slate-100 pt-8 md:grid-cols-2">
          <p class="text-[12px] leading-tight text-slate-600">
            {{ t('labReportSlip.pinHint') }}
          </p>
          <div class="rounded-lg border-2 border-dashed border-slate-200 p-5 text-center">
            <span class="mb-1 block font-label-caps text-slate-400">{{ t('labReportSlip.securePinLabel') }}</span>
            <span class="font-h2 text-h2 tracking-widest text-blue-900">{{ accessPinDisplay }}</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-slate-100 pt-8">
          <div class="mb-8 grid gap-8 md:grid-cols-2">
            <div>
              <h4 class="mb-2 font-label-caps text-slate-400">{{ t('labReportSlip.disclaimerTitle') }}</h4>
              <p class="text-[11px] italic leading-relaxed text-slate-500">
                {{ t('labReportSlip.disclaimerBody') }}
              </p>
            </div>
            <div class="flex flex-col items-start md:items-end">
              <div class="mb-2 w-48 border-b border-blue-900 pb-6" aria-hidden="true" />
              <span class="text-body-sm font-bold text-blue-900">{{ doctorName(report) }}</span>
              <span class="font-label-caps text-slate-400">{{ t('labReportSlip.signerRoleFallback') }}</span>
            </div>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-2 border-t border-slate-50 pt-4 text-[10px] text-slate-400">
            <span>{{ orgName }}</span>
            <span>{{ t('labReportSlip.footerPage', { current: index + 1, total: reports.length }) }}</span>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
})

const { t, locale } = useI18n()
const route = useRoute()
const { api, ensureUserLoaded } = useMedDirectApi()
const { requireOrganization } = useActiveOrganization()

const loading = ref(true)
const loadError = ref('')
const patient = ref(null)
const organization = ref(null)
const allLabReports = ref([])

const notAvailable = computed(() => t('labReportSlip.notAvailable'))

const reportIdFilter = computed(() => {
  const raw = route.query.report_id
  if (raw == null || raw === '') return null
  const id = Number(raw)
  return Number.isFinite(id) ? id : null
})

const reports = computed(() => {
  if (reportIdFilter.value == null) return allLabReports.value
  return allLabReports.value.filter((r) => r.id === reportIdFilter.value)
})

function localeCode() {
  return locale.value === 'ar' ? 'ar' : locale.value === 'ku' ? 'ku' : 'en'
}

const patientFullName = computed(() =>
  patient.value?.full_name
  || [patient.value?.first_name, patient.value?.surname].filter(Boolean).join(' ')
  || notAvailable.value,
)

const patientIdDisplay = computed(() => (patient.value?.id ? `#${patient.value.id}` : notAvailable.value))

const patientDobDisplay = computed(() => {
  const iso = patient.value?.date_of_birth
  if (!iso) return notAvailable.value
  try {
    const d = new Date(`${iso}T12:00:00`)
    const formatted = new Intl.DateTimeFormat(localeCode(), { dateStyle: 'long' }).format(d)
    const age = Math.floor((Date.now() - d.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    return `${formatted} (${age})`
  }
  catch {
    return iso
  }
})

const patientGenderLabel = computed(() => {
  const gender = patient.value?.gender
  if (!gender) return notAvailable.value
  const key = { male: 'genderMale', female: 'genderFemale', other: 'genderOther' }[gender]
  return key ? t(`labReportSlip.${key}`) : gender
})

const accessPinDisplay = computed(() => patient.value?.access_pin || t('labReportSlip.pinNotIssued'))

const logoUrl = computed(() => {
  const logo = organization.value?.logo
  if (!logo) return ''
  return typeof logo === 'string' ? logo : logo.url || ''
})

const orgName = computed(() => organization.value?.name || t('labReportSlip.defaultInstitutionName'))
const orgAddress = computed(() => organization.value?.address || '')

function reportDateDisplay(report) {
  const iso = report.reported_at || report.created_at
  if (!iso) return notAvailable.value
  try {
    return new Intl.DateTimeFormat(localeCode(), { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
  }
  catch {
    return iso
  }
}

function reportStatusLabel(report) {
  return report.status === 'draft'
    ? t('labReportSlip.reportStatusDraft')
    : t('labReportSlip.reportStatusFinal')
}

function itemStatusLabel(status) {
  if (status === 'high') return t('labReportSlip.badge.high')
  if (status === 'low') return t('labReportSlip.badge.low')
  return t('labReportSlip.badge.normal')
}

function itemBadgeClass(status) {
  if (status === 'high') return 'bg-red-50 text-red-800'
  if (status === 'low') return 'bg-blue-50 text-blue-700'
  return 'bg-teal-50 text-teal-700'
}

function doctorName(report) {
  return report.created_by?.name || notAvailable.value
}

async function loadFromState() {
  if (!import.meta.client) return false
  const state = window.history.state || {}
  const statePatient = state.patient
  const stateLabReports = state.labReports
  if (!statePatient && !stateLabReports) return false

  patient.value = statePatient ?? null
  allLabReports.value = Array.isArray(stateLabReports) ? stateLabReports : []
  organization.value = allLabReports.value[0]?.organization ?? null
  return true
}

async function loadFromStaffApi() {
  const patientId = Number(route.query.patient_id)
  if (!Number.isFinite(patientId)) {
    loadError.value = t('labReportSlip.errorNoPatient')
    return
  }
  await ensureUserLoaded()
  const org = await requireOrganization()
  const [patientRes, orgRes] = await Promise.all([
    api(`/api/organizations/${org.id}/patients/${patientId}`),
    api(`/api/organizations/${org.id}`).catch(() => null),
  ])
  patient.value = patientRes.patient ?? null
  organization.value = orgRes?.profile ?? null
  allLabReports.value = patient.value?.lab_result_reports ?? []
}

onMounted(async () => {
  loading.value = true
  loadError.value = ''
  try {
    const usedState = await loadFromState()
    if (!usedState) {
      await loadFromStaffApi()
    }
  }
  catch (e) {
    if (e?.message === 'NO_ORGANIZATION') {
      loadError.value = t('labReportSlip.errorNoPatient')
    }
    else {
      loadError.value = e?.data?.message || e?.message || t('labReportSlip.errorLoadFailed')
    }
  }
  finally {
    loading.value = false
    if (!loadError.value && route.query.autoprint === '1') {
      nextTick(() => {
        setTimeout(() => window.print(), 450)
      })
    }
  }
})

function printSlip() {
  if (import.meta.client) window.print()
}

useSeoMeta({
  title: () => t('labReportSlip.seoTitle'),
})
</script>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }

  .print-area {
    break-after: page;
  }

  .print-area:last-of-type {
    break-after: auto;
  }

  :deep(html),
  :deep(body) {
    background: white !important;
  }
}

@page {
  margin: 12mm;
  size: A4 portrait;
}
</style>
