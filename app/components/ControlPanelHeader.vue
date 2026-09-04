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
          <div ref="patientMenuRef" class="relative">
            <AppButton
              type="button"
              class="text-blue-900 dark:text-blue-400 font-bold pb-1 flex items-center gap-1 active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary rounded"
              aria-haspopup="true"
              :aria-expanded="patientMenuOpen"
              @click="patientMenuOpen = !patientMenuOpen"
            >
              {{ t('controlPanel.nav.patient') }}
              <FontAwesomeIcon icon="chevron-down" class="text-xs" aria-hidden="true" />
            </AppButton>
            <div
              v-show="patientMenuOpen"
              class="absolute z-30 mt-2 w-48 rounded-lg border border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-1"
              role="menu"
            >
              <AppButton
                to="/control-panel/add-new-patient"
                class="block w-full text-start px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-surface-container dark:hover:bg-slate-800"
                role="menuitem"
                @click="patientMenuOpen = false"
              >
                {{ t('controlPanel.nav.newPatient') }}
              </AppButton>
              <AppButton
                to="/control-panel/search-patient"
                class="block w-full text-start px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-surface-container dark:hover:bg-slate-800"
                role="menuitem"
                @click="patientMenuOpen = false"
              >
                {{ t('controlPanel.nav.searchPatient') }}
              </AppButton>
            </div>
          </div>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <AppButton
          to="/control-panel/staff"
          class="p-2 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all duration-200 inline-flex"
          :aria-label="t('controlPanel.manageStaffAria')"
        >
          <FontAwesomeIcon icon="user-gear" class="text-lg" aria-hidden="true" />
        </AppButton>
        <AppButton
          to="/control-panel/edit-clinic"
          class="p-2 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all duration-200 inline-flex"
          :aria-label="t('controlPanel.editClinic')"
        >
          <FontAwesomeIcon icon="gear" class="text-lg" aria-hidden="true" />
        </AppButton>
        <div ref="accountMenuRef" class="relative">
          <AppButton
            type="button"
            class="block w-10 h-10 rounded-full overflow-hidden border-2 border-secondary-container shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary"
            aria-haspopup="true"
            :aria-expanded="accountMenuOpen"
            :aria-label="t('controlPanel.accountMenu.ariaLabel')"
            @click="accountMenuOpen = !accountMenuOpen"
          >
            <img
              :alt="t('controlPanel.profileAlt')"
              class="w-full h-full object-cover"
              :src="avatarSrc"
            >
          </AppButton>
          <div
            v-show="accountMenuOpen"
            class="absolute end-0 z-30 mt-2 w-56 rounded-lg border border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-1"
            role="menu"
          >
            <div v-if="user?.name || user?.email" class="px-4 py-2 border-b border-outline-variant dark:border-slate-700">
              <p v-if="user?.name" class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{{ user.name }}</p>
              <p v-if="user?.email" class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ user.email }}</p>
            </div>
            <AppButton
              type="button"
              class="flex items-center gap-2 w-full text-start px-4 py-2 text-sm text-error hover:bg-surface-container dark:hover:bg-slate-800 disabled:opacity-60"
              role="menuitem"
              :disabled="signingOut"
              @click="onLogout"
            >
              <FontAwesomeIcon :icon="signingOut ? 'arrows-rotate' : 'right-from-bracket'" :class="signingOut && 'animate-spin'" aria-hidden="true" />
              {{ t('controlPanel.accountMenu.signOut') }}
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const { t } = useI18n()
const { api, user, token, clearSession, ensureUserLoaded } = useMedDirectApi()

const PLACEHOLDER_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCVK97OtNxxSoN6rN6uT_FGP_fffGYWgMmPnYA8CnAoX7_Dx02aei6oT8WmE0T0-BrhQKA0P19vRJcZCZlhkrd9eRhCaLQVNg_7PmN-us6cFjCsDcxL8ssIqTglWb2Zo0v2PlQwBF3yF2okERjh8wuvwvbHxoq42MXoqKtDn6viyEEH2M0FB9uRRpAW7Gy5FmtBMubY_x0b40RQph1S2PrkDnMYBljFheHRFO0GHQo7ugfaw-plW5sOJx1aC_L5uEAlWUZOp48XuH8'

const avatarSrc = computed(() => user.value?.avatar_url || PLACEHOLDER_AVATAR)

const patientMenuOpen = ref(false)
const patientMenuRef = ref(null)
const accountMenuOpen = ref(false)
const accountMenuRef = ref(null)
const signingOut = ref(false)

function onDocumentClick(e) {
  if (patientMenuRef.value && !patientMenuRef.value.contains(e.target)) {
    patientMenuOpen.value = false
  }
  if (accountMenuRef.value && !accountMenuRef.value.contains(e.target)) {
    accountMenuOpen.value = false
  }
}

async function onLogout() {
  signingOut.value = true
  try {
    if (token.value) {
      try {
        await api('/api/logout', { method: 'POST' })
      }
      catch {
        /* still clear local session */
      }
    }
    clearSession()
    await navigateTo('/auth/login')
  }
  finally {
    signingOut.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  ensureUserLoaded()
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>
