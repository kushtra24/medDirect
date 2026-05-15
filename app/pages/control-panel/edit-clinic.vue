<template>
  <div class="bg-surface font-body-md text-on-surface min-h-dvh flex flex-col">
    <ControlPanelHeader />

    <main class="flex-1 flex flex-col min-h-0">
      <div class="p-lg max-w-container-max mx-auto w-full flex-1">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-xl">
          <div>
            <h2 class="font-h2 text-h2 text-blue-900 dark:text-blue-300 mb-xs">{{ t('editClinicPage.title') }}</h2>
            <p class="font-body-md text-body-md text-on-surface-variant">{{ t('editClinicPage.subtitle') }}</p>
          </div>
          <div class="flex gap-md shrink-0">
            <AppButton
              type="button"
              class="px-lg py-sm bg-tertiary text-on-tertiary font-button text-button rounded-xl shadow-md hover:opacity-90 transition-all flex items-center gap-2"
            >
              <FontAwesomeIcon icon="upload" class="text-xl" aria-hidden="true" />
              {{ t('editClinicPage.requestPublish') }}
            </AppButton>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-lg">
          <div class="col-span-12 lg:col-span-8 flex flex-col gap-lg">
            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="circle-info" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('editClinicPage.basicInfo.sectionTitle') }}</h3>
              </div>
              <div class="space-y-md">
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('editClinicPage.basicInfo.name')
                  }}</label>
                  <input
                    class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all bg-white dark:bg-slate-950 dark:border-slate-700"
                    type="text"
                    :placeholder="t('editClinicPage.basicInfo.namePlaceholder')"
                  >
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('editClinicPage.basicInfo.description')
                  }}</label>
                  <div
                    class="w-full rounded-lg border border-outline-variant focus-within:border-tertiary focus-within:ring-1 focus-within:ring-tertiary transition-all overflow-hidden bg-white dark:bg-slate-950 dark:border-slate-700"
                  >
                    <div class="flex items-center gap-1 p-2 border-b border-outline-variant bg-surface-container-low dark:bg-slate-800 flex-wrap">
                      <AppButton type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('editClinicPage.editor.bold')">
                        <FontAwesomeIcon icon="bold" class="text-[18px]" aria-hidden="true" />
                      </AppButton>
                      <AppButton type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('editClinicPage.editor.italic')">
                        <FontAwesomeIcon icon="italic" class="text-[18px]" aria-hidden="true" />
                      </AppButton>
                      <AppButton type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('editClinicPage.editor.underline')">
                        <FontAwesomeIcon icon="underline" class="text-[18px]" aria-hidden="true" />
                      </AppButton>
                      <div class="w-px h-4 bg-outline-variant mx-1" aria-hidden="true" />
                      <AppButton type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('editClinicPage.editor.bulletList')">
                        <FontAwesomeIcon icon="list-ul" class="text-[18px]" aria-hidden="true" />
                      </AppButton>
                      <AppButton type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('editClinicPage.editor.numberedList')">
                        <FontAwesomeIcon icon="list-ol" class="text-[18px]" aria-hidden="true" />
                      </AppButton>
                      <div class="w-px h-4 bg-outline-variant mx-1" aria-hidden="true" />
                      <AppButton type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('editClinicPage.editor.link')">
                        <FontAwesomeIcon icon="link" class="text-[18px]" aria-hidden="true" />
                      </AppButton>
                      <AppButton type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('editClinicPage.editor.image')">
                        <FontAwesomeIcon icon="image" class="text-[18px]" aria-hidden="true" />
                      </AppButton>
                    </div>
                    <textarea
                      class="w-full px-md py-sm border-none focus:ring-0 outline-none resize-none min-h-[160px] bg-transparent text-on-surface"
                      :placeholder="t('editClinicPage.basicInfo.descriptionPlaceholder')"
                      rows="6"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="palette" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('editClinicPage.branding.sectionTitle') }}</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-lg">
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('editClinicPage.branding.clinicLogo')
                  }}</label>
                  <div
                    class="border-2 border-dashed border-outline-variant rounded-xl p-xl flex flex-col items-center justify-center bg-surface-container-lowest dark:bg-slate-950 hover:bg-surface-container-low dark:hover:bg-slate-800 transition-all cursor-pointer group"
                    role="button"
                    tabindex="0"
                  >
                    <FontAwesomeIcon
                      icon="images"
                      class="text-outline-variant group-hover:text-tertiary text-4xl mb-sm transition-colors"
                      aria-hidden="true"
                    />
                    <p class="text-body-sm font-body-sm text-on-surface-variant text-center">
                      {{ t('editClinicPage.branding.logoDrop') }}
                      <span class="text-tertiary font-bold underline">{{ t('editClinicPage.branding.browse') }}</span>
                    </p>
                    <p class="text-[10px] text-outline mt-xs uppercase">{{ t('editClinicPage.branding.logoFormats') }}</p>
                  </div>
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('editClinicPage.branding.featuredImage')
                  }}</label>
                  <div
                    class="border-2 border-dashed border-outline-variant rounded-xl p-xl flex flex-col items-center justify-center bg-surface-container-lowest dark:bg-slate-950 hover:bg-surface-container-low dark:hover:bg-slate-800 transition-all cursor-pointer group"
                    role="button"
                    tabindex="0"
                  >
                    <FontAwesomeIcon
                      icon="cloud-arrow-up"
                      class="text-outline-variant group-hover:text-tertiary text-4xl mb-sm transition-colors"
                      aria-hidden="true"
                    />
                    <p class="text-body-sm font-body-sm text-on-surface-variant text-center">
                      {{ t('editClinicPage.branding.coverDrop') }}
                      <span class="text-tertiary font-bold underline">{{ t('editClinicPage.branding.select') }}</span>
                    </p>
                    <p class="text-[10px] text-outline mt-xs uppercase">{{ t('editClinicPage.branding.coverFormats') }}</p>
                  </div>
                </div>
              </div>
            </section>

            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="universal-access" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('editClinicPage.operations.sectionTitle') }}</h3>
              </div>
              <div class="space-y-md">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div>
                    <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                      t('editClinicPage.operations.coreServices')
                    }}</label>
                    <select
                      class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all bg-white dark:bg-slate-950 dark:border-slate-700"
                    >
                      <option>{{ t('editClinicPage.operations.selectPrimary') }}</option>
                      <option>{{ t('editClinicPage.operations.serviceMolecular') }}</option>
                      <option>{{ t('editClinicPage.operations.serviceChemistry') }}</option>
                      <option>{{ t('editClinicPage.operations.serviceHematology') }}</option>
                      <option>{{ t('editClinicPage.operations.serviceImmunology') }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                      t('editClinicPage.operations.certifications')
                    }}</label>
                    <div class="flex flex-wrap gap-xs p-xs border border-outline-variant rounded-lg min-h-[42px] items-center bg-white dark:bg-slate-950 dark:border-slate-700">
                      <span
                        class="bg-secondary-container text-on-secondary-container px-sm py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      >{{ t('editClinicPage.operations.certIso') }}
                        <AppButton type="button" class="inline-flex" :aria-label="t('editClinicPage.operations.removeCertAria')">
                          <FontAwesomeIcon icon="xmark" class="text-[14px] cursor-pointer" aria-hidden="true" />
                        </AppButton>
                      </span>
                      <span
                        class="bg-secondary-container text-on-secondary-container px-sm py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      >{{ t('editClinicPage.operations.certCap') }}
                        <AppButton type="button" class="inline-flex" :aria-label="t('editClinicPage.operations.removeCertAria')">
                          <FontAwesomeIcon icon="xmark" class="text-[14px] cursor-pointer" aria-hidden="true" />
                        </AppButton>
                      </span>
                      <input
                        class="flex-1 border-none focus:ring-0 p-0 text-xs min-w-[60px] bg-transparent"
                        type="text"
                        :placeholder="t('editClinicPage.operations.addCertPlaceholder')"
                      >
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('editClinicPage.operations.openingHours')
                  }}</label>
                  <div class="grid grid-cols-7 gap-xs overflow-x-auto pb-1">
                    <div class="p-sm bg-surface-container dark:bg-slate-800 rounded-lg text-center min-w-[72px]">
                      <span class="block text-[10px] font-bold text-on-surface-variant mb-xs">{{ t('editClinicPage.operations.days.mon') }}</span>
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs mb-1 dark:text-slate-200" type="text" value="08:00">
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs dark:text-slate-200" type="text" value="18:00">
                    </div>
                    <div class="p-sm bg-surface-container dark:bg-slate-800 rounded-lg text-center min-w-[72px]">
                      <span class="block text-[10px] font-bold text-on-surface-variant mb-xs">{{ t('editClinicPage.operations.days.tue') }}</span>
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs mb-1 dark:text-slate-200" type="text" value="08:00">
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs dark:text-slate-200" type="text" value="18:00">
                    </div>
                    <div class="p-sm bg-surface-container dark:bg-slate-800 rounded-lg text-center border-2 border-tertiary min-w-[72px]">
                      <span class="block text-[10px] font-bold text-tertiary mb-xs">{{ t('editClinicPage.operations.days.wed') }}</span>
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs mb-1 text-on-surface" type="text" value="08:00">
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs text-on-surface" type="text" value="18:00">
                    </div>
                    <div class="p-sm bg-surface-container dark:bg-slate-800 rounded-lg text-center min-w-[72px]">
                      <span class="block text-[10px] font-bold text-on-surface-variant mb-xs">{{ t('editClinicPage.operations.days.thu') }}</span>
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs mb-1 dark:text-slate-200" type="text" value="08:00">
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs dark:text-slate-200" type="text" value="18:00">
                    </div>
                    <div class="p-sm bg-surface-container dark:bg-slate-800 rounded-lg text-center min-w-[72px]">
                      <span class="block text-[10px] font-bold text-on-surface-variant mb-xs">{{ t('editClinicPage.operations.days.fri') }}</span>
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs mb-1 dark:text-slate-200" type="text" value="08:00">
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs dark:text-slate-200" type="text" value="18:00">
                    </div>
                    <div class="p-sm bg-surface-container dark:bg-slate-800 rounded-lg text-center min-w-[72px]">
                      <span class="block text-[10px] font-bold text-on-surface-variant mb-xs">{{ t('editClinicPage.operations.days.sat') }}</span>
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs mb-1 dark:text-slate-200" type="text" value="09:00">
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs dark:text-slate-200" type="text" value="14:00">
                    </div>
                    <div class="p-sm bg-surface-variant dark:bg-slate-900 rounded-lg text-center min-w-[72px]">
                      <span class="block text-[10px] font-bold text-outline mb-xs">{{ t('editClinicPage.operations.days.sun') }}</span>
                      <span class="text-xs font-bold text-outline">{{ t('editClinicPage.operations.closed') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class="col-span-12 lg:col-span-4 flex flex-col gap-lg">
            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="user-shield" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('editClinicPage.status.sectionTitle') }}</h3>
              </div>
              <div class="space-y-lg">
                <div class="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-lg p-md flex items-start gap-md">
                  <FontAwesomeIcon icon="circle-check" class="text-green-600 text-xl shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p class="text-sm font-bold text-green-800 dark:text-green-300">{{ t('editClinicPage.status.verifiedTitle') }}</p>
                    <p class="text-[11px] text-green-700 dark:text-green-400 leading-tight mt-1">
                      {{ t('editClinicPage.status.verifiedBody', { regNumber: t('editClinicPage.status.regNumber') }) }}
                    </p>
                  </div>
                </div>
                <p class="text-body-sm text-on-surface-variant italic">{{ t('editClinicPage.status.reviewNote') }}</p>
              </div>
            </section>

            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="headset" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('editClinicPage.contact.sectionTitle') }}</h3>
              </div>
              <div class="space-y-md">
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('editClinicPage.contact.address')
                  }}</label>
                  <div class="relative">
                    <textarea
                      class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all text-sm bg-white dark:bg-slate-950 dark:border-slate-700 pr-10"
                      rows="2"
                      :placeholder="t('editClinicPage.contact.addressPlaceholder')"
                    />
                    <FontAwesomeIcon
                      icon="location-dot"
                      class="absolute right-3 bottom-3 text-outline-variant pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div class="h-32 w-full rounded-lg overflow-hidden border border-outline-variant bg-surface-container relative">
                  <img
                    :alt="t('editClinicPage.contact.mapAlt')"
                    class="w-full h-full object-cover grayscale opacity-60"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwUYmmEeqCYq1fa-Ul0CFeUy0Oo-kj0lrbp2rEi5w0VlmMp64d9cAPg4ddhDt9ekXhOCgPCYpYx-_BuGRCovzJl_JOEWBX1YahDdYQfPtjBz5DurXpZ6aLbeMkgD-W4mxLFuTUlt0mlJUtOu-yS7umOV8WjLzrqJJHd6xlpxfuyUVMhUZu3OoWK06XB95wNQws6eS-wT7Wcwn36lzaDnT9I6_3mWSTtKmLZAmm6G-5rkpLZiPQFlB5OrW3SFj2PWo7YfYokOrONrc"
                  >
                  <div class="absolute inset-0 flex items-center justify-center">
                    <AppButton
                      type="button"
                      class="bg-white/90 dark:bg-slate-900/90 backdrop-blur px-md py-xs rounded-full shadow-sm text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1"
                    >
                      <FontAwesomeIcon icon="map" class="text-sm" aria-hidden="true" />
                      {{ t('editClinicPage.contact.setCoordinates') }}
                    </AppButton>
                  </div>
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('editClinicPage.contact.mobile')
                  }}</label>
                  <input
                    class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all text-sm bg-white dark:bg-slate-950 dark:border-slate-700"
                    type="tel"
                    :placeholder="t('editClinicPage.contact.mobilePlaceholder')"
                  >
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('editClinicPage.contact.email')
                  }}</label>
                  <input
                    class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all text-sm bg-white dark:bg-slate-950 dark:border-slate-700"
                    type="email"
                    :placeholder="t('editClinicPage.contact.emailPlaceholder')"
                  >
                </div>
              </div>
            </section>

            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="language" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('editClinicPage.languages.sectionTitle') }}</h3>
              </div>
              <div class="space-y-md">
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                  t('editClinicPage.languages.spoken')
                }}</label>
                <div class="flex flex-wrap gap-xs p-xs border border-outline-variant rounded-lg min-h-[42px] items-center bg-white dark:bg-slate-950 dark:border-slate-700">
                  <span class="bg-tertiary/10 text-tertiary px-sm py-1 rounded-full text-xs font-bold flex items-center gap-1">{{ t('editClinicPage.languages.chipEnglish') }}
                    <AppButton type="button" class="inline-flex" :aria-label="t('editClinicPage.languages.removeLangAria')">
                      <FontAwesomeIcon icon="xmark" class="text-[14px] cursor-pointer" aria-hidden="true" />
                    </AppButton>
                  </span>
                  <span class="bg-tertiary/10 text-tertiary px-sm py-1 rounded-full text-xs font-bold flex items-center gap-1">{{ t('editClinicPage.languages.chipSpanish') }}
                    <AppButton type="button" class="inline-flex" :aria-label="t('editClinicPage.languages.removeLangAria')">
                      <FontAwesomeIcon icon="xmark" class="text-[14px] cursor-pointer" aria-hidden="true" />
                    </AppButton>
                  </span>
                  <span class="bg-tertiary/10 text-tertiary px-sm py-1 rounded-full text-xs font-bold flex items-center gap-1">{{ t('editClinicPage.languages.chipMandarin') }}
                    <AppButton type="button" class="inline-flex" :aria-label="t('editClinicPage.languages.removeLangAria')">
                      <FontAwesomeIcon icon="xmark" class="text-[14px] cursor-pointer" aria-hidden="true" />
                    </AppButton>
                  </span>
                  <input
                    class="flex-1 border-none focus:ring-0 p-0 text-xs min-w-[60px] bg-transparent"
                    type="text"
                    :placeholder="t('editClinicPage.languages.addLanguagePlaceholder')"
                  >
                </div>
                <div class="grid grid-cols-2 gap-xs">
                  <label class="flex items-center gap-2 p-2 hover:bg-surface-container dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                    <input checked class="rounded border-outline-variant text-tertiary focus:ring-tertiary" type="checkbox">
                    <span class="text-body-sm">{{ t('editClinicPage.languages.french') }}</span>
                  </label>
                  <label class="flex items-center gap-2 p-2 hover:bg-surface-container dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                    <input class="rounded border-outline-variant text-tertiary focus:ring-tertiary" type="checkbox">
                    <span class="text-body-sm">{{ t('editClinicPage.languages.arabic') }}</span>
                  </label>
                  <label class="flex items-center gap-2 p-2 hover:bg-surface-container dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                    <input class="rounded border-outline-variant text-tertiary focus:ring-tertiary" type="checkbox">
                    <span class="text-body-sm">{{ t('editClinicPage.languages.german') }}</span>
                  </label>
                  <label class="flex items-center gap-2 p-2 hover:bg-surface-container dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                    <input class="rounded border-outline-variant text-tertiary focus:ring-tertiary" type="checkbox">
                    <span class="text-body-sm">{{ t('editClinicPage.languages.hindi') }}</span>
                  </label>
                </div>
              </div>
            </section>
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

useSeoMeta({
  title: () => t('editClinicPage.seoTitle'),
})
</script>
