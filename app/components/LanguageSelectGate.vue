<template>
  <Teleport to="body">
    <div
      v-if="!hasChosenLocale"
      class="fixed inset-0 z-[100] flex flex-col items-center bg-white dark:bg-slate-950 min-h-dvh"
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-gate-title"
    >
      <header
        class="w-full bg-white dark:bg-slate-950 flex items-center justify-center px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0"
      >
        <div class="flex items-center justify-center w-full">
          <span class="text-lg font-extrabold text-blue-900 dark:text-white font-h1 tracking-tight">
            {{ t('brand.name') }}
          </span>
        </div>
      </header>

      <main class="flex-1 w-full max-w-md px-lg pt-xxl flex flex-col items-center min-h-0">
        <div
          class="mb-xl w-48 h-48 rounded-full overflow-hidden flex items-center justify-center bg-surface-container shrink-0"
        >
          <img
            class="w-full h-full object-cover opacity-90"
            :alt="t('languageGate.heroAlt')"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsKSGSYcpCS4LESNE0BW1DePxP3IHRSTQt209LKpeWlb3xysZrosVc3d8ZsKE2uoCnsVnzpyhfgcFdFsNZLZlYswB2g2UduDv3KdmtNy4KNsU8oXoeqoIoJPGvB7KOUj_ARNjkCdmIc24OaGqqEWRp6U0I-vCnwIF3uQAxp5Ux-60ICEfu9KCXS_aBoyY1B-IqTRukx7W-8uCegG70S4qT9-xP5OmAJZmXJo8HLOT-tYxV-7EqzhEmGCiiSGyipnovkSIlYjoO_Q4"
          />
        </div>

        <div class="text-center mb-xl shrink-0">
          <h1 id="language-gate-title" class="font-h2 text-h2 text-on-surface mb-xs">
            {{ t('languageGate.title') }}
          </h1>
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            {{ t('languageGate.subtitle') }}
          </p>
        </div>

        <div class="w-full space-y-md shrink-0">
          <button
            type="button"
            class="group w-full flex items-center justify-between p-lg border border-outline-variant rounded-lg bg-white dark:bg-slate-900 hover:bg-secondary-container/10 transition-all duration-200 active:scale-[0.98]"
            :class="selected === 'ar' ? 'border-2 border-secondary bg-secondary-container/5' : ''"
            @click="select('ar')"
          >
            <div class="flex items-center gap-md">
              <FontAwesomeIcon
                icon="earth-americas"
                class="text-lg"
                :class="selected === 'ar' ? 'text-secondary' : 'text-tertiary'"
              />
              <div class="text-start">
                <span class="block font-h3 text-body-lg text-secondary">العربية</span>
                <span class="block font-body-sm text-label-caps text-on-surface-variant">{{
                  t('languageGate.labelArabic')
                }}</span>
              </div>
            </div>
            <FontAwesomeIcon
              v-if="selected !== 'ar'"
              icon="chevron-right"
              class="text-outline group-hover:text-tertiary transition-colors text-lg"
            />
            <FontAwesomeIcon
              v-else
              icon="circle-check"
              class="text-secondary text-lg"
            />
          </button>

          <button
            type="button"
            class="group w-full flex items-center justify-between p-lg rounded-lg transition-all duration-200 active:scale-[0.98]"
            :class="
              selected === 'en'
                ? 'border-2 border-secondary bg-secondary-container/5 hover:bg-secondary-container/10'
                : 'border border-outline-variant bg-white dark:bg-slate-900 hover:bg-secondary-container/10'
            "
            @click="select('en')"
          >
            <div class="flex items-center gap-md">
              <FontAwesomeIcon
                icon="earth-americas"
                class="text-lg"
                :class="selected === 'en' ? 'text-secondary' : 'text-tertiary'"
              />
              <div class="text-start">
                <span class="block font-h3 text-body-lg text-secondary">{{ t('languageGate.labelEnglish') }}</span>
                <span class="block font-body-sm text-label-caps text-on-surface-variant">
                  {{ t('languageGate.defaultSelection') }}
                </span>
              </div>
            </div>
            <FontAwesomeIcon
              v-if="selected === 'en'"
              icon="circle-check"
              class="text-secondary text-lg"
            />
            <FontAwesomeIcon
              v-else
              icon="chevron-right"
              class="text-outline group-hover:text-tertiary transition-colors text-lg"
            />
          </button>

          <button
            type="button"
            class="group w-full flex items-center justify-between p-lg border border-outline-variant rounded-lg bg-white dark:bg-slate-900 hover:bg-secondary-container/10 transition-all duration-200 active:scale-[0.98]"
            :class="selected === 'ku' ? 'border-2 border-secondary bg-secondary-container/5' : ''"
            @click="select('ku')"
          >
            <div class="flex items-center gap-md">
              <FontAwesomeIcon
                icon="earth-americas"
                class="text-lg"
                :class="selected === 'ku' ? 'text-secondary' : 'text-tertiary'"
              />
              <div class="text-start">
                <span class="block font-h3 text-body-lg text-secondary">کوردی</span>
                <span class="block font-body-sm text-label-caps text-on-surface-variant">{{
                  t('languageGate.labelKurdish')
                }}</span>
              </div>
            </div>
            <FontAwesomeIcon
              v-if="selected !== 'ku'"
              icon="chevron-right"
              class="text-outline group-hover:text-tertiary transition-colors text-lg"
            />
            <FontAwesomeIcon
              v-else
              icon="circle-check"
              class="text-secondary text-lg"
            />
          </button>
        </div>

        <div class="mt-auto py-xl text-center shrink-0">
          <div class="flex items-center justify-center gap-xs text-on-surface-variant mb-sm">
            <FontAwesomeIcon icon="lock" class="text-[18px]" />
            <span class="font-label-caps text-label-caps uppercase">{{ t('languageGate.footerEncrypted') }}</span>
          </div>
          <p class="font-body-sm text-[12px] text-outline px-xl">
            {{ t('languageGate.footerLegal') }}
          </p>
        </div>
      </main>

      <div class="fixed inset-0 -z-10 pointer-events-none opacity-5 text-on-surface">
        <svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="language-gate-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#language-gate-grid)" />
        </svg>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const { t, setLocale } = useI18n()
const { hasChosenLocale, persistLocale } = useLocalePreference()

/** Default highlight matches design: English as default option */
const selected = ref('en')

async function select(code) {
  selected.value = code
  persistLocale(code)
  await setLocale(code)
}
</script>
