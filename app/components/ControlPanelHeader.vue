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
          <AppButton
            to="/control-panel/orders"
            class="text-blue-900 dark:text-blue-400 font-bold pb-1 active:scale-[0.98] cursor-pointer"
          >
            {{ t('controlPanel.nav.orders') }}
          </AppButton>
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
        <div ref="notifMenuRef" class="relative">
          <AppButton
            type="button"
            class="relative p-2 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all duration-200 inline-flex"
            aria-haspopup="true"
            :aria-expanded="notifMenuOpen"
            :aria-label="t('controlPanel.notifications.ariaLabel')"
            @click="toggleNotifMenu"
          >
            <FontAwesomeIcon icon="bell" class="text-lg" aria-hidden="true" />
            <span
              v-if="unreadCount > 0"
              class="absolute top-1 right-1 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-error text-white text-[10px] leading-[1.1rem] font-bold text-center"
            >{{ unreadCount > 9 ? '9+' : unreadCount }}</span>
          </AppButton>
          <div
            v-show="notifMenuOpen"
            class="absolute end-0 z-30 mt-2 w-80 max-w-[90vw] rounded-lg border border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-1"
            role="menu"
          >
            <div class="flex items-center justify-between px-4 py-2 border-b border-outline-variant dark:border-slate-700">
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {{ t('controlPanel.notifications.title') }}
              </p>
              <AppButton
                v-if="unreadCount > 0"
                type="button"
                class="text-xs text-tertiary hover:underline"
                @click="markAllRead"
              >
                {{ t('controlPanel.notifications.markAllRead') }}
              </AppButton>
            </div>
            <p v-if="noticesLoading" class="px-4 py-6 text-center text-sm text-slate-400">
              {{ t('controlPanel.notifications.loading') }}
            </p>
            <p v-else-if="!notices.length" class="px-4 py-6 text-center text-sm text-slate-400">
              {{ t('controlPanel.notifications.empty') }}
            </p>
            <ul v-else class="max-h-80 overflow-y-auto">
              <li v-for="notice in notices" :key="notice.id">
                <AppButton
                  type="button"
                  class="block w-full text-start px-4 py-3 text-sm hover:bg-surface-container dark:hover:bg-slate-800 border-b border-outline-variant/60 dark:border-slate-800 last:border-0"
                  role="menuitem"
                  @click="openNotice(notice)"
                >
                  <span class="flex items-start gap-2">
                    <span
                      v-if="!notice.is_read"
                      class="mt-1.5 h-1.5 w-1.5 rounded-full bg-tertiary shrink-0"
                      aria-hidden="true"
                    />
                    <span class="min-w-0">
                      <span class="block font-medium text-slate-800 dark:text-slate-100 truncate">{{ notice.patient_name }}</span>
                      <span class="block text-xs text-slate-500 dark:text-slate-400">
                        {{ t('controlPanel.notifications.changedFields', { fields: fieldLabels(notice.changed_fields) }) }}
                      </span>
                    </span>
                  </span>
                </AppButton>
              </li>
            </ul>
          </div>
        </div>
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
            <AppButton
              v-if="user?.name || user?.email"
              to="/control-panel/my-profile"
              class="block w-full text-start px-4 py-2 border-b border-outline-variant dark:border-slate-700 hover:bg-surface-container dark:hover:bg-slate-800"
              role="menuitem"
              @click="accountMenuOpen = false"
            >
              <p v-if="user?.name" class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{{ user.name }}</p>
              <p v-if="user?.email" class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ user.email }}</p>
              <span class="mt-1 inline-flex items-center gap-1 text-xs text-tertiary font-medium">
                <FontAwesomeIcon icon="pen-to-square" class="text-[10px]" aria-hidden="true" />
                {{ t('controlPanel.accountMenu.editProfile') }}
              </span>
            </AppButton>
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
const { activeOrganization } = useActiveOrganization()

const PLACEHOLDER_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCVK97OtNxxSoN6rN6uT_FGP_fffGYWgMmPnYA8CnAoX7_Dx02aei6oT8WmE0T0-BrhQKA0P19vRJcZCZlhkrd9eRhCaLQVNg_7PmN-us6cFjCsDcxL8ssIqTglWb2Zo0v2PlQwBF3yF2okERjh8wuvwvbHxoq42MXoqKtDn6viyEEH2M0FB9uRRpAW7Gy5FmtBMubY_x0b40RQph1S2PrkDnMYBljFheHRFO0GHQo7ugfaw-plW5sOJx1aC_L5uEAlWUZOp48XuH8'

const avatarSrc = computed(() => user.value?.avatar_url || PLACEHOLDER_AVATAR)

const patientMenuOpen = ref(false)
const patientMenuRef = ref(null)
const accountMenuOpen = ref(false)
const accountMenuRef = ref(null)
const signingOut = ref(false)

const notifMenuOpen = ref(false)
const notifMenuRef = ref(null)
const notices = ref([])
const unreadCount = ref(0)
const noticesLoading = ref(false)

const NOTICE_FIELD_LABEL_KEYS = {
  date_of_birth: 'controlPanel.notifications.field.dateOfBirth',
  blood_group: 'controlPanel.notifications.field.bloodGroup',
  phone: 'controlPanel.notifications.field.phone',
  national_id: 'controlPanel.notifications.field.nationalId',
}

function fieldLabels(changedFields) {
  return Object.keys(changedFields || {})
    .map((key) => t(NOTICE_FIELD_LABEL_KEYS[key] ?? key))
    .join(', ')
}

async function fetchNotices() {
  if (!activeOrganization.value) return
  noticesLoading.value = true
  try {
    const res = await api(`/api/organizations/${activeOrganization.value.id}/patient-notices`)
    notices.value = res.notices ?? []
    unreadCount.value = res.unread_count ?? 0
  }
  catch {
    // Non-critical — leave the list as-is on failure.
  }
  finally {
    noticesLoading.value = false
  }
}

function toggleNotifMenu() {
  notifMenuOpen.value = !notifMenuOpen.value
  if (notifMenuOpen.value) {
    fetchNotices()
  }
}

async function markAllRead() {
  if (!activeOrganization.value) return
  try {
    await api(`/api/organizations/${activeOrganization.value.id}/patient-notices/read-all`, { method: 'POST' })
    notices.value = notices.value.map((n) => ({ ...n, is_read: true }))
    unreadCount.value = 0
  }
  catch {
    /* ignore */
  }
}

async function openNotice(notice) {
  notifMenuOpen.value = false
  if (!notice.is_read && activeOrganization.value) {
    try {
      await api(`/api/organizations/${activeOrganization.value.id}/patient-notices/${notice.id}/read`, { method: 'POST' })
      unreadCount.value = Math.max(0, unreadCount.value - 1)
    }
    catch {
      /* ignore */
    }
  }
  await navigateTo({ path: '/control-panel/patient-record', query: { patient_id: String(notice.patient_id) } })
}

watch(activeOrganization, (org) => {
  if (org) fetchNotices()
})

function onDocumentClick(e) {
  if (patientMenuRef.value && !patientMenuRef.value.contains(e.target)) {
    patientMenuOpen.value = false
  }
  if (accountMenuRef.value && !accountMenuRef.value.contains(e.target)) {
    accountMenuOpen.value = false
  }
  if (notifMenuRef.value && !notifMenuRef.value.contains(e.target)) {
    notifMenuOpen.value = false
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

onMounted(async () => {
  document.addEventListener('click', onDocumentClick)
  await ensureUserLoaded()
  fetchNotices()
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>
