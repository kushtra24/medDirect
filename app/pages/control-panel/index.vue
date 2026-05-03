<template>
  <div
    class="bg-surface font-body-md text-on-surface antialiased min-h-dvh flex flex-col pb-20 md:pb-0"
  >
    <ControlPanelHeader />

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
                <AppButton
                  to="/control-panel/edit-clinic"
                  class="text-tertiary font-label-caps text-xs hover:underline mt-1 uppercase tracking-wide inline-block"
                >
                  {{ t('controlPanel.profileStrength.hoursCta') }}
                </AppButton>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 bg-surface rounded-lg">
              <FontAwesomeIcon icon="camera" class="text-tertiary text-xl mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p class="font-body-sm font-semibold text-on-surface">
                  {{ t('controlPanel.profileStrength.photosTitle') }}
                </p>
                <AppButton
                  to="/control-panel/edit-clinic"
                  class="text-tertiary font-label-caps text-xs hover:underline mt-1 uppercase tracking-wide inline-block"
                >
                  {{ t('controlPanel.profileStrength.photosCta') }}
                </AppButton>
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
            <AppButton
              to="/control-panel/add-new-patient"
              class="px-6 py-2.5 bg-tertiary text-on-tertiary font-button rounded-lg shadow-sm active:scale-95 transition-all text-center inline-flex items-center justify-center"
            >
              {{ t('controlPanel.newPatient') }}
            </AppButton>
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
            <AppButton
              to="/control-panel/search-patient"
              class="text-tertiary font-button text-sm hover:underline"
            >
              {{ t('controlPanel.patientLogs.viewAll') }}
            </AppButton>
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
            <AppButton
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.appointmentScheduling') }}
            </AppButton>
            <AppButton
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.contactPatients') }}
            </AppButton>
            <AppButton
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.crm') }}
            </AppButton>
            <AppButton
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.telemedicine') }}
            </AppButton>
            <AppButton
              type="button"
              class="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-sm font-medium text-on-surface hover:bg-secondary hover:text-white transition-colors cursor-pointer"
            >
              {{ t('controlPanel.upcomingFeatures.aiDiagnostics') }}
            </AppButton>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => t('controlPanel.seoTitle'),
})
</script>
