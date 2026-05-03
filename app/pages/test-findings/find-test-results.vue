<template>
  <div class="min-h-dvh flex flex-col bg-surface text-on-surface font-body-md selection:bg-secondary-container">
    <main class="flex-1 flex flex-col items-center justify-center px-4 py-xxl">
      <div class="w-full max-w-xl">
        <div class="mb-xl text-center">
          <div
            class="inline-flex items-center justify-center p-3 rounded-full bg-secondary-container text-on-secondary-container mb-md"
          >
            <FontAwesomeIcon :icon="['fas', 'microscope']" class="text-2xl" aria-hidden="true" />
          </div>
          <h1 class="font-h1 text-h1 text-on-surface mb-sm">
            {{ t('testFindings.title') }}
          </h1>
          <p class="font-body-md text-on-surface-variant max-w-md mx-auto">
            {{ t('testFindings.subtitle') }}
          </p>
        </div>

        <div
          class="bg-surface-container-lowest border border-outline-variant p-xl rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
        >
          <form class="space-y-lg" @submit.prevent="onSubmit">
            <div class="space-y-sm">
              <label
                class="font-label-caps text-label-caps text-on-surface-variant uppercase"
                for="find-results-full-name"
              >
                {{ t('testFindings.fullNameLabel') }}
              </label>
              <div class="relative group">
                <FontAwesomeIcon
                  icon="user"
                  class="absolute left-md top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none group-focus-within:text-tertiary transition-colors"
                  aria-hidden="true"
                />
                <input
                  id="find-results-full-name"
                  v-model="fullName"
                  name="full_name"
                  class="w-full pl-xl pr-md py-md bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-all placeholder:text-outline-variant text-body-md outline-none"
                  :placeholder="t('testFindings.fullNamePlaceholder')"
                  type="text"
                  autocomplete="name"
                />
              </div>
            </div>

            <div class="space-y-sm">
              <label
                class="font-label-caps text-label-caps text-on-surface-variant uppercase"
                for="find-results-access-pin"
              >
                {{ t('testFindings.pinLabel') }}
              </label>
              <div class="relative group">
                <FontAwesomeIcon
                  icon="lock"
                  class="absolute left-md top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none group-focus-within:text-tertiary transition-colors"
                  aria-hidden="true"
                />
                <input
                  id="find-results-access-pin"
                  v-model="accessPin"
                  name="access_pin"
                  class="w-full pl-xl pr-md py-md bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-all placeholder:text-outline-variant text-body-md outline-none"
                  :placeholder="t('testFindings.pinPlaceholder')"
                  type="text"
                  inputmode="numeric"
                  maxlength="6"
                  autocomplete="one-time-code"
                />
              </div>
            </div>

            <div class="pt-md space-y-md">
              <AppButton
                class="w-full bg-secondary text-on-secondary py-md px-lg rounded-lg font-button text-button hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
                type="submit"
              >
                <span>{{ t('testFindings.submit') }}</span>
                <FontAwesomeIcon icon="arrow-right" aria-hidden="true" />
              </AppButton>
              <div class="text-center">
                <a
                  class="text-body-sm font-medium text-tertiary hover:underline decoration-tertiary/30 transition-all inline-flex items-center justify-center gap-1"
                  href="#"
                >
                  <FontAwesomeIcon icon="question" class="text-[18px]" aria-hidden="true" />
                  {{ t('testFindings.helpPin') }}
                </a>
              </div>
            </div>
          </form>
        </div>

        <div class="mt-xl flex items-center justify-center gap-sm text-on-surface-variant/60">
          <FontAwesomeIcon icon="user-check" class="text-[16px] shrink-0" aria-hidden="true" />
          <span class="text-body-sm">{{ t('testFindings.trustLine') }}</span>
        </div>
      </div>
    </main>

    <BottomNavBar />
    <div class="h-16 md:hidden" aria-hidden="true" />
  </div>
</template>

<script setup>
const { t } = useI18n()

const fullName = ref('')
const accessPin = ref('')

useSeoMeta({
  title: () => t('testFindings.title'),
})

function onSubmit() {
  navigateTo({
    path: '/test-findings/results',
    query: {
      patient: fullName.value.trim(),
      pin: accessPin.value.trim(),
    },
  })
}
</script>
