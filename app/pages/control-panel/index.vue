<template>
  <div
    class="bg-surface font-body-md text-on-surface antialiased min-h-dvh flex flex-col pb-20 md:pb-0"
  >
    <header
      class="bg-white dark:bg-slate-900 full-width top-0 sticky z-50 border-b border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none font-manrope antialiased text-sm"
    >
      <div
        class="flex justify-between items-center w-full px-6 md:px-12 h-16 max-w-screen-2xl mx-auto"
      >
        <div class="flex items-center gap-8">
          <span
            class="text-xl font-extrabold tracking-tight text-blue-900 dark:text-blue-500 uppercase"
          >{{ t('brand.name') }}</span>
          <nav class="hidden md:flex items-center gap-6">
            <!-- <a
              class="text-slate-600 dark:text-slate-400 font-medium hover:text-teal-600 dark:hover:text-teal-300 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              href="#"
            >{{ t('controlPanel.nav.findCare') }}</a>
            <a
              class="text-slate-600 dark:text-slate-400 font-medium hover:text-teal-600 dark:hover:text-teal-300 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              href="#"
            >{{ t('controlPanel.nav.specialists') }}</a>
            <a
              class="text-slate-600 dark:text-slate-400 font-medium hover:text-teal-600 dark:hover:text-teal-300 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              href="#"
            >{{ t('controlPanel.nav.insurance') }}</a> -->
            <a
              class="text-blue-900 dark:text-blue-400 font-bold border-b-2 border-blue-900 dark:border-blue-400 pb-1 active:scale-[0.98] cursor-pointer"
              href="#"
            >{{ t('controlPanel.nav.myDashboard') }}</a>
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <button
            type="button"
            class="p-2 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all duration-200"
            :aria-label="t('controlPanel.notificationsAria')"
          >
            <FontAwesomeIcon icon="bell" class="text-lg" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="p-2 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all duration-200"
            :aria-label="t('controlPanel.settingsAria')"
          >
            <FontAwesomeIcon icon="gear" class="text-lg" aria-hidden="true" />
          </button>
          <div
            class="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary-container shrink-0"
          >
            <img
              :alt="t('controlPanel.profileAlt')"
              class="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVK97OtNxxSoN6rN6uT_FGP_fffGYWgMmPnYA8CnAoX7_Dx02aei6oT8WmE0T0-BrhQKA0P19vRJcZCZlhkrd9eRhCaLQVNg_7PmN-us6cFjCsDcxL8ssIqTglWb2Zo0v2PlQwBF3yF2okERjh8wuvwvbHxoq42MXoqKtDn6viyEEH2M0FB9uRRpAW7Gy5FmtBMubY_x0b40RQph1S2PrkDnMYBljFheHRFO0GHQo7ugfaw-plW5sOJx1aC_L5uEAlWUZOp48XuH8"
            >
          </div>
        </div>
      </div>
    </header>

    <main
      class="max-w-screen-2xl mx-auto px-6 md:px-12 py-8 grid grid-cols-1 md:grid-cols-12 gap-8 flex-1 w-full"
    >
      <aside class="hidden md:block md:col-span-3 space-y-6">
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-outline-variant shadow-sm">
          <div class="flex flex-col items-center text-center mb-6">
            <div class="relative w-24 h-24 mb-4">
              <div
                class="absolute inset-0 rounded-full bg-secondary/20 opacity-20"
                aria-hidden="true"
              />
              <svg class="w-24 h-24 transform -rotate-90" aria-hidden="true">
                <circle cx="48" cy="48" fill="transparent" r="40" stroke="#e2e8f0" stroke-width="8" />
                <circle
                  cx="48"
                  cy="48"
                  fill="transparent"
                  r="40"
                  stroke="#006a6a"
                  stroke-dasharray="251.2"
                  stroke-dashoffset="62.8"
                  stroke-linecap="round"
                  stroke-width="8"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="font-h2 text-secondary text-2xl">{{ t('controlPanel.profileStrength.percent') }}</span>
              </div>
            </div>
            <h3 class="font-h3 text-secondary mb-1">{{ t('controlPanel.profileStrength.title') }}</h3>
            <p class="font-body-sm text-outline">{{ t('controlPanel.profileStrength.hint') }}</p>
          </div>
          <div class="space-y-3">
            <div class="flex items-start gap-3 p-3 bg-surface rounded-lg">
              <FontAwesomeIcon icon="clock" class="text-tertiary text-xl mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p class="font-body-sm font-semibold text-on-surface">
                  {{ t('controlPanel.profileStrength.hoursTitle') }}
                </p>
                <button
                  type="button"
                  class="text-tertiary font-label-caps text-xs hover:underline mt-1 uppercase tracking-wide"
                >
                  {{ t('controlPanel.profileStrength.hoursCta') }}
                </button>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 bg-surface rounded-lg">
              <FontAwesomeIcon icon="camera" class="text-tertiary text-xl mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p class="font-body-sm font-semibold text-on-surface">
                  {{ t('controlPanel.profileStrength.photosTitle') }}
                </p>
                <button
                  type="button"
                  class="text-tertiary font-label-caps text-xs hover:underline mt-1 uppercase tracking-wide"
                >
                  {{ t('controlPanel.profileStrength.photosCta') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-secondary-container/10 p-6 rounded-xl border border-secondary-container/30">
          <h4 class="font-label-caps text-secondary mb-4 uppercase tracking-wide">
            {{ t('controlPanel.sidebar.clinicManagement') }}
          </h4>
          <nav class="space-y-4">
            <a class="flex items-center gap-3 text-secondary font-medium hover:translate-x-1 transition-transform" href="#">
              <FontAwesomeIcon icon="users" class="shrink-0" aria-hidden="true" />
              {{ t('controlPanel.sidebar.staffMembers') }}
            </a>
            <a class="flex items-center gap-3 text-secondary font-medium hover:translate-x-1 transition-transform" href="#">
              <FontAwesomeIcon icon="boxes-stacked" class="shrink-0" aria-hidden="true" />
              {{ t('controlPanel.sidebar.medicalSupplies') }}
            </a>
            <a class="flex items-center gap-3 text-secondary font-medium hover:translate-x-1 transition-transform" href="#">
              <FontAwesomeIcon icon="credit-card" class="shrink-0" aria-hidden="true" />
              {{ t('controlPanel.sidebar.billing') }}
            </a>
          </nav>
        </div>
      </aside>

      <section class="md:col-span-9 space-y-8">
        <header class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="font-h1 text-secondary">{{ t('controlPanel.overview.title') }}</h1>
            <p class="font-body-lg text-outline">
              {{ t('controlPanel.overview.welcome', { name: t('controlPanel.demoName') }) }}
            </p>
          </div>
          <div class="flex gap-3">
            <NuxtLink
              to="/control-panel/new-patient"
              class="px-6 py-2.5 bg-tertiary text-on-tertiary font-button rounded-lg shadow-sm active:scale-95 transition-all text-center inline-flex items-center justify-center"
            >
              {{ t('controlPanel.newPatient') }}
            </NuxtLink>
          </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-outline-variant shadow-sm">
            <div class="flex justify-between items-start mb-4">
              <div class="p-3 bg-secondary-container/30 rounded-lg">
                <FontAwesomeIcon icon="magnifying-glass" class="text-secondary text-xl" aria-hidden="true" />
              </div>
              <span class="text-tertiary font-semibold flex items-center gap-1 text-sm">
                <FontAwesomeIcon icon="arrow-trend-up" class="text-sm" aria-hidden="true" />
                {{ t('controlPanel.stats.searchDelta') }}
              </span>
            </div>
            <p class="font-label-caps text-outline mb-1 uppercase tracking-wide">
              {{ t('controlPanel.stats.searchAppearances') }}
            </p>
            <h2 class="font-h2 text-secondary">{{ t('controlPanel.stats.searchValue') }}</h2>
          </div>
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-outline-variant shadow-sm">
            <div class="flex justify-between items-start mb-4">
              <div class="p-3 bg-tertiary-fixed-dim/30 rounded-lg">
                <FontAwesomeIcon icon="phone" class="text-tertiary text-xl" aria-hidden="true" />
              </div>
              <span class="text-tertiary font-semibold flex items-center gap-1 text-sm">
                <FontAwesomeIcon icon="arrow-trend-up" class="text-sm" aria-hidden="true" />
                {{ t('controlPanel.stats.contactDelta') }}
              </span>
            </div>
            <p class="font-label-caps text-outline mb-1 uppercase tracking-wide">
              {{ t('controlPanel.stats.contacted') }}
            </p>
            <h2 class="font-h2 text-secondary">{{ t('controlPanel.stats.contactValue') }}</h2>
          </div>
          <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-outline-variant shadow-sm">
            <div class="flex justify-between items-start mb-4">
              <div class="p-3 bg-error-container/30 rounded-lg">
                <FontAwesomeIcon icon="user-plus" class="text-error text-xl" aria-hidden="true" />
              </div>
              <span class="text-error font-semibold flex items-center gap-1 text-sm">
                <FontAwesomeIcon icon="triangle-exclamation" class="text-sm" aria-hidden="true" />
                {{ t('controlPanel.stats.urgent') }}
              </span>
            </div>
            <p class="font-label-caps text-outline mb-1 uppercase tracking-wide">
              {{ t('controlPanel.stats.patientsEnrolled') }}
            </p>
            <h2 class="font-h2 text-secondary">{{ t('controlPanel.stats.patientsValue') }}</h2>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-xl border border-outline-variant overflow-hidden">
          <div class="p-6 border-b border-outline-variant flex justify-between items-center">
            <h3 class="font-h3 text-secondary">{{ t('controlPanel.patientLogs.title') }}</h3>
            <button type="button" class="text-tertiary font-button text-sm hover:underline">
              {{ t('controlPanel.patientLogs.viewAll') }}
            </button>
          </div>
          <div class="divide-y divide-outline-variant">
            <div class="p-6 flex gap-4">
              <div
                class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0"
              >
                <FontAwesomeIcon icon="circle-check" class="text-secondary" aria-hidden="true" />
              </div>
              <div class="flex-grow min-w-0">
                <div class="flex justify-between gap-2 mb-1 flex-wrap">
                  <h4 class="font-body-md font-bold text-secondary">{{ t('controlPanel.patientLogs.entry1.name') }}</h4>
                  <span class="text-[12px] font-semibold text-tertiary bg-tertiary/10 px-2 py-0.5 rounded shrink-0">{{
                    t('controlPanel.patientLogs.completed')
                  }}</span>
                </div>
                <p class="font-body-sm text-on-surface">{{ t('controlPanel.patientLogs.entry1.body') }}</p>
                <span class="text-[12px] text-outline mt-2 block">{{ t('controlPanel.patientLogs.entry1.meta') }}</span>
              </div>
            </div>
            <div class="p-6 flex gap-4">
              <div
                class="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center shrink-0"
              >
                <FontAwesomeIcon icon="arrows-rotate" class="text-secondary" aria-hidden="true" />
              </div>
              <div class="flex-grow min-w-0">
                <div class="flex justify-between gap-2 mb-1 flex-wrap">
                  <h4 class="font-body-md font-bold text-secondary">{{ t('controlPanel.patientLogs.entry2.name') }}</h4>
                  <span class="text-[12px] font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded shrink-0">{{
                    t('controlPanel.patientLogs.inProgress')
                  }}</span>
                </div>
                <p class="font-body-sm text-on-surface">{{ t('controlPanel.patientLogs.entry2.body') }}</p>
                <span class="text-[12px] text-outline mt-2 block">{{ t('controlPanel.patientLogs.entry2.meta') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-outline-variant shadow-sm">
          <h3 class="font-h3 text-secondary mb-4">{{ t('controlPanel.upcomingFeatures.title') }}</h3>
          <div class="flex flex-wrap gap-3">
            <button
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.appointmentScheduling') }}
            </button>
            <button
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.contactPatients') }}
            </button>
            <button
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.crm') }}
            </button>
            <button
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.telemedicine') }}
            </button>
            <button
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.aiDiagnostics') }}
            </button>
          </div>
        </div>
      </section>
    </main>

    <nav
      class="fixed bottom-0 left-0 right-0 w-full h-16 flex justify-around items-center px-4 pb-safe md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50"
      :aria-label="t('controlPanel.bottomNav.ariaLabel')"
    >
      <div
        class="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 transition-transform duration-300 ease-in-out active:bg-slate-50 dark:active:bg-slate-800 rounded-lg px-2 py-1"
      >
        <FontAwesomeIcon icon="house" class="text-xl mb-0.5" aria-hidden="true" />
        <span class="text-[10px] font-semibold font-manrope uppercase tracking-wider">{{ t('controlPanel.bottomNav.home') }}</span>
      </div>
      <div
        class="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 transition-transform duration-300 ease-in-out active:bg-slate-50 dark:active:bg-slate-800 rounded-lg px-2 py-1"
      >
        <FontAwesomeIcon icon="magnifying-glass" class="text-xl mb-0.5" aria-hidden="true" />
        <span class="text-[10px] font-semibold font-manrope uppercase tracking-wider">{{ t('controlPanel.bottomNav.search') }}</span>
      </div>
      <div
        class="flex flex-col items-center justify-center text-blue-900 dark:text-blue-400 scale-110 transition-transform duration-300 ease-in-out active:bg-slate-50 dark:active:bg-slate-800 rounded-lg px-2 py-1"
      >
        <FontAwesomeIcon icon="calendar-days" class="text-xl mb-0.5" aria-hidden="true" />
        <span class="text-[10px] font-semibold font-manrope uppercase tracking-wider">{{
          t('controlPanel.bottomNav.appointments')
        }}</span>
      </div>
      <div
        class="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 transition-transform duration-300 ease-in-out active:bg-slate-50 dark:active:bg-slate-800 rounded-lg px-2 py-1"
      >
        <FontAwesomeIcon icon="circle-user" class="text-xl mb-0.5" aria-hidden="true" />
        <span class="text-[10px] font-semibold font-manrope uppercase tracking-wider">{{ t('controlPanel.bottomNav.profile') }}</span>
      </div>
    </nav>
  </div>
</template>

<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => t('controlPanel.seoTitle'),
})
</script>
