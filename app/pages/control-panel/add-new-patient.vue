<template>
  <div class="font-body-md text-on-surface bg-surface min-h-dvh flex flex-col">
    <ControlPanelHeader />

    <main class="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
      <div class="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <nav class="flex flex-wrap items-center text-xs text-slate-400 dark:text-slate-500 mb-2 gap-2" aria-label="Breadcrumb">
            <span>{{ t('addNewPatientPage.breadcrumbPatients') }}</span>
            <span aria-hidden="true">/</span>
            <span class="text-tertiary font-semibold">{{ t('addNewPatientPage.breadcrumbCurrent') }}</span>
          </nav>
          <h1 class="font-h1 text-h1 text-blue-900 dark:text-blue-100">
            {{ t('addNewPatientPage.title') }}
          </h1>
          <p class="text-slate-500 dark:text-slate-400 font-body-md mt-1">
            {{ t('addNewPatientPage.subtitle', { brand: t('brand.name') }) }}
          </p>
        </div>
      </div>

      <form class="space-y-6" @submit.prevent="onSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section
            class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-[0_10px_20px_rgba(0,0,0,0.02)] dark:shadow-none p-6"
          >
            <div class="flex items-center gap-3 mb-6">
              <span class="text-tertiary bg-tertiary/10 dark:bg-tertiary/20 p-2 rounded-lg inline-flex" aria-hidden="true">
                <FontAwesomeIcon icon="user" class="text-xl" />
              </span>
              <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100">
                {{ t('addNewPatientPage.personal.sectionTitle') }}
              </h2>
            </div>
            <div class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
                    t('addNewPatientPage.form.name')
                  }}</label>
                  <input
                    class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none"
                    type="text"
                    autocomplete="given-name"
                    :placeholder="t('addNewPatientPage.form.namePlaceholder')"
                  >
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
                    t('addNewPatientPage.form.surname')
                  }}</label>
                  <input
                    class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none"
                    type="text"
                    autocomplete="family-name"
                    :placeholder="t('addNewPatientPage.form.surnamePlaceholder')"
                  >
                </div>
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
                  t('addNewPatientPage.form.dob')
                }}</label>
                <input
                  class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none"
                  type="date"
                  autocomplete="bday"
                >
              </div>
              <fieldset>
                <legend class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-2">
                  {{ t('addNewPatientPage.form.gender') }}
                </legend>
                <div class="flex flex-wrap gap-4">
                  <label class="flex items-center gap-2 cursor-pointer group">
                    <input
                      class="text-tertiary focus:ring-tertiary border-slate-300 dark:border-slate-600 dark:bg-slate-950"
                      name="gender"
                      type="radio"
                      value="male"
                    >
                    <span class="text-sm text-slate-600 dark:text-slate-300 group-hover:text-tertiary">{{
                      t('addNewPatientPage.form.genderMale')
                    }}</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer group">
                    <input
                      class="text-tertiary focus:ring-tertiary border-slate-300 dark:border-slate-600 dark:bg-slate-950"
                      name="gender"
                      type="radio"
                      value="female"
                    >
                    <span class="text-sm text-slate-600 dark:text-slate-300 group-hover:text-tertiary">{{
                      t('addNewPatientPage.form.genderFemale')
                    }}</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer group">
                    <input
                      class="text-tertiary focus:ring-tertiary border-slate-300 dark:border-slate-600 dark:bg-slate-950"
                      name="gender"
                      type="radio"
                      value="other"
                    >
                    <span class="text-sm text-slate-600 dark:text-slate-300 group-hover:text-tertiary">{{
                      t('addNewPatientPage.form.genderOther')
                    }}</span>
                  </label>
                </div>
              </fieldset>
            </div>
          </section>

          <section
            class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-[0_10px_20px_rgba(0,0,0,0.02)] dark:shadow-none p-6"
          >
            <div class="flex items-center gap-3 mb-6">
              <span class="text-tertiary bg-tertiary/10 dark:bg-tertiary/20 p-2 rounded-lg inline-flex" aria-hidden="true">
                <FontAwesomeIcon icon="id-card" class="text-xl" />
              </span>
              <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100">
                {{ t('addNewPatientPage.identification.sectionTitle') }}
              </h2>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
                  t('addNewPatientPage.form.nationalId')
                }}</label>
                <input
                  class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none"
                  type="text"
                  :placeholder="t('addNewPatientPage.form.nationalIdPlaceholder')"
                >
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
                  t('addNewPatientPage.form.insuranceProvider')
                }}</label>
                <select
                  class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none appearance-none"
                >
                  <option value="">{{ t('addNewPatientPage.form.selectProvider') }}</option>
                  <option value="medicare">{{ t('addNewPatientPage.insurance.medicarePlus') }}</option>
                  <option value="global">{{ t('addNewPatientPage.insurance.globalHealth') }}</option>
                  <option value="vitality">{{ t('addNewPatientPage.insurance.vitalityBlue') }}</option>
                  <option value="other">{{ t('addNewPatientPage.insurance.other') }}</option>
                </select>
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
                  t('addNewPatientPage.form.policyNumber')
                }}</label>
                <input
                  class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none"
                  type="text"
                  :placeholder="t('addNewPatientPage.form.policyPlaceholder')"
                >
              </div>
            </div>
          </section>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section
            class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-[0_10px_20px_rgba(0,0,0,0.02)] dark:shadow-none p-6"
          >
            <div class="flex items-center gap-3 mb-6">
              <span class="text-tertiary bg-tertiary/10 dark:bg-tertiary/20 p-2 rounded-lg inline-flex" aria-hidden="true">
                <FontAwesomeIcon icon="notes-medical" class="text-xl" />
              </span>
              <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100">
                {{ t('addNewPatientPage.medical.sectionTitle') }}
              </h2>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
                  t('addNewPatientPage.form.bloodGroup')
                }}</label>
                <select
                  class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none appearance-none"
                >
                  <option value="">{{ t('addNewPatientPage.form.selectBloodGroup') }}</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
                  t('addNewPatientPage.form.allergies')
                }}</label>
                <textarea
                  class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary p-3 outline-none min-h-[4.5rem]"
                  rows="2"
                  :placeholder="t('addNewPatientPage.form.allergiesPlaceholder')"
                />
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
                  t('addNewPatientPage.form.chronic')
                }}</label>
                <textarea
                  class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary p-3 outline-none min-h-[4.5rem]"
                  rows="2"
                  :placeholder="t('addNewPatientPage.form.chronicPlaceholder')"
                />
              </div>
            </div>
          </section>

          <section
            class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-[0_10px_20px_rgba(0,0,0,0.02)] dark:shadow-none p-6"
          >
            <div class="flex items-center gap-3 mb-6">
              <span class="text-tertiary bg-tertiary/10 dark:bg-tertiary/20 p-2 rounded-lg inline-flex" aria-hidden="true">
                <FontAwesomeIcon icon="phone" class="text-xl" />
              </span>
              <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100">
                {{ t('addNewPatientPage.contact.sectionTitle') }}
              </h2>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
                  t('addNewPatientPage.form.phone')
                }}</label>
                <div class="flex">
                  <span
                    class="inline-flex items-center px-3 rounded-s-lg border border-e-0 border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm shrink-0"
                  >{{ t('addNewPatientPage.form.countryCode') }}</span>
                  <input
                    class="flex-1 min-w-0 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-e-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none"
                    type="tel"
                    autocomplete="tel-national"
                    :placeholder="t('addNewPatientPage.form.phonePlaceholder')"
                  >
                </div>
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
                  t('addNewPatientPage.form.email')
                }}</label>
                <div class="relative">
                  <span class="absolute inset-y-0 start-3 flex items-center text-slate-400 pointer-events-none" aria-hidden="true">
                    <FontAwesomeIcon icon="envelope" class="text-lg" />
                  </span>
                  <input
                    class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 ps-10 pe-3 outline-none"
                    type="email"
                    autocomplete="email"
                    :placeholder="t('addNewPatientPage.form.emailPlaceholder')"
                  >
                </div>
              </div>
              <div class="p-4 bg-tertiary/10 dark:bg-tertiary/15 rounded-lg border border-tertiary/20 dark:border-tertiary/30 mt-4">
                <p class="text-xs text-teal-900 dark:text-teal-100/90 leading-relaxed">
                  <span class="font-bold">{{ t('addNewPatientPage.privacyNoteBold') }}</span>
                  {{ ' ' }}{{ t('addNewPatientPage.privacyNoteBody') }}
                </p>
              </div>
            </div>
          </section>
        </div>

        <div class="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-4 pt-8 border-t border-slate-200 dark:border-slate-700">
          <AppButton
            to="/control-panel"
            class="px-8 py-3 rounded-lg font-button text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent text-center"
          >
            {{ t('addNewPatientPage.cancel') }}
          </AppButton>
          <AppButton
            type="submit"
            class="px-10 py-3 rounded-lg font-button bg-tertiary text-on-tertiary hover:opacity-90 shadow-md shadow-tertiary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon="save" class="text-lg" aria-hidden="true" />
            {{ t('addNewPatientPage.savePatient') }}
          </AppButton>
        </div>
      </form>
    </main>

    <footer class="p-8 text-center text-slate-400 dark:text-slate-500 text-xs mt-auto">
      {{ t('addNewPatientPage.footer', { year, brand: t('brand.name') }) }}
    </footer>
  </div>
</template>

<script setup>
const { t } = useI18n()

const year = new Date().getFullYear()

useSeoMeta({
  title: () => t('addNewPatientPage.seoTitle'),
})

function onSubmit() {
  // Form submission can be wired to an API when available.
}
</script>
