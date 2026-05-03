<template>
  <header
    class="bg-white dark:bg-slate-900 full-width top-0 sticky z-50 border-b border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none font-manrope antialiased text-sm"
  >
    <div
      class="flex justify-between items-center w-full px-6 md:px-12 h-16 max-w-screen-2xl mx-auto"
    >
      <div class="flex items-center gap-8">
        <AppButton
          to="/control-panel"
          class="text-xl font-extrabold tracking-tight text-blue-900 dark:text-blue-500 uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary rounded"
        >
          {{ t('brand.name') }}
        </AppButton>
        <nav class="hidden md:flex items-center gap-6" :aria-label="t('controlPanel.navAria')">
          <a
            class="text-blue-900 dark:text-blue-400 font-bold border-b-2 border-blue-900 dark:border-blue-400 pb-1 active:scale-[0.98] cursor-pointer"
            href="#"
          >{{ t('controlPanel.nav.myDashboard') }}</a>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <AppButton
          type="button"
          class="p-2 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all duration-200"
          :aria-label="t('controlPanel.notificationsAria')"
        >
          <FontAwesomeIcon icon="bell" class="text-lg" aria-hidden="true" />
        </AppButton>
        <AppButton
          to="/control-panel/edit-clinic"
          class="p-2 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all duration-200 inline-flex"
          :aria-label="t('controlPanel.editClinic')"
        >
          <FontAwesomeIcon icon="gear" class="text-lg" aria-hidden="true" />
        </AppButton>
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
</template>

<script setup>
const { t } = useI18n()
</script>
