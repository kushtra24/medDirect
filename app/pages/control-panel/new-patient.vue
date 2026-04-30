<template>
  <div class="bg-surface font-body-md text-on-surface min-h-dvh flex flex-col">
    <main class="min-h-dvh flex-1 flex flex-col">
      <header
        class="sticky top-0 z-40 flex justify-between items-center px-6 h-16 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 shadow-sm font-manrope text-sm shrink-0"
      >
        <div class="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
          <NuxtLink
            to="/control-panel"
            class="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors shrink-0"
            :aria-label="t('newPatientPage.backAria')"
          >
            <FontAwesomeIcon icon="arrow-left" class="text-lg" aria-hidden="true" />
          </NuxtLink>
          <FontAwesomeIcon
            icon="magnifying-glass"
            class="text-slate-400 shrink-0 hidden sm:block"
            aria-hidden="true"
          />
          <input
            class="bg-transparent border-none focus:ring-0 text-slate-600 dark:text-slate-300 w-full sm:w-64 min-w-0 placeholder:text-slate-400"
            type="search"
            :placeholder="t('newPatientPage.searchPlaceholder')"
            autocomplete="off"
          >
        </div>
        <div class="flex items-center gap-3 sm:gap-6 shrink-0">
          <button
            type="button"
            class="text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-full transition-colors relative"
            :aria-label="t('newPatientPage.notificationsAria')"
          >
            <FontAwesomeIcon icon="bell" class="text-lg" aria-hidden="true" />
            <span
              class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            class="text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
            :aria-label="t('newPatientPage.helpAria')"
          >
            <FontAwesomeIcon icon="circle-question" class="text-lg" aria-hidden="true" />
          </button>
          <div class="hidden sm:flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
            <img
              :alt="t('newPatientPage.profileAlt')"
              class="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArnjb1uAf1h9Ptdv3tOOmkZfbpxzWz5ee4Nhdw2t3r4w9bAuq5DHqBH8xzZaG7m_MLkiVByEbh76KM5_8aok6_JKn26pQ6Cb_OGH_G85ky-WyxyC98g8n5zGX0Bw35_j-LwohGIWJ19aOwt13Rpudelig8YCF1VIrKrHcaXlfD9zacXGoDjZKFzNcn9DFBY6AnnM5JN7lguLJo8kPr-SqAkgz2aiu9W8Yj5qzMuXTE9gFEutpQ0pdXplkXdvT2UUQpBM3eckKdg5k"
            >
            <div class="text-left">
              <p class="font-bold text-blue-900 dark:text-blue-300 leading-tight">{{ t('newPatientPage.profileName') }}</p>
              <p class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                {{ t('newPatientPage.profileRole') }}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div class="p-lg max-w-container-max mx-auto w-full flex-1">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-xl">
          <div>
            <h2 class="font-h2 text-h2 text-blue-900 dark:text-blue-300 mb-xs">{{ t('newPatientPage.title') }}</h2>
            <p class="font-body-md text-body-md text-on-surface-variant">{{ t('newPatientPage.subtitle') }}</p>
          </div>
          <div class="flex gap-md shrink-0">
            <button
              type="button"
              class="px-lg py-sm bg-tertiary text-on-tertiary font-button text-button rounded-xl shadow-md hover:opacity-90 transition-all flex items-center gap-2"
            >
              <FontAwesomeIcon icon="upload" class="text-xl" aria-hidden="true" />
              {{ t('newPatientPage.requestPublish') }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-lg">
          <div class="col-span-12 lg:col-span-8 flex flex-col gap-lg">
            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="circle-info" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('newPatientPage.basicInfo.sectionTitle') }}</h3>
              </div>
              <div class="space-y-md">
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('newPatientPage.basicInfo.name')
                  }}</label>
                  <input
                    class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all bg-white dark:bg-slate-950 dark:border-slate-700"
                    type="text"
                    :placeholder="t('newPatientPage.basicInfo.namePlaceholder')"
                  >
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('newPatientPage.basicInfo.description')
                  }}</label>
                  <div
                    class="w-full rounded-lg border border-outline-variant focus-within:border-tertiary focus-within:ring-1 focus-within:ring-tertiary transition-all overflow-hidden bg-white dark:bg-slate-950 dark:border-slate-700"
                  >
                    <div class="flex items-center gap-1 p-2 border-b border-outline-variant bg-surface-container-low dark:bg-slate-800 flex-wrap">
                      <button type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('newPatientPage.editor.bold')">
                        <FontAwesomeIcon icon="bold" class="text-[18px]" aria-hidden="true" />
                      </button>
                      <button type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('newPatientPage.editor.italic')">
                        <FontAwesomeIcon icon="italic" class="text-[18px]" aria-hidden="true" />
                      </button>
                      <button type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('newPatientPage.editor.underline')">
                        <FontAwesomeIcon icon="underline" class="text-[18px]" aria-hidden="true" />
                      </button>
                      <div class="w-px h-4 bg-outline-variant mx-1" aria-hidden="true" />
                      <button type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('newPatientPage.editor.bulletList')">
                        <FontAwesomeIcon icon="list-ul" class="text-[18px]" aria-hidden="true" />
                      </button>
                      <button type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('newPatientPage.editor.numberedList')">
                        <FontAwesomeIcon icon="list-ol" class="text-[18px]" aria-hidden="true" />
                      </button>
                      <div class="w-px h-4 bg-outline-variant mx-1" aria-hidden="true" />
                      <button type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('newPatientPage.editor.link')">
                        <FontAwesomeIcon icon="link" class="text-[18px]" aria-hidden="true" />
                      </button>
                      <button type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('newPatientPage.editor.image')">
                        <FontAwesomeIcon icon="image" class="text-[18px]" aria-hidden="true" />
                      </button>
                    </div>
                    <textarea
                      class="w-full px-md py-sm border-none focus:ring-0 outline-none resize-none min-h-[160px] bg-transparent text-on-surface"
                      :placeholder="t('newPatientPage.basicInfo.descriptionPlaceholder')"
                      rows="6"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="palette" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('newPatientPage.branding.sectionTitle') }}</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-lg">
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('newPatientPage.branding.clinicLogo')
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
                      {{ t('newPatientPage.branding.logoDrop') }}
                      <span class="text-tertiary font-bold underline">{{ t('newPatientPage.branding.browse') }}</span>
                    </p>
                    <p class="text-[10px] text-outline mt-xs uppercase">{{ t('newPatientPage.branding.logoFormats') }}</p>
                  </div>
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('newPatientPage.branding.featuredImage')
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
                      {{ t('newPatientPage.branding.coverDrop') }}
                      <span class="text-tertiary font-bold underline">{{ t('newPatientPage.branding.select') }}</span>
                    </p>
                    <p class="text-[10px] text-outline mt-xs uppercase">{{ t('newPatientPage.branding.coverFormats') }}</p>
                  </div>
                </div>
              </div>
            </section>

            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="universal-access" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('newPatientPage.operations.sectionTitle') }}</h3>
              </div>
              <div class="space-y-md">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div>
                    <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                      t('newPatientPage.operations.coreServices')
                    }}</label>
                    <select
                      class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all bg-white dark:bg-slate-950 dark:border-slate-700"
                    >
                      <option>{{ t('newPatientPage.operations.selectPrimary') }}</option>
                      <option>{{ t('newPatientPage.operations.serviceMolecular') }}</option>
                      <option>{{ t('newPatientPage.operations.serviceChemistry') }}</option>
                      <option>{{ t('newPatientPage.operations.serviceHematology') }}</option>
                      <option>{{ t('newPatientPage.operations.serviceImmunology') }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                      t('newPatientPage.operations.certifications')
                    }}</label>
                    <div class="flex flex-wrap gap-xs p-xs border border-outline-variant rounded-lg min-h-[42px] items-center bg-white dark:bg-slate-950 dark:border-slate-700">
                      <span
                        class="bg-secondary-container text-on-secondary-container px-sm py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      >{{ t('newPatientPage.operations.certIso') }}
                        <button type="button" class="inline-flex" :aria-label="t('newPatientPage.operations.removeCertAria')">
                          <FontAwesomeIcon icon="xmark" class="text-[14px] cursor-pointer" aria-hidden="true" />
                        </button>
                      </span>
                      <span
                        class="bg-secondary-container text-on-secondary-container px-sm py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      >{{ t('newPatientPage.operations.certCap') }}
                        <button type="button" class="inline-flex" :aria-label="t('newPatientPage.operations.removeCertAria')">
                          <FontAwesomeIcon icon="xmark" class="text-[14px] cursor-pointer" aria-hidden="true" />
                        </button>
                      </span>
                      <input
                        class="flex-1 border-none focus:ring-0 p-0 text-xs min-w-[60px] bg-transparent"
                        type="text"
                        :placeholder="t('newPatientPage.operations.addCertPlaceholder')"
                      >
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('newPatientPage.operations.openingHours')
                  }}</label>
                  <div class="grid grid-cols-7 gap-xs overflow-x-auto pb-1">
                    <div class="p-sm bg-surface-container dark:bg-slate-800 rounded-lg text-center min-w-[72px]">
                      <span class="block text-[10px] font-bold text-on-surface-variant mb-xs">{{ t('newPatientPage.operations.days.mon') }}</span>
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs mb-1 dark:text-slate-200" type="text" value="08:00">
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs dark:text-slate-200" type="text" value="18:00">
                    </div>
                    <div class="p-sm bg-surface-container dark:bg-slate-800 rounded-lg text-center min-w-[72px]">
                      <span class="block text-[10px] font-bold text-on-surface-variant mb-xs">{{ t('newPatientPage.operations.days.tue') }}</span>
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs mb-1 dark:text-slate-200" type="text" value="08:00">
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs dark:text-slate-200" type="text" value="18:00">
                    </div>
                    <div class="p-sm bg-surface-container dark:bg-slate-800 rounded-lg text-center border-2 border-tertiary min-w-[72px]">
                      <span class="block text-[10px] font-bold text-tertiary mb-xs">{{ t('newPatientPage.operations.days.wed') }}</span>
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs mb-1 text-on-surface" type="text" value="08:00">
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs text-on-surface" type="text" value="18:00">
                    </div>
                    <div class="p-sm bg-surface-container dark:bg-slate-800 rounded-lg text-center min-w-[72px]">
                      <span class="block text-[10px] font-bold text-on-surface-variant mb-xs">{{ t('newPatientPage.operations.days.thu') }}</span>
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs mb-1 dark:text-slate-200" type="text" value="08:00">
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs dark:text-slate-200" type="text" value="18:00">
                    </div>
                    <div class="p-sm bg-surface-container dark:bg-slate-800 rounded-lg text-center min-w-[72px]">
                      <span class="block text-[10px] font-bold text-on-surface-variant mb-xs">{{ t('newPatientPage.operations.days.fri') }}</span>
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs mb-1 dark:text-slate-200" type="text" value="08:00">
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs dark:text-slate-200" type="text" value="18:00">
                    </div>
                    <div class="p-sm bg-surface-container dark:bg-slate-800 rounded-lg text-center min-w-[72px]">
                      <span class="block text-[10px] font-bold text-on-surface-variant mb-xs">{{ t('newPatientPage.operations.days.sat') }}</span>
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs mb-1 dark:text-slate-200" type="text" value="09:00">
                      <input class="w-full text-center p-0 border-none bg-transparent font-semibold text-xs dark:text-slate-200" type="text" value="14:00">
                    </div>
                    <div class="p-sm bg-surface-variant dark:bg-slate-900 rounded-lg text-center min-w-[72px]">
                      <span class="block text-[10px] font-bold text-outline mb-xs">{{ t('newPatientPage.operations.days.sun') }}</span>
                      <span class="text-xs font-bold text-outline">{{ t('newPatientPage.operations.closed') }}</span>
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
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('newPatientPage.status.sectionTitle') }}</h3>
              </div>
              <div class="space-y-lg">
                <div class="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-lg p-md flex items-start gap-md">
                  <FontAwesomeIcon icon="circle-check" class="text-green-600 text-xl shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p class="text-sm font-bold text-green-800 dark:text-green-300">{{ t('newPatientPage.status.verifiedTitle') }}</p>
                    <p class="text-[11px] text-green-700 dark:text-green-400 leading-tight mt-1">
                      {{ t('newPatientPage.status.verifiedBody', { regNumber: t('newPatientPage.status.regNumber') }) }}
                    </p>
                  </div>
                </div>
                <p class="text-body-sm text-on-surface-variant italic">{{ t('newPatientPage.status.reviewNote') }}</p>
              </div>
            </section>

            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="headset" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('newPatientPage.contact.sectionTitle') }}</h3>
              </div>
              <div class="space-y-md">
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('newPatientPage.contact.address')
                  }}</label>
                  <div class="relative">
                    <textarea
                      class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all text-sm bg-white dark:bg-slate-950 dark:border-slate-700 pr-10"
                      rows="2"
                      :placeholder="t('newPatientPage.contact.addressPlaceholder')"
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
                    :alt="t('newPatientPage.contact.mapAlt')"
                    class="w-full h-full object-cover grayscale opacity-60"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwUYmmEeqCYq1fa-Ul0CFeUy0Oo-kj0lrbp2rEi5w0VlmMp64d9cAPg4ddhDt9ekXhOCgPCYpYx-_BuGRCovzJl_JOEWBX1YahDdYQfPtjBz5DurXpZ6aLbeMkgD-W4mxLFuTUlt0mlJUtOu-yS7umOV8WjLzrqJJHd6xlpxfuyUVMhUZu3OoWK06XB95wNQws6eS-wT7Wcwn36lzaDnT9I6_3mWSTtKmLZAmm6G-5rkpLZiPQFlB5OrW3SFj2PWo7YfYokOrONrc"
                  >
                  <div class="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      class="bg-white/90 dark:bg-slate-900/90 backdrop-blur px-md py-xs rounded-full shadow-sm text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1"
                    >
                      <FontAwesomeIcon icon="map" class="text-sm" aria-hidden="true" />
                      {{ t('newPatientPage.contact.setCoordinates') }}
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('newPatientPage.contact.mobile')
                  }}</label>
                  <input
                    class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all text-sm bg-white dark:bg-slate-950 dark:border-slate-700"
                    type="tel"
                    :placeholder="t('newPatientPage.contact.mobilePlaceholder')"
                  >
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('newPatientPage.contact.email')
                  }}</label>
                  <input
                    class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all text-sm bg-white dark:bg-slate-950 dark:border-slate-700"
                    type="email"
                    :placeholder="t('newPatientPage.contact.emailPlaceholder')"
                  >
                </div>
              </div>
            </section>

            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="language" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('newPatientPage.languages.sectionTitle') }}</h3>
              </div>
              <div class="space-y-md">
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                  t('newPatientPage.languages.spoken')
                }}</label>
                <div class="flex flex-wrap gap-xs p-xs border border-outline-variant rounded-lg min-h-[42px] items-center bg-white dark:bg-slate-950 dark:border-slate-700">
                  <span class="bg-tertiary/10 text-tertiary px-sm py-1 rounded-full text-xs font-bold flex items-center gap-1">{{ t('newPatientPage.languages.chipEnglish') }}
                    <button type="button" class="inline-flex" :aria-label="t('newPatientPage.languages.removeLangAria')">
                      <FontAwesomeIcon icon="xmark" class="text-[14px] cursor-pointer" aria-hidden="true" />
                    </button>
                  </span>
                  <span class="bg-tertiary/10 text-tertiary px-sm py-1 rounded-full text-xs font-bold flex items-center gap-1">{{ t('newPatientPage.languages.chipSpanish') }}
                    <button type="button" class="inline-flex" :aria-label="t('newPatientPage.languages.removeLangAria')">
                      <FontAwesomeIcon icon="xmark" class="text-[14px] cursor-pointer" aria-hidden="true" />
                    </button>
                  </span>
                  <span class="bg-tertiary/10 text-tertiary px-sm py-1 rounded-full text-xs font-bold flex items-center gap-1">{{ t('newPatientPage.languages.chipMandarin') }}
                    <button type="button" class="inline-flex" :aria-label="t('newPatientPage.languages.removeLangAria')">
                      <FontAwesomeIcon icon="xmark" class="text-[14px] cursor-pointer" aria-hidden="true" />
                    </button>
                  </span>
                  <input
                    class="flex-1 border-none focus:ring-0 p-0 text-xs min-w-[60px] bg-transparent"
                    type="text"
                    :placeholder="t('newPatientPage.languages.addLanguagePlaceholder')"
                  >
                </div>
                <div class="grid grid-cols-2 gap-xs">
                  <label class="flex items-center gap-2 p-2 hover:bg-surface-container dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                    <input checked class="rounded border-outline-variant text-tertiary focus:ring-tertiary" type="checkbox">
                    <span class="text-body-sm">{{ t('newPatientPage.languages.french') }}</span>
                  </label>
                  <label class="flex items-center gap-2 p-2 hover:bg-surface-container dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                    <input class="rounded border-outline-variant text-tertiary focus:ring-tertiary" type="checkbox">
                    <span class="text-body-sm">{{ t('newPatientPage.languages.arabic') }}</span>
                  </label>
                  <label class="flex items-center gap-2 p-2 hover:bg-surface-container dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                    <input class="rounded border-outline-variant text-tertiary focus:ring-tertiary" type="checkbox">
                    <span class="text-body-sm">{{ t('newPatientPage.languages.german') }}</span>
                  </label>
                  <label class="flex items-center gap-2 p-2 hover:bg-surface-container dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                    <input class="rounded border-outline-variant text-tertiary focus:ring-tertiary" type="checkbox">
                    <span class="text-body-sm">{{ t('newPatientPage.languages.hindi') }}</span>
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
const { t } = useI18n()

useSeoMeta({
  title: () => t('newPatientPage.seoTitle'),
})
</script>
