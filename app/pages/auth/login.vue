<template>
  <div class="min-h-dvh flex flex-col bg-surface text-on-surface font-body-md selection:bg-secondary-container">
    <main class="flex-1 flex flex-col items-center justify-center p-md px-4 py-8">
      <!-- Brand Identity Header -->
      <header class="mb-xxl text-center">
        <div class="flex items-center justify-center gap-sm mb-xs">
          <FontAwesomeIcon
            :icon="['fas', 'briefcase-medical']"
            class="text-secondary text-4xl"
            aria-hidden="true"
          />
          <h1 class="font-h1 text-h1 text-on-secondary-fixed-variant tracking-tight">
            {{ t('brand.name') }}
          </h1>
        </div>
        <p class="font-body-md text-on-surface-variant">
          {{ t('login.portalSubtitle') }}
        </p>
      </header>

      <!-- Main Login Card -->
      <div
        class="w-full max-w-[440px] bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-xl overflow-hidden relative"
      >
        <div class="absolute top-0 left-0 w-full h-1 bg-tertiary" aria-hidden="true" />
        <div class="space-y-lg">
          <div class="text-center md:text-start">
            <h2 class="font-h2 text-h2 text-on-surface mb-xs">
              {{ t('login.signInTitle') }}
            </h2>
            <p class="font-body-sm text-on-surface-variant">
              {{ t('login.signInDescription') }}
            </p>
          </div>

          <form class="space-y-md" @submit.prevent="onSubmit">
            <div class="space-y-xs">
              <label class="font-label-caps text-label-caps text-on-surface-variant uppercase" for="login-email">
                {{ t('login.emailLabel') }}
              </label>
              <div class="relative group">
                <FontAwesomeIcon
                  icon="envelope"
                  class="absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-tertiary transition-colors pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="login-email"
                  v-model="email"
                  name="email"
                  class="w-full pl-xxl pr-md py-md bg-surface-container border border-outline-variant rounded-lg focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-all outline-none text-body-md"
                  :placeholder="t('login.emailPlaceholder')"
                  type="email"
                  autocomplete="email"
                />
              </div>
            </div>

            <div class="space-y-xs">
              <div class="flex justify-between items-center gap-sm flex-wrap">
                <label class="font-label-caps text-label-caps text-on-surface-variant uppercase" for="login-password">
                  {{ t('login.passwordLabel') }}
                </label>
                <NuxtLink
                  to="#"
                  class="font-body-sm text-tertiary hover:underline shrink-0"
                >
                  {{ t('login.forgotPassword') }}
                </NuxtLink>
              </div>
              <div class="relative group">
                <FontAwesomeIcon
                  icon="lock"
                  class="absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-tertiary transition-colors pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="login-password"
                  v-model="password"
                  name="password"
                  class="w-full pl-xxl pr-md py-md bg-surface-container border border-outline-variant rounded-lg focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-all outline-none text-body-md"
                  :placeholder="t('login.passwordPlaceholder')"
                  type="password"
                  autocomplete="current-password"
                />
              </div>
            </div>

            <button
              class="w-full bg-secondary text-on-secondary font-button text-button py-md rounded-lg hover:bg-on-secondary-fixed-variant transition-colors shadow-sm active:scale-[0.98] flex items-center justify-center gap-sm"
              type="submit"
            >
              {{ t('login.submit') }}
              <FontAwesomeIcon icon="right-to-bracket" aria-hidden="true" />
            </button>
          </form>

          <div class="relative flex items-center py-sm">
            <div class="flex-grow border-t border-outline-variant" />
            <span class="flex-shrink mx-md font-label-caps text-outline text-[10px]">
              {{ t('login.dividerNewPatient') }}
            </span>
            <div class="flex-grow border-t border-outline-variant" />
          </div>

          <NuxtLink
            to="/auth/signup"
            class="w-full bg-surface-container-low text-secondary border border-secondary/20 font-button text-button py-md rounded-lg hover:bg-secondary-fixed transition-colors active:scale-[0.98] flex items-center justify-center text-center"
          >
            {{ t('login.createAccount') }}
          </NuxtLink>

          <div class="pt-sm">
            <NuxtLink
              to="/test-findings/find-test-results"
              class="w-full bg-tertiary-container text-on-tertiary-container border border-tertiary/30 font-button text-button py-md rounded-lg hover:bg-tertiary-fixed transition-colors flex items-center justify-center gap-sm group active:scale-[0.98]"
            >
              <FontAwesomeIcon icon="flask" class="text-tertiary" aria-hidden="true" />
              {{ t('login.findTestResults') }}
              <FontAwesomeIcon
                icon="chevron-right"
                class="text-tertiary opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
            </NuxtLink>
          </div>

          <div class="pt-sm">
            <button
              type="button"
              class="w-full bg-tertiary-container text-on-tertiary-container border border-tertiary/30 font-button text-button py-md rounded-lg hover:bg-tertiary-fixed transition-colors flex items-center justify-center gap-sm group active:scale-[0.98]"
            >
              <FontAwesomeIcon icon="hospital" class="text-tertiary" aria-hidden="true" />
              {{ t('login.forClinicsAndLabs') }}
              <FontAwesomeIcon
                icon="chevron-right"
                class="text-tertiary opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      <footer class="mt-xxl text-center max-w-xl mx-auto px-lg">
        <p class="font-body-sm text-on-surface-variant mb-md">
          {{ t('login.footerCopyright', { year: copyrightYear }) }}
        </p>
        <div class="flex flex-wrap justify-center gap-lg">
          <a class="font-body-sm text-outline hover:text-tertiary transition-colors" href="#">
            {{ t('login.privacyPolicy') }}
          </a>
          <a class="font-body-sm text-outline hover:text-tertiary transition-colors" href="#">
            {{ t('login.termsOfService') }}
          </a>
          <a class="font-body-sm text-outline hover:text-tertiary transition-colors" href="#">
            {{ t('login.contactSupport') }}
          </a>
          <a class="font-body-sm text-outline hover:text-tertiary transition-colors" href="#">
            {{ t('login.patientRights') }}
          </a>
        </div>
      </footer>
    </main>

    <BottomNavBar />
    <div class="h-16 md:hidden" aria-hidden="true" />
  </div>
</template>

<script setup>
const { t } = useI18n()

const email = ref('')
const password = ref('')

const copyrightYear = new Date().getFullYear()

useSeoMeta({
  title: () => t('login.signInTitle'),
})

function onSubmit() {
  /* Auth integration placeholder */
}
</script>
