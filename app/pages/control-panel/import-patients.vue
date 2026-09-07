<template>
  <div class="font-body-md text-on-surface bg-surface min-h-dvh flex flex-col">
    <ControlPanelHeader />

    <main class="flex-1 p-6 md:p-8 max-w-3xl mx-auto w-full">
      <div class="mb-8">
        <nav class="flex flex-wrap items-center text-xs text-slate-400 dark:text-slate-500 mb-2 gap-2" aria-label="Breadcrumb">
          <span>{{ t('importPatientsPage.breadcrumbPatients') }}</span>
          <span aria-hidden="true">/</span>
          <span class="text-tertiary font-semibold">{{ t('importPatientsPage.breadcrumbCurrent') }}</span>
        </nav>
        <h1 class="font-h1 text-h1 text-blue-900 dark:text-blue-100">
          {{ t('importPatientsPage.title') }}
        </h1>
        <p class="text-slate-500 dark:text-slate-400 font-body-md mt-1">
          {{ t('importPatientsPage.subtitle', { brand: t('brand.name') }) }}
        </p>
      </div>

      <section
        class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-[0_10px_20px_rgba(0,0,0,0.02)] dark:shadow-none p-6 mb-6"
      >
        <div class="flex items-center gap-3 mb-4">
          <span class="text-tertiary bg-tertiary/10 dark:bg-tertiary/20 p-2 rounded-lg inline-flex" aria-hidden="true">
            <FontAwesomeIcon icon="file-csv" class="text-xl" />
          </span>
          <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100">
            {{ t('importPatientsPage.template.sectionTitle') }}
          </h2>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
          {{ t('importPatientsPage.template.description') }}
        </p>
        <AppButton
          type="button"
          class="px-5 py-2.5 rounded-lg font-button border border-tertiary text-tertiary hover:bg-tertiary/10 transition-colors inline-flex items-center gap-2"
          @click="downloadTemplate"
        >
          <FontAwesomeIcon icon="file-arrow-down" aria-hidden="true" />
          {{ t('importPatientsPage.template.downloadCta') }}
        </AppButton>
      </section>

      <section
        class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-[0_10px_20px_rgba(0,0,0,0.02)] dark:shadow-none p-6"
      >
        <div class="flex items-center gap-3 mb-4">
          <span class="text-tertiary bg-tertiary/10 dark:bg-tertiary/20 p-2 rounded-lg inline-flex" aria-hidden="true">
            <FontAwesomeIcon icon="file-arrow-up" class="text-xl" />
          </span>
          <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100">
            {{ t('importPatientsPage.upload.sectionTitle') }}
          </h2>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
          {{ t('importPatientsPage.upload.description') }}
        </p>

        <p
          v-if="submitError"
          class="rounded-lg border border-error/40 bg-error/10 px-4 py-3 text-sm text-error mb-4"
          role="alert"
        >
          {{ submitError }}
        </p>

        <div
          v-if="result"
          class="rounded-lg border border-tertiary/30 bg-tertiary/10 px-4 py-3 text-sm text-teal-900 dark:text-teal-100 mb-4"
          role="status"
        >
          <p class="font-semibold">
            {{ t('importPatientsPage.result.summary', { imported: result.imported, total: result.total }) }}
          </p>
          <p v-if="result.skipped" class="mt-1">
            {{ t('importPatientsPage.result.skipped', { skipped: result.skipped }) }}
          </p>
          <div v-if="result.errors?.length" class="mt-3 space-y-1">
            <p class="font-semibold">{{ t('importPatientsPage.result.errorsTitle') }}</p>
            <ul class="list-disc list-inside space-y-0.5 max-h-48 overflow-y-auto">
              <li v-for="err in result.errors" :key="err.row">
                {{ t('importPatientsPage.result.rowLabel', { row: err.row }) }}: {{ err.messages.join(' ') }}
              </li>
            </ul>
          </div>
        </div>

        <form class="space-y-4" @submit.prevent="onSubmit">
          <label
            class="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg py-10 px-4 cursor-pointer hover:border-tertiary transition-colors text-center"
          >
            <FontAwesomeIcon icon="cloud-arrow-up" class="text-3xl text-slate-400" aria-hidden="true" />
            <span class="text-sm text-slate-600 dark:text-slate-300">
              {{ selectedFile ? selectedFile.name : t('importPatientsPage.upload.chooseFileCta') }}
            </span>
            <span class="text-xs text-slate-400">{{ t('importPatientsPage.upload.fileHint') }}</span>
            <input
              type="file"
              accept=".csv,text/csv"
              class="sr-only"
              @change="onFileChange"
            >
          </label>

          <div class="flex justify-end">
            <AppButton
              type="submit"
              class="px-10 py-3 rounded-lg font-button bg-tertiary text-on-tertiary hover:opacity-90 shadow-md shadow-tertiary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              :disabled="submitting || !selectedFile"
            >
              <FontAwesomeIcon icon="upload" class="text-lg" aria-hidden="true" />
              {{ submitting ? t('importPatientsPage.upload.importing') : t('importPatientsPage.upload.importCta') }}
            </AppButton>
          </div>
        </form>
      </section>
    </main>

    <footer class="p-8 text-center text-slate-400 dark:text-slate-500 text-xs mt-auto">
      {{ t('importPatientsPage.footer', { year, brand: t('brand.name') }) }}
    </footer>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'staff',
})

const { t } = useI18n()
const { apiUpload, ensureUserLoaded } = useMedDirectApi()
const { requireOrganization } = useActiveOrganization()

const year = new Date().getFullYear()

const selectedFile = ref(null)
const submitting = ref(false)
const submitError = ref('')
const result = ref(null)

useSeoMeta({
  title: () => t('importPatientsPage.seoTitle'),
})

onMounted(() => {
  ensureUserLoaded()
})

function onFileChange(event) {
  const file = event.target.files?.[0] ?? null
  selectedFile.value = file
  submitError.value = ''
  result.value = null
}

const TEMPLATE_HEADERS = [
  'first_name',
  'surname',
  'date_of_birth',
  'gender',
  'national_id',
  'insurance_provider',
  'policy_number',
  'blood_group',
  'allergies',
  'chronic_conditions',
  'phone',
  'email',
]

const TEMPLATE_EXAMPLE_ROW = [
  'John',
  'Doe',
  '1990-05-14',
  'male',
  'A12345678',
  'MediCare Plus',
  'POL-987-221',
  'O+',
  'Penicillin',
  'Hypertension',
  '555-0123',
  'john.doe@example.com',
]

function csvEscape(value) {
  const str = String(value ?? '')
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function downloadTemplate() {
  const csv = [TEMPLATE_HEADERS, TEMPLATE_EXAMPLE_ROW]
    .map((row) => row.map(csvEscape).join(','))
    .join('\r\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'patient-import-template.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

async function onSubmit() {
  if (!selectedFile.value) return

  submitError.value = ''
  result.value = null
  submitting.value = true
  try {
    const org = await requireOrganization()
    const formData = new FormData()
    formData.append('file', selectedFile.value)

    const res = await apiUpload(`/api/organizations/${org.id}/patients/import`, formData)
    result.value = res
    selectedFile.value = null
  }
  catch (e) {
    if (e?.message === 'NO_ORGANIZATION') {
      submitError.value = t('importPatientsPage.errorNoOrganization')
    }
    else {
      const first = e?.data?.errors && Object.values(e.data.errors).flat()[0]
      submitError.value = first || e?.data?.message || t('importPatientsPage.errorImportFailed')
    }
  }
  finally {
    submitting.value = false
  }
}
</script>
