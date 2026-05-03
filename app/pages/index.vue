<template>
  <div class="min-h-dvh flex flex-col bg-surface text-on-surface selection:bg-secondary-container">
    <main class="flex-1 flex items-center">
      <div class="max-w-screen-2xl mx-auto px-6 md:px-12 py-8 w-full">
        <section class="w-full max-w-3xl mx-auto">
          <!-- Logo -->
          <div class="mb-12 text-center">
            <AppLogo />
          </div>

          <div class="flex flex-col gap-6">
            <!-- Search Input -->
            <div class="flex items-center bg-white border border-outline-variant rounded-xl p-2 shadow-sm focus-within:border-tertiary focus-within:ring-1 focus-within:ring-tertiary transition-all">
              <FontAwesomeIcon icon="magnifying-glass" class="text-outline px-3 text-lg" />
              <input
                class="flex-grow bg-transparent border-none focus:ring-0 text-body-md placeholder:text-outline py-3 outline-none"
                :placeholder="t('home.searchPlaceholder')"
                type="text"
              />
            </div>

            <!-- City Input with Location Action -->
            <div class="flex flex-col gap-2">
              <div class="flex items-center bg-white border border-outline-variant rounded-xl p-2 shadow-sm focus-within:border-tertiary focus-within:ring-1 focus-within:ring-tertiary transition-all">
                <FontAwesomeIcon icon="location-dot" class="text-outline px-3 text-lg" />
                <input
                  class="flex-grow bg-transparent border-none focus:ring-0 text-body-md placeholder:text-outline py-3 outline-none"
                  :placeholder="t('home.cityPlaceholder')"
                  type="text"
                />
              </div>

              <AppButton class="flex items-center gap-2 px-3 py-1 self-start group transition-colors hover:bg-tertiary/5 rounded-md">
                <FontAwesomeIcon icon="location-crosshairs" class="text-tertiary text-base" />
                <span class="text-[11px] font-semibold text-tertiary uppercase tracking-wider group-hover:underline">
                  {{ t('home.myLocation') }}
                </span>
              </AppButton>
            </div>

            <!-- Search Button -->
            <AppButton class="mt-2">
              {{ t('home.searchClinics') }}
            </AppButton>
          </div>
        </section>
      </div>
    </main>

    <!-- Bottom Nav (mobile) -->
    <BottomNavBar />

    <!-- Bottom padding so content isn't hidden behind nav on mobile -->
    <div class="h-16 md:hidden" aria-hidden="true" />
  </div>
</template>

<script setup>
const { t } = useI18n()
</script>
