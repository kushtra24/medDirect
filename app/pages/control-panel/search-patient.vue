<template>
  <div class="font-body-md text-on-surface bg-surface min-h-dvh">
    <header
      class="fixed top-0 w-full z-40 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-between px-6 h-16 w-full font-manrope antialiased tracking-tight"
    >
      <div class="flex items-center gap-xl min-w-0">
        <AppButton
          to="/control-panel"
          class="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full shrink-0"
          :aria-label="t('searchPatientPage.backAria')"
        >
          <FontAwesomeIcon icon="arrow-left" class="text-lg" aria-hidden="true" />
        </AppButton>
        <span class="text-lg font-bold text-blue-900 dark:text-blue-400 truncate">{{ t('searchPatientPage.portalBrand') }}</span>
      </div>
      <div class="flex items-center gap-md shrink-0">
        <AppButton
          type="button"
          class="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
          :aria-label="t('searchPatientPage.notificationsAria')"
        >
          <FontAwesomeIcon icon="bell" class="text-lg" aria-hidden="true" />
        </AppButton>
        <AppButton
          type="button"
          class="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
          :aria-label="t('searchPatientPage.settingsAria')"
        >
          <FontAwesomeIcon icon="gear" class="text-lg" aria-hidden="true" />
        </AppButton>
        <div class="h-8 w-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
          <img
            class="w-full h-full object-cover"
            :alt="t('searchPatientPage.profileAlt')"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsKhCkA6WHLHBzGYOaqwD6E0BluqesYE3-L1wX9-oE5a1aigOAetalIkgmnmPUJbHj9Jy1O3WvrddIGTk8ciD2r3IU5AbNfs6pwdAr9iE_WiD21ob9hYE69vAfjD_SGYXBZK3CyOlZ8UQ4lXNhXk2mDrqWxHGvbMX3LpF3qekRp2AkmDTqFjL0J3t5TxDrexUvPPKOFV_wSLr1-5l3HohrQtK2XTojccGGxoMR3MnGTCcC8KmFXdRWhlLzSEmrvzfJ5_ZB1Vg75N8"
          >
        </div>
      </div>
    </header>

    <main class="pt-24 px-6 pb-xl min-h-dvh">
      <div class="max-w-container-max mx-auto">
        <div class="mb-lg">
          <h1 class="font-h1 text-h1 text-on-surface mb-xs">{{ t('searchPatientPage.title') }}</h1>
          <p class="text-on-primary-container font-body-md">{{ t('searchPatientPage.subtitle') }}</p>
        </div>

        <section class="bg-white dark:bg-slate-900 border border-outline-variant rounded-xl p-lg shadow-sm mb-lg">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-lg items-end">
            <div class="space-y-base">
              <label class="font-label-caps text-label-caps text-on-primary-container">{{
                t('searchPatientPage.form.patientName')
              }}</label>
              <input
                class="w-full border border-outline-variant dark:border-slate-700 rounded-lg px-md py-2 text-body-md focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none bg-white dark:bg-slate-950 dark:text-slate-100"
                type="text"
                :placeholder="t('searchPatientPage.form.patientNamePlaceholder')"
              >
            </div>
            <div class="space-y-base">
              <label class="font-label-caps text-label-caps text-on-primary-container">{{
                t('searchPatientPage.form.surname')
              }}</label>
              <input
                class="w-full border border-outline-variant dark:border-slate-700 rounded-lg px-md py-2 text-body-md focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none bg-white dark:bg-slate-950 dark:text-slate-100"
                type="text"
                :placeholder="t('searchPatientPage.form.surnamePlaceholder')"
              >
            </div>
            <div class="space-y-base">
              <label class="font-label-caps text-label-caps text-on-primary-container">{{
                t('searchPatientPage.form.birthdate')
              }}</label>
              <input
                class="w-full border border-outline-variant dark:border-slate-700 rounded-lg px-md py-2 text-body-md focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none bg-white dark:bg-slate-950 dark:text-slate-100"
                type="date"
              >
            </div>
            <div class="space-y-base">
              <label class="font-label-caps text-label-caps text-on-primary-container">{{
                t('searchPatientPage.form.gender')
              }}</label>
              <select
                class="w-full border border-outline-variant dark:border-slate-700 rounded-lg px-md py-2 text-body-md focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none appearance-none bg-white dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="">{{ t('searchPatientPage.form.selectGender') }}</option>
                <option value="male">{{ t('searchPatientPage.form.male') }}</option>
                <option value="female">{{ t('searchPatientPage.form.female') }}</option>
                <option value="other">{{ t('searchPatientPage.form.other') }}</option>
              </select>
            </div>
            <div>
              <AppButton
                type="button"
                class="w-full bg-secondary hover:bg-on-secondary-fixed-variant text-white font-button text-button py-[10px] rounded-lg transition-colors flex items-center justify-center gap-xs shadow-sm"
              >
                <FontAwesomeIcon icon="magnifying-glass" aria-hidden="true" />
                {{ t('searchPatientPage.form.search') }}
              </AppButton>
            </div>
          </div>
        </section>

        <div class="space-y-lg">
          <div class="bg-white dark:bg-slate-900 border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div class="p-lg border-b border-surface-container dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-lg">
              <div class="flex items-center gap-lg min-w-0">
                <div
                  class="h-16 w-16 rounded-full bg-secondary-fixed dark:bg-secondary/40 flex items-center justify-center text-secondary dark:text-secondary-fixed font-bold text-h3 shrink-0"
                >
                  {{ t('searchPatientPage.patient.initials') }}
                </div>
                <div class="min-w-0">
                  <h3 class="font-h3 text-h3 text-secondary">{{ t('searchPatientPage.patient.fullName') }}</h3>
                  <div class="flex flex-wrap gap-md mt-xs">
                    <span class="flex items-center gap-xs text-body-sm text-on-primary-container">
                      <FontAwesomeIcon icon="calendar-days" class="text-[18px] shrink-0" aria-hidden="true" />
                      {{ t('searchPatientPage.patient.dobDisplay') }}
                    </span>
                    <span
                      class="flex items-center gap-xs text-body-sm text-on-primary-container border-l border-slate-200 dark:border-slate-700 ps-md"
                    >
                      <FontAwesomeIcon icon="user" class="text-[18px] shrink-0" aria-hidden="true" />
                      {{ t('searchPatientPage.patient.genderLabel') }}
                    </span>
                    <span
                      class="flex items-center gap-xs text-body-sm text-on-primary-container border-l border-slate-200 dark:border-slate-700 ps-md"
                    >
                      <FontAwesomeIcon icon="fingerprint" class="text-[18px] shrink-0" aria-hidden="true" />
                      {{ t('searchPatientPage.patient.idPrefix') }}
                      {{ t('searchPatientPage.patient.idValue') }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex gap-sm shrink-0">
                <AppButton
                  to="/control-panel/lab-results"
                  class="flex items-center gap-xs px-md py-sm bg-tertiary text-on-tertiary rounded-lg font-button text-body-sm hover:opacity-90 transition-opacity"
                >
                  <FontAwesomeIcon icon="plus" aria-hidden="true" />
                  {{ t('searchPatientPage.newLabOrder') }}
                </AppButton>
              </div>
            </div>

            <div class="p-lg">
              <div class="flex items-center justify-between mb-lg flex-wrap gap-2">
                <h4 class="font-h3 text-body-lg text-on-surface">{{ t('searchPatientPage.historyTitle') }}</h4>
                <div class="flex gap-xs">
                  <span
                    class="px-3 py-1 bg-surface-container dark:bg-slate-800 rounded-full text-xs font-semibold text-on-primary-container"
                  >{{ t('searchPatientPage.showingRecords', { count: 4 }) }}</span>
                </div>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr class="bg-surface-container-low dark:bg-slate-800">
                      <th class="p-md font-label-caps text-label-caps text-on-primary-container rounded-tl-lg">
                        {{ t('searchPatientPage.table.testDate') }}
                      </th>
                      <th class="p-md font-label-caps text-label-caps text-on-primary-container">
                        {{ t('searchPatientPage.table.testType') }}
                      </th>
                      <th class="p-md font-label-caps text-label-caps text-on-primary-container">
                        {{ t('searchPatientPage.table.status') }}
                      </th>
                      <th class="p-md font-label-caps text-label-caps text-on-primary-container">
                        {{ t('searchPatientPage.table.physician') }}
                      </th>
                      <th class="p-md font-label-caps text-label-caps text-on-primary-container rounded-tr-lg text-end">
                        {{ t('searchPatientPage.table.actions') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr
                      v-for="row in tableRows"
                      :key="row.key"
                      class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td class="p-md font-body-sm text-on-surface">{{ t(`searchPatientPage.rows.${row.key}.date`) }}</td>
                      <td class="p-md">
                        <div class="flex flex-col">
                          <span class="font-body-md font-semibold text-on-surface">{{
                            t(`searchPatientPage.rows.${row.key}.title`)
                          }}</span>
                          <span class="text-xs text-on-primary-container">{{
                            t(`searchPatientPage.rows.${row.key}.subtitle`)
                          }}</span>
                        </div>
                      </td>
                      <td class="p-md">
                        <span
                          class="inline-flex items-center gap-xs px-2 py-1 rounded-full text-xs font-semibold"
                          :class="statusBadgeClass(row.status)"
                        >
                          <span class="h-1.5 w-1.5 rounded-full shrink-0" :class="statusDotClass(row.status)" />
                          {{ statusLabel(row.status) }}
                        </span>
                      </td>
                      <td class="p-md font-body-sm text-on-primary-container">{{
                        t(`searchPatientPage.rows.${row.key}.physician`)
                      }}</td>
                      <td class="p-md text-end">
                        <AppButton
                          type="button"
                          class="text-tertiary font-button text-body-sm hover:underline inline-flex items-center gap-xs ms-auto"
                        >
                          <FontAwesomeIcon icon="file-lines" class="text-[18px]" aria-hidden="true" />
                          {{ t('searchPatientPage.table.viewReport') }}
                        </AppButton>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div
              class="bg-surface-container-low dark:bg-slate-800/80 px-lg py-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div class="text-xs text-on-primary-container">{{ t('searchPatientPage.lastUpdated') }}</div>
              <AppButton
                type="button"
                class="text-secondary font-button text-xs flex items-center gap-xs hover:bg-white dark:hover:bg-slate-900 px-md py-1 rounded transition-colors"
              >
                {{ t('searchPatientPage.viewFullRecord') }}
                <FontAwesomeIcon icon="up-right-from-square" class="text-sm" aria-hidden="true" />
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'staff',
})

const { t } = useI18n()

/** Demo row order and status chips (completed vs archived). */
const tableRows = [
  { key: 'cmp', status: 'completed' },
  { key: 'lipid', status: 'completed' },
  { key: 'tsh', status: 'archived' },
  { key: 'cbc', status: 'completed' },
]

function statusBadgeClass(status) {
  return status === 'archived'
    ? 'bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300'
    : 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300'
}

function statusDotClass(status) {
  return status === 'archived' ? 'bg-yellow-600' : 'bg-green-600'
}

function statusLabel(status) {
  return status === 'archived' ? t('searchPatientPage.statusArchived') : t('searchPatientPage.statusCompleted')
}

useSeoMeta({
  title: () => t('searchPatientPage.seoTitle'),
})
</script>
