<template>
  <div class="bg-surface font-body-md text-on-surface min-h-dvh flex flex-col antialiased">
    <ControlPanelHeader />

    <main class="flex-1 px-6 md:px-12 py-8 max-w-7xl mx-auto w-full">
      <header class="mb-8">
        <h1 class="font-h1 text-h1 text-blue-900 dark:text-blue-100 mb-2">
          {{ t('examinationResultsPage.title') }}
        </h1>
        <p class="text-on-surface-variant font-body-md">
          {{ t('examinationResultsPage.subtitle') }}
        </p>
      </header>

      <div class="grid grid-cols-12 gap-6 lg:gap-8">
        <section class="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div class="bg-white dark:bg-slate-900 p-6 border border-outline-variant rounded-xl shadow-sm">
            <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon="user" class="text-tertiary text-xl shrink-0" aria-hidden="true" />
              {{ t('examinationResultsPage.patientInfo.title') }}
            </h2>
            <p class="text-body-sm text-on-surface-variant mb-4">
              {{ t('examinationResultsPage.patientInfo.subtitle') }}
            </p>
            <p v-if="patientLoading" class="text-on-surface-variant font-body-md">
              {{ t('examinationResultsPage.patientInfo.loading') }}
            </p>
            <p v-else-if="patientLoadError" class="text-error text-body-sm" role="alert">
              {{ patientLoadError }}
            </p>
            <dl v-else class="space-y-4">
              <div v-if="patientId">
                <dt class="font-label-caps text-label-caps text-on-surface-variant mb-1">
                  {{ t('examinationResultsPage.patientInfo.patientId') }}
                </dt>
                <dd class="font-body-md font-semibold text-blue-900 dark:text-blue-100 tabular-nums">
                  #{{ patientId }}
                </dd>
              </div>
              <div>
                <dt class="font-label-caps text-label-caps text-on-surface-variant mb-1">
                  {{ t('examinationResultsPage.form.patientName') }}
                </dt>
                <dd class="font-body-md font-semibold text-blue-900 dark:text-blue-100">
                  {{ displayFirstName }}
                </dd>
              </div>
              <div>
                <dt class="font-label-caps text-label-caps text-on-surface-variant mb-1">
                  {{ t('examinationResultsPage.form.patientSurname') }}
                </dt>
                <dd class="font-body-md font-semibold text-blue-900 dark:text-blue-100">
                  {{ displaySurname }}
                </dd>
              </div>
              <div>
                <dt class="font-label-caps text-label-caps text-on-surface-variant mb-1">
                  {{ t('examinationResultsPage.form.birthDate') }}
                </dt>
                <dd class="font-body-md font-semibold text-blue-900 dark:text-blue-100">
                  {{ displayBirthDate }}
                </dd>
              </div>
              <div>
                <dt class="font-label-caps text-label-caps text-on-surface-variant mb-1">
                  {{ t('examinationResultsPage.form.gender') }}
                </dt>
                <dd class="font-body-md font-semibold text-blue-900 dark:text-blue-100">
                  {{ displayGender }}
                </dd>
              </div>
            </dl>
          </div>

          <div class="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 p-4 rounded-xl">
            <div class="flex gap-3">
              <FontAwesomeIcon icon="circle-info" class="text-blue-700 dark:text-blue-300 text-xl shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p class="font-label-caps text-blue-900 dark:text-blue-100 mb-1">{{ t('examinationResultsPage.compliance.title') }}</p>
                <p class="text-body-sm text-blue-800 dark:text-blue-200/90 leading-relaxed">
                  {{ t('examinationResultsPage.compliance.body') }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 p-6 border border-outline-variant rounded-xl shadow-sm">
            <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon="pen-to-square" class="text-tertiary text-xl shrink-0" aria-hidden="true" />
              {{ t('examinationResultsPage.doctorNote.title') }}
            </h2>
            <div>
              <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1">{{
                t('examinationResultsPage.doctorNote.clinicalObservation')
              }}</label>
              <textarea
                v-model="doctorNote"
                class="w-full border border-outline-variant dark:border-slate-600 focus:border-tertiary focus:ring-1 focus:ring-tertiary rounded-lg font-body-md p-3 min-h-[120px] resize-none bg-white dark:bg-slate-950 dark:text-slate-100 outline-none"
                rows="5"
                :placeholder="t('examinationResultsPage.doctorNote.placeholder')"
              />
            </div>
          </div>
        </section>

        <section class="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div class="bg-white dark:bg-slate-900 p-6 border border-outline-variant rounded-xl shadow-sm">
            <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon="stethoscope" class="text-tertiary text-xl shrink-0" aria-hidden="true" />
              {{ t('examinationResultsPage.findingEntry.title') }}
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="sm:col-span-1 col-span-full relative">
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1">{{
                  t('examinationResultsPage.findingEntry.findingName')
                }}</label>
                <AutocompleteCombobox
                  v-model="findingName"
                  :options="findingOptions"
                  :placeholder="t('examinationResultsPage.findingEntry.findingNamePlaceholder')"
                  :aria-label="t('examinationResultsPage.findingEntry.findingName')"
                  :no-results-text="t('examinationResultsPage.combobox.noResults')"
                />
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1">{{
                  t('examinationResultsPage.findingEntry.valueInput')
                }}</label>
                <input
                  v-model="entryValue"
                  class="w-full border border-outline-variant dark:border-slate-600 focus:border-tertiary focus:ring-1 focus:ring-tertiary rounded-lg font-body-md p-3 bg-white dark:bg-slate-950 dark:text-slate-100 outline-none"
                  type="text"
                  :placeholder="t('examinationResultsPage.findingEntry.valuePlaceholder')"
                >
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1">{{
                  t('examinationResultsPage.findingEntry.status')
                }}</label>
                <select
                  v-model="entryStatus"
                  class="w-full border border-outline-variant dark:border-slate-600 focus:border-tertiary focus:ring-1 focus:ring-tertiary rounded-lg font-body-md p-3 appearance-none bg-white dark:bg-slate-950 dark:text-slate-100 outline-none"
                >
                  <option value="normal">{{ t('examinationResultsPage.findingEntry.statusNormal') }}</option>
                  <option value="high" class="text-error">{{ t('examinationResultsPage.findingEntry.statusHigh') }}</option>
                  <option value="low" class="text-blue-600 dark:text-blue-400">{{ t('examinationResultsPage.findingEntry.statusLow') }}</option>
                </select>
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1">{{
                  t('examinationResultsPage.findingEntry.referencePoint')
                }}</label>
                <input
                  v-model="entryReference"
                  class="w-full border border-outline-variant dark:border-slate-600 focus:border-tertiary focus:ring-1 focus:ring-tertiary rounded-lg font-body-md p-3 bg-surface-container-low dark:bg-slate-800 dark:text-slate-100 outline-none"
                  type="text"
                  :placeholder="t('examinationResultsPage.findingEntry.referencePlaceholder')"
                >
              </div>
              <div class="col-span-full flex justify-end mt-2">
                <AppButton
                  type="button"
                  class="bg-tertiary hover:opacity-90 text-on-tertiary font-button py-3 px-8 rounded-full flex items-center gap-2 transition-transform active:scale-[0.98]"
                  @click="addEntry"
                >
                  <FontAwesomeIcon icon="plus" class="text-lg" aria-hidden="true" />
                  {{ t('examinationResultsPage.findingEntry.addResult') }}
                </AppButton>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-800/50 flex justify-between items-center flex-wrap gap-2">
              <span class="font-h3 text-[16px] text-blue-900 dark:text-blue-100">{{ t('examinationResultsPage.entryList.title') }}</span>
              <span class="bg-surface-container dark:bg-slate-700 px-2 py-1 rounded text-[10px] font-bold text-on-surface-variant uppercase tracking-wide">{{
                t('examinationResultsPage.entryList.entriesBadge', { count: pendingItems.length })
              }}</span>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-start border-collapse min-w-[640px]">
                <thead>
                  <tr class="bg-surface-container-low dark:bg-slate-800">
                    <th class="px-6 py-3 font-label-caps text-on-surface-variant">{{ t('examinationResultsPage.table.findingName') }}</th>
                    <th class="px-6 py-3 font-label-caps text-on-surface-variant">{{ t('examinationResultsPage.table.value') }}</th>
                    <th class="px-6 py-3 font-label-caps text-on-surface-variant">{{ t('examinationResultsPage.table.status') }}</th>
                    <th class="px-6 py-3 font-label-caps text-on-surface-variant">{{ t('examinationResultsPage.table.reference') }}</th>
                    <th class="px-6 py-3 font-label-caps text-on-surface-variant text-end">{{ t('examinationResultsPage.table.action') }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant dark:divide-slate-700">
                  <tr v-if="!pendingItems.length">
                    <td colspan="5" class="px-6 py-4 text-body-sm text-on-surface-variant text-center">
                      {{ t('examinationResultsPage.entryList.empty') }}
                    </td>
                  </tr>
                  <tr
                    v-for="(item, index) in pendingItems"
                    :key="item.id"
                    class="hover:bg-surface dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td class="px-6 py-4 font-body-md text-blue-900 dark:text-blue-100 font-semibold">
                      {{ item.finding_name }}
                    </td>
                    <td class="px-6 py-4 font-body-md">{{ item.value }}</td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-bold rounded-md"
                        :class="item.status === 'high'
                          ? 'bg-red-50 dark:bg-red-950/50 text-error'
                          : item.status === 'low'
                            ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                            : 'bg-tertiary/10 text-tertiary'"
                      >
                        {{ statusLabel(item.status) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 font-body-sm text-on-surface-variant">{{ item.reference_point }}</td>
                    <td class="px-6 py-4 text-end">
                      <AppButton
                        type="button"
                        class="text-outline hover:text-error transition-colors p-1 rounded"
                        :title="t('examinationResultsPage.deleteAria')"
                        :aria-label="t('examinationResultsPage.deleteAria')"
                        @click="removeEntry(index)"
                      >
                        <FontAwesomeIcon icon="trash" aria-hidden="true" />
                      </AppButton>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-4 mt-2">
            <AppButton
              type="button"
              class="text-slate-500 dark:text-slate-400 font-button hover:bg-slate-100 dark:hover:bg-slate-800 py-3 px-6 rounded-full transition-colors border border-transparent disabled:opacity-60"
              :disabled="submittingDraft || (!pendingItems.length && !doctorNote.trim())"
              @click="saveDraft"
            >
              {{ t('examinationResultsPage.saveDraft') }}
            </AppButton>
            <p v-if="submitError" class="text-error text-sm col-span-full text-end" role="alert">
              {{ submitError }}
            </p>
            <p v-if="submitSuccess" class="text-tertiary text-sm col-span-full text-end flex items-center gap-2 justify-end">
              <FontAwesomeIcon icon="circle-check" aria-hidden="true" />
              {{ submitSuccessMessage }}
            </p>
            <AppButton
              type="button"
              class="bg-tertiary hover:opacity-90 text-on-tertiary font-button py-3 px-8 rounded-full flex items-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-60"
              :disabled="submitting || (!pendingItems.length && !doctorNote.trim())"
              @click="finishReport"
            >
              {{ t('examinationResultsPage.finishReport') }}
              <FontAwesomeIcon icon="file-lines" aria-hidden="true" />
            </AppButton>
          </div>
        </section>
      </div>
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

const orderId = computed(() => {
  const raw = route.query.order_id
  if (raw == null || raw === '') return null
  const id = Number(raw)
  return Number.isFinite(id) ? id : null
})

const patient = ref(null)
const patientLoading = ref(false)
const patientLoadError = ref('')

const notAvailable = computed(() => t('examinationResultsPage.patientInfo.notAvailable'))

const displayFirstName = computed(() => patient.value?.first_name || notAvailable.value)
const displaySurname = computed(() => patient.value?.surname || notAvailable.value)
const displayBirthDate = computed(() => {
  const iso = patient.value?.date_of_birth
  if (!iso) return notAvailable.value
  return formatPatientDate(iso)
})
const displayGender = computed(() => genderLabel(patient.value?.gender))

const doctorNote = ref('')
const entryValue = ref('')
const entryStatus = ref('normal')
const entryReference = ref('')
const pendingItems = ref([])
const submitting = ref(false)
const submittingDraft = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)
const lastSavedStatus = ref('finalized')

const submitSuccessMessage = computed(() =>
  lastSavedStatus.value === 'draft'
    ? t('examinationResultsPage.draftSuccess')
    : t('examinationResultsPage.submitSuccess'),
)

const FINDING_CATALOG_KEYS = [
  'bloodPressure',
  'heartRate',
  'respiratoryRate',
  'temperature',
  'oxygenSaturation',
  'weight',
  'height',
  'bmi',
  'generalAppearance',
  'cardiovascularExam',
  'respiratoryExam',
  'abdominalExam',
  'neurologicalExam',
  'skinExam',
]

const findingName = ref('')

const findingOptions = computed(() =>
  FINDING_CATALOG_KEYS.map((key) => t(`examinationResultsPage.findingCatalog.${key}`)),
)

useSeoMeta({
  title: () => t('examinationResultsPage.seoTitle'),
})

function formatPatientDate(iso) {
  try {
    const loc = locale.value === 'ar' ? 'ar' : locale.value === 'ku' ? 'ku' : 'en'
    const d = new Date(`${iso}T12:00:00`)
    return new Intl.DateTimeFormat(loc, { dateStyle: 'long' }).format(d)
  }
  catch {
    return iso
  }
}

function genderLabel(value) {
  if (!value) return notAvailable.value
  const key = {
    male: 'genderMale',
    female: 'genderFemale',
    other: 'genderOther',
    'prefer-not-say': 'genderPreferNotSay',
  }[value]
  return key ? t(`examinationResultsPage.form.${key}`) : value
}

async function loadPatient() {
  if (!patientId.value) return
  patientLoadError.value = ''
  patientLoading.value = true
  try {
    const org = await requireOrganization()
    const res = await api(`/api/organizations/${org.id}/patients/${patientId.value}`)
    patient.value = res.patient ?? null
  }
  catch (e) {
    patient.value = null
    patientLoadError.value = e?.data?.message || e?.message || t('examinationResultsPage.patientInfo.errorLoadFailed')
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

let entryId = 0

function addEntry() {
  if (!findingName.value.trim()) return
  pendingItems.value.push({
    id: ++entryId,
    finding_name: findingName.value.trim(),
    value: entryValue.value.trim(),
    status: entryStatus.value,
    reference_point: entryReference.value.trim(),
  })
  findingName.value = ''
  entryValue.value = ''
  entryReference.value = ''
  entryStatus.value = 'normal'
}

function removeEntry(index) {
  pendingItems.value.splice(index, 1)
}

function statusLabel(status) {
  if (status === 'high') return t('examinationResultsPage.badge.high')
  if (status === 'low') return t('examinationResultsPage.badge.low')
  return t('examinationResultsPage.badge.normal')
}

async function submitReport(status) {
  submitError.value = ''
  submitSuccess.value = false
  if (!patientId.value) {
    submitError.value = t('examinationResultsPage.patientInfo.errorNoPatient')
    return
  }
  const busyRef = status === 'draft' ? submittingDraft : submitting
  busyRef.value = true
  try {
    const org = await requireOrganization()
    const body = {
      patient_id: patientId.value,
      order_id: orderId.value,
      doctor_note: doctorNote.value || null,
      status,
      items: pendingItems.value.map(({ finding_name, value, status: itemStatus, reference_point }) => ({
        finding_name,
        value,
        status: itemStatus,
        reference_point,
      })),
    }
    await api(`/api/organizations/${org.id}/examination-results`, {
      method: 'POST',
      body,
    })
    pendingItems.value = []
    doctorNote.value = ''
    lastSavedStatus.value = status
    submitSuccess.value = true
  }
  catch (e) {
    const first = e?.data?.errors && Object.values(e.data.errors).flat()[0]
    submitError.value = first || e?.data?.message || e?.message || 'Could not save report.'
  }
  finally {
    busyRef.value = false
  }
}

function saveDraft() {
  return submitReport('draft')
}

function finishReport() {
  return submitReport('finalized')
}
</script>
