<template>
  <div class="bg-surface font-body-md text-on-surface min-h-dvh flex flex-col antialiased">
    <ControlPanelHeader />

    <main class="flex-1 px-6 md:px-12 py-8 max-w-7xl mx-auto w-full">
      <header class="mb-8">
        <h1 class="font-h1 text-h1 text-blue-900 dark:text-blue-100 mb-2">
          {{ t('labResultsPage.title') }}
        </h1>
        <p class="text-on-surface-variant font-body-md">
          {{ t('labResultsPage.subtitle') }}
        </p>
      </header>

      <div class="grid grid-cols-12 gap-6 lg:gap-8">
        <section class="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div class="bg-white dark:bg-slate-900 p-6 border border-outline-variant rounded-xl shadow-sm">
            <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon="user" class="text-tertiary text-xl shrink-0" aria-hidden="true" />
              {{ t('labResultsPage.patientInfo.title') }}
            </h2>
            <div class="space-y-4">
              <div>
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1">{{
                  t('labResultsPage.form.patientName')
                }}</label>
                <input
                  class="w-full border border-outline-variant dark:border-slate-600 focus:border-tertiary focus:ring-1 focus:ring-tertiary rounded-lg font-body-md p-3 bg-white dark:bg-slate-950 dark:text-slate-100 outline-none"
                  type="text"
                  :placeholder="t('labResultsPage.form.patientNamePlaceholder')"
                >
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1">{{
                  t('labResultsPage.form.patientSurname')
                }}</label>
                <input
                  class="w-full border border-outline-variant dark:border-slate-600 focus:border-tertiary focus:ring-1 focus:ring-tertiary rounded-lg font-body-md p-3 bg-white dark:bg-slate-950 dark:text-slate-100 outline-none"
                  type="text"
                  :placeholder="t('labResultsPage.form.patientSurnamePlaceholder')"
                >
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1">{{
                  t('labResultsPage.form.birthDate')
                }}</label>
                <input
                  class="w-full border border-outline-variant dark:border-slate-600 focus:border-tertiary focus:ring-1 focus:ring-tertiary rounded-lg font-body-md p-3 bg-white dark:bg-slate-950 dark:text-slate-100 outline-none"
                  type="date"
                >
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1">{{
                  t('labResultsPage.form.gender')
                }}</label>
                <select
                  class="w-full border border-outline-variant dark:border-slate-600 focus:border-tertiary focus:ring-1 focus:ring-tertiary rounded-lg font-body-md p-3 appearance-none bg-white dark:bg-slate-950 dark:text-slate-100 outline-none"
                >
                  <option value="" disabled selected>{{ t('labResultsPage.form.selectGender') }}</option>
                  <option value="male">{{ t('labResultsPage.form.genderMale') }}</option>
                  <option value="female">{{ t('labResultsPage.form.genderFemale') }}</option>
                  <option value="other">{{ t('labResultsPage.form.genderOther') }}</option>
                  <option value="prefer-not-say">{{ t('labResultsPage.form.genderPreferNotSay') }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 p-4 rounded-xl">
            <div class="flex gap-3">
              <FontAwesomeIcon icon="circle-info" class="text-blue-700 dark:text-blue-300 text-xl shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p class="font-label-caps text-blue-900 dark:text-blue-100 mb-1">{{ t('labResultsPage.compliance.title') }}</p>
                <p class="text-body-sm text-blue-800 dark:text-blue-200/90 leading-relaxed">
                  {{ t('labResultsPage.compliance.body') }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 p-6 border border-outline-variant rounded-xl shadow-sm">
            <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon="pen-to-square" class="text-tertiary text-xl shrink-0" aria-hidden="true" />
              {{ t('labResultsPage.doctorNote.title') }}
            </h2>
            <div>
              <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1">{{
                t('labResultsPage.doctorNote.clinicalObservation')
              }}</label>
              <textarea
                class="w-full border border-outline-variant dark:border-slate-600 focus:border-tertiary focus:ring-1 focus:ring-tertiary rounded-lg font-body-md p-3 min-h-[120px] resize-none bg-white dark:bg-slate-950 dark:text-slate-100 outline-none"
                rows="5"
                :placeholder="t('labResultsPage.doctorNote.placeholder')"
              />
            </div>
          </div>
        </section>

        <section class="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div class="bg-white dark:bg-slate-900 p-6 border border-outline-variant rounded-xl shadow-sm">
            <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon="microscope" class="text-tertiary text-xl shrink-0" aria-hidden="true" />
              {{ t('labResultsPage.testEntry.title') }}
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="sm:col-span-1 col-span-full relative">
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1">{{
                  t('labResultsPage.testEntry.testName')
                }}</label>
                <AutocompleteCombobox
                  v-model="testName"
                  :options="labTestOptions"
                  :placeholder="t('labResultsPage.testEntry.testNamePlaceholder')"
                  :aria-label="t('labResultsPage.testEntry.testName')"
                  :no-results-text="t('labResultsPage.combobox.noResults')"
                />
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1">{{
                  t('labResultsPage.testEntry.valueInput')
                }}</label>
                <input
                  class="w-full border border-outline-variant dark:border-slate-600 focus:border-tertiary focus:ring-1 focus:ring-tertiary rounded-lg font-body-md p-3 bg-white dark:bg-slate-950 dark:text-slate-100 outline-none"
                  type="text"
                  :placeholder="t('labResultsPage.testEntry.valuePlaceholder')"
                >
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1">{{
                  t('labResultsPage.testEntry.status')
                }}</label>
                <select
                  class="w-full border border-outline-variant dark:border-slate-600 focus:border-tertiary focus:ring-1 focus:ring-tertiary rounded-lg font-body-md p-3 appearance-none bg-white dark:bg-slate-950 dark:text-slate-100 outline-none"
                >
                  <option>{{ t('labResultsPage.testEntry.statusNormal') }}</option>
                  <option class="text-error">{{ t('labResultsPage.testEntry.statusHigh') }}</option>
                  <option class="text-blue-600 dark:text-blue-400">{{ t('labResultsPage.testEntry.statusLow') }}</option>
                </select>
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-1">{{
                  t('labResultsPage.testEntry.referencePoint')
                }}</label>
                <input
                  class="w-full border border-outline-variant dark:border-slate-600 focus:border-tertiary focus:ring-1 focus:ring-tertiary rounded-lg font-body-md p-3 bg-surface-container-low dark:bg-slate-800 dark:text-slate-100 outline-none"
                  type="text"
                  :placeholder="t('labResultsPage.testEntry.referencePlaceholder')"
                >
              </div>
              <div class="col-span-full flex justify-end mt-2">
                <button
                  type="button"
                  class="bg-tertiary hover:opacity-90 text-on-tertiary font-button py-3 px-8 rounded-full flex items-center gap-2 transition-transform active:scale-[0.98]"
                >
                  <FontAwesomeIcon icon="plus" class="text-lg" aria-hidden="true" />
                  {{ t('labResultsPage.testEntry.addResult') }}
                </button>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-800/50 flex justify-between items-center flex-wrap gap-2">
              <span class="font-h3 text-[16px] text-blue-900 dark:text-blue-100">{{ t('labResultsPage.entryList.title') }}</span>
              <span class="bg-surface-container dark:bg-slate-700 px-2 py-1 rounded text-[10px] font-bold text-on-surface-variant uppercase tracking-wide">{{
                t('labResultsPage.entryList.entriesBadge', { count: 3 })
              }}</span>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-start border-collapse min-w-[640px]">
                <thead>
                  <tr class="bg-surface-container-low dark:bg-slate-800">
                    <th class="px-6 py-3 font-label-caps text-on-surface-variant">{{ t('labResultsPage.table.testName') }}</th>
                    <th class="px-6 py-3 font-label-caps text-on-surface-variant">{{ t('labResultsPage.table.value') }}</th>
                    <th class="px-6 py-3 font-label-caps text-on-surface-variant">{{ t('labResultsPage.table.status') }}</th>
                    <th class="px-6 py-3 font-label-caps text-on-surface-variant">{{ t('labResultsPage.table.reference') }}</th>
                    <th class="px-6 py-3 font-label-caps text-on-surface-variant text-end">{{ t('labResultsPage.table.action') }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant dark:divide-slate-700">
                  <tr class="hover:bg-surface dark:hover:bg-slate-800/40 transition-colors">
                    <td class="px-6 py-4 font-body-md text-blue-900 dark:text-blue-100 font-semibold">
                      {{ t('labResultsPage.rows.glucose.name') }}
                    </td>
                    <td class="px-6 py-4 font-body-md">{{ t('labResultsPage.rows.glucose.value') }}</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1 px-2 py-1 bg-red-50 dark:bg-red-950/50 text-error text-[12px] font-bold rounded-md">
                        <FontAwesomeIcon icon="arrow-trend-up" class="text-[14px]" aria-hidden="true" />
                        {{ t('labResultsPage.badge.high') }}
                      </span>
                    </td>
                    <td class="px-6 py-4 font-body-sm text-on-surface-variant">{{ t('labResultsPage.rows.glucose.reference') }}</td>
                    <td class="px-6 py-4 text-end">
                      <button type="button" class="text-outline hover:text-error transition-colors p-1 rounded" :title="t('labResultsPage.deleteAria')" :aria-label="t('labResultsPage.deleteAria')">
                        <FontAwesomeIcon icon="trash" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                  <tr class="hover:bg-surface dark:hover:bg-slate-800/40 transition-colors">
                    <td class="px-6 py-4 font-body-md text-blue-900 dark:text-blue-100 font-semibold">
                      {{ t('labResultsPage.rows.a1c.name') }}
                    </td>
                    <td class="px-6 py-4 font-body-md">{{ t('labResultsPage.rows.a1c.value') }}</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1 px-2 py-1 bg-tertiary/10 text-tertiary text-[12px] font-bold rounded-md">
                        <FontAwesomeIcon icon="circle-check" class="text-[14px]" aria-hidden="true" />
                        {{ t('labResultsPage.badge.normal') }}
                      </span>
                    </td>
                    <td class="px-6 py-4 font-body-sm text-on-surface-variant">{{ t('labResultsPage.rows.a1c.reference') }}</td>
                    <td class="px-6 py-4 text-end">
                      <button type="button" class="text-outline hover:text-error transition-colors p-1 rounded" :title="t('labResultsPage.deleteAria')" :aria-label="t('labResultsPage.deleteAria')">
                        <FontAwesomeIcon icon="trash" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                  <tr class="hover:bg-surface dark:hover:bg-slate-800/40 transition-colors">
                    <td class="px-6 py-4 font-body-md text-blue-900 dark:text-blue-100 font-semibold">
                      {{ t('labResultsPage.rows.creatinine.name') }}
                    </td>
                    <td class="px-6 py-4 font-body-md">{{ t('labResultsPage.rows.creatinine.value') }}</td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-1 px-2 py-1 bg-tertiary/10 text-tertiary text-[12px] font-bold rounded-md">
                        <FontAwesomeIcon icon="circle-check" class="text-[14px]" aria-hidden="true" />
                        {{ t('labResultsPage.badge.normal') }}
                      </span>
                    </td>
                    <td class="px-6 py-4 font-body-sm text-on-surface-variant">{{ t('labResultsPage.rows.creatinine.reference') }}</td>
                    <td class="px-6 py-4 text-end">
                      <button type="button" class="text-outline hover:text-error transition-colors p-1 rounded" :title="t('labResultsPage.deleteAria')" :aria-label="t('labResultsPage.deleteAria')">
                        <FontAwesomeIcon icon="trash" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-4 mt-2">
            <button
              type="button"
              class="text-slate-500 dark:text-slate-400 font-button hover:bg-slate-100 dark:hover:bg-slate-800 py-3 px-6 rounded-full transition-colors border border-transparent"
            >
              {{ t('labResultsPage.saveDraft') }}
            </button>
            <button
              type="button"
              class="bg-blue-900 hover:bg-blue-950 dark:bg-blue-800 dark:hover:bg-blue-900 text-white font-button py-4 px-10 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {{ t('labResultsPage.finishReport') }}
              <FontAwesomeIcon icon="file-lines" aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n()

const TEST_CATALOG_KEYS = [
  'glucoseFasting',
  'glucoseRandom',
  'hba1c',
  'creatinine',
  'bun',
  'sodium',
  'potassium',
  'tsh',
  'cbc',
  'lipidPanel',
  'alt',
  'ast',
  'crp',
  'ferritin',
  'vitaminD',
]

const testName = ref('')

const labTestOptions = computed(() =>
  TEST_CATALOG_KEYS.map((key) => t(`labResultsPage.testCatalog.${key}`)),
)

useSeoMeta({
  title: () => t('labResultsPage.seoTitle'),
})
</script>
