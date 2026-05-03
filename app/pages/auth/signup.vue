<template>
  <div class="min-h-dvh flex flex-col bg-surface text-on-surface font-body-md selection:bg-secondary-container">
    <main class="flex-1 flex flex-col items-center justify-center p-md px-4 py-8">
      <!-- Brand Identity Header (matches login) -->
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

      <div class="w-full max-w-[500px]">
        <div class="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-xl md:p-xxl">
          <header class="mb-lg text-center">
            <h1 class="font-h2 text-h2 text-on-surface mb-xs">
              {{ t('signup.title') }}
            </h1>
            <p class="font-body-sm text-body-sm text-outline">
              {{ t('signup.subtitle') }}
            </p>
          </header>

          <form class="flex flex-col gap-md" @submit.prevent="onSubmit">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div class="flex flex-col gap-xs">
                <label class="font-label-caps text-label-caps text-on-surface-variant" for="signup-name">
                  {{ t('signup.nameLabel') }}
                </label>
                <input
                  id="signup-name"
                  v-model="name"
                  name="name"
                  class="w-full px-md py-sm border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-all outline-none bg-surface-container-lowest"
                  :placeholder="t('signup.namePlaceholder')"
                  type="text"
                  autocomplete="given-name"
                />
              </div>
              <div class="flex flex-col gap-xs">
                <label class="font-label-caps text-label-caps text-on-surface-variant" for="signup-surname">
                  {{ t('signup.surnameLabel') }}
                </label>
                <input
                  id="signup-surname"
                  v-model="surname"
                  name="surname"
                  class="w-full px-md py-sm border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-all outline-none bg-surface-container-lowest"
                  :placeholder="t('signup.surnamePlaceholder')"
                  type="text"
                  autocomplete="family-name"
                />
              </div>
            </div>

            <div class="flex flex-col gap-xs">
              <label class="font-label-caps text-label-caps text-on-surface-variant" for="signup-email">
                {{ t('signup.emailLabel') }}
              </label>
              <div class="relative group">
                <FontAwesomeIcon
                  icon="envelope"
                  class="absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none group-focus-within:text-tertiary transition-colors"
                  aria-hidden="true"
                />
                <input
                  id="signup-email"
                  v-model="email"
                  name="email"
                  class="w-full pl-xl pr-md py-sm border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-all outline-none bg-surface-container-lowest"
                  :placeholder="t('signup.emailPlaceholder')"
                  type="email"
                  autocomplete="email"
                />
              </div>
            </div>

            <div class="flex flex-col gap-xs">
              <label class="font-label-caps text-label-caps text-on-surface-variant" for="signup-password">
                {{ t('signup.passwordLabel') }}
              </label>
              <div class="relative group">
                <FontAwesomeIcon
                  icon="lock"
                  class="absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none group-focus-within:text-tertiary transition-colors"
                  aria-hidden="true"
                />
                <input
                  id="signup-password"
                  v-model="password"
                  name="password"
                  class="w-full pl-xl pr-md py-sm border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-all outline-none bg-surface-container-lowest"
                  :placeholder="t('signup.passwordPlaceholder')"
                  type="password"
                  autocomplete="new-password"
                />
              </div>
            </div>

            <div class="flex flex-col gap-xs">
              <label class="font-label-caps text-label-caps text-on-surface-variant" for="signup-repeat-password">
                {{ t('signup.repeatPasswordLabel') }}
              </label>
              <div class="relative group">
                <FontAwesomeIcon
                  icon="user-check"
                  class="absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none group-focus-within:text-tertiary transition-colors"
                  aria-hidden="true"
                />
                <input
                  id="signup-repeat-password"
                  v-model="repeatPassword"
                  name="repeat_password"
                  class="w-full pl-xl pr-md py-sm border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-all outline-none bg-surface-container-lowest"
                  :placeholder="t('signup.passwordPlaceholder')"
                  type="password"
                  autocomplete="new-password"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div class="flex flex-col gap-xs">
                <label class="font-label-caps text-label-caps text-on-surface-variant" for="signup-city">
                  {{ t('signup.cityLabel') }}
                </label>
                <input
                  id="signup-city"
                  v-model="city"
                  name="city"
                  class="w-full px-md py-sm border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-all outline-none bg-surface-container-lowest"
                  :placeholder="t('signup.cityPlaceholder')"
                  type="text"
                  autocomplete="address-level2"
                />
              </div>
              <div class="flex flex-col gap-xs">
                <label class="font-label-caps text-label-caps text-on-surface-variant" for="signup-birthday">
                  {{ t('signup.birthdayLabel') }}
                </label>
                <input
                  id="signup-birthday"
                  v-model="birthday"
                  name="birthday"
                  class="w-full px-md py-sm border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-all outline-none bg-surface-container-lowest"
                  type="date"
                />
              </div>
            </div>

            <div class="flex items-start gap-sm mt-xs">
              <input
                id="signup-terms"
                v-model="acceptedTerms"
                class="mt-1 rounded-sm border-outline-variant text-tertiary focus:ring-tertiary shrink-0"
                type="checkbox"
              />
              <label class="font-body-sm text-body-sm text-on-surface-variant text-start" for="signup-terms">
                {{ t('signup.termsIntro') }}
                <a class="text-tertiary hover:underline" href="#">{{ t('login.termsOfService') }}</a>
                {{ t('signup.termsBetween') }}
                <a class="text-tertiary hover:underline" href="#">{{ t('login.privacyPolicy') }}</a>
                {{ t('signup.termsEnd') }}
              </label>
            </div>

            <AppButton
              class="mt-md w-full bg-secondary text-on-secondary py-md rounded-lg font-button text-button hover:opacity-90 transition-opacity flex items-center justify-center gap-sm active:scale-[0.98]"
              type="submit"
            >
              {{ t('signup.submit') }}
              <FontAwesomeIcon icon="arrow-right" class="text-[20px]" aria-hidden="true" />
            </AppButton>
          </form>

          <footer class="mt-xl pt-lg border-t border-outline-variant text-center">
            <p class="font-body-sm text-body-sm text-on-surface-variant">
              {{ t('signup.footerPrompt') }}
              <AppButton
                to="/auth/login"
                class="text-secondary font-semibold hover:underline decoration-2 underline-offset-4 transition-all"
              >
                {{ t('signup.footerLogin') }}
              </AppButton>
            </p>
          </footer>
        </div>

        <div class="mt-xl flex flex-col items-center gap-md opacity-60">
          <div class="flex flex-wrap items-center justify-center gap-md">
            <div class="flex items-center gap-xs">
              <FontAwesomeIcon icon="shield-halved" class="text-[18px] text-outline" aria-hidden="true" />
              <span class="font-label-caps text-[10px] uppercase">{{ t('signup.badgeHipaa') }}</span>
            </div>
            <div class="w-px h-3 bg-outline-variant shrink-0" aria-hidden="true" />
            <div class="flex items-center gap-xs">
              <FontAwesomeIcon icon="key" class="text-[18px] text-outline" aria-hidden="true" />
              <span class="font-label-caps text-[10px] uppercase">{{ t('signup.badgeEncrypted') }}</span>
            </div>
          </div>
          <p class="font-body-sm text-[12px] text-outline text-center">
            {{ t('signup.helpPrefix') }}
            <a class="underline" href="#">{{ t('login.contactSupport') }}</a>
          </p>
        </div>
      </div>
    </main>

    <BottomNavBar />
    <div class="h-16 md:hidden" aria-hidden="true" />
  </div>
</template>

<script setup>
const { t } = useI18n()

const name = ref('')
const surname = ref('')
const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const city = ref('')
const birthday = ref('')
const acceptedTerms = ref(false)

useSeoMeta({
  title: () => t('signup.title'),
})

function onSubmit() {
  /* Signup integration placeholder */
}
</script>
