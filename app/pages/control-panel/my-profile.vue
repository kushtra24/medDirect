<template>
  <div class="bg-surface font-body-md text-on-surface min-h-dvh flex flex-col antialiased">
    <ControlPanelHeader />

    <main class="flex-1 px-6 md:px-12 py-8 max-w-2xl mx-auto w-full">
      <div class="mb-6">
        <AppButton
          to="/control-panel"
          class="inline-flex items-center gap-xs text-on-surface-variant hover:text-tertiary font-button text-body-sm transition-colors"
        >
          <FontAwesomeIcon icon="arrow-left" aria-hidden="true" />
          {{ t('myProfilePage.backToDashboard') }}
        </AppButton>
      </div>

      <h1 class="font-h1 text-h1 text-blue-900 dark:text-blue-100 mb-2">
        {{ t('myProfilePage.title') }}
      </h1>
      <p class="text-on-surface-variant font-body-md mb-8">
        {{ t('myProfilePage.subtitle') }}
      </p>

      <section class="bg-white dark:bg-slate-900 border border-outline-variant rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <p class="font-label-caps text-label-caps text-slate-400 mb-2">
            {{ t('myProfilePage.fieldAvatar') }}
          </p>
          <div class="flex flex-col sm:flex-row sm:items-end gap-4">
            <div class="w-24 h-24 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0">
              <img :src="avatarPreview" alt="" class="h-full w-full object-cover" width="96" height="96">
            </div>
            <div class="flex flex-col gap-2 min-w-0">
              <input
                ref="fileInputRef"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                class="sr-only"
                @change="onFileSelected"
              >
              <AppButton
                type="button"
                class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                @click="fileInputRef?.click()"
              >
                <FontAwesomeIcon icon="camera" class="text-base" aria-hidden="true" />
                {{ t('myProfilePage.changePhoto') }}
              </AppButton>
              <AppButton
                type="button"
                class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-tertiary text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none"
                :disabled="!pendingAvatarFile || uploadingAvatar"
                @click="uploadAvatar"
              >
                <FontAwesomeIcon v-if="uploadingAvatar" icon="arrows-rotate" class="text-base animate-spin" aria-hidden="true" />
                <FontAwesomeIcon v-else icon="upload" class="text-base" aria-hidden="true" />
                {{ uploadingAvatar ? t('myProfilePage.uploadingPhoto') : t('myProfilePage.uploadPhoto') }}
              </AppButton>
            </div>
          </div>
          <p v-if="uploadError" class="mt-2 text-sm text-error">
            {{ uploadError }}
          </p>
        </div>

        <div class="space-y-1">
          <label class="text-label-caps font-label-caps text-slate-400" for="my-profile-name">
            {{ t('myProfilePage.fieldName') }}
          </label>
          <input
            id="my-profile-name"
            v-model="form.name"
            type="text"
            class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tertiary/30"
          >
        </div>

        <div class="space-y-1">
          <p class="text-label-caps font-label-caps text-slate-400">
            {{ t('myProfilePage.fieldEmail') }}
          </p>
          <p class="font-body-md font-semibold text-slate-800 dark:text-slate-100 break-all px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-dashed border-slate-200 dark:border-slate-700">
            {{ user?.email || '—' }}
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {{ t('myProfilePage.readOnlyHint') }}
          </p>
        </div>

        <div v-if="canEditTitle" class="space-y-1">
          <label class="text-label-caps font-label-caps text-slate-400" for="my-profile-title">
            {{ t('myProfilePage.fieldTitle') }}
          </label>
          <input
            id="my-profile-title"
            v-model="form.title"
            type="text"
            :placeholder="t('myProfilePage.titlePlaceholder')"
            class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tertiary/30"
          >
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {{ t('myProfilePage.titleHint', { org: activeOrganization?.name }) }}
          </p>
        </div>

        <p v-if="saveError" class="text-sm text-error">
          {{ saveError }}
        </p>
        <p v-if="saveSuccess" class="text-sm text-green-700 dark:text-green-400">
          {{ t('myProfilePage.saved') }}
        </p>

        <AppButton
          type="button"
          class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-900 dark:bg-blue-700 text-white font-button text-sm font-semibold hover:opacity-95 disabled:opacity-50 disabled:pointer-events-none"
          :disabled="saving"
          @click="saveProfile"
        >
          <FontAwesomeIcon v-if="saving" icon="arrows-rotate" class="animate-spin" aria-hidden="true" />
          <FontAwesomeIcon v-else icon="save" aria-hidden="true" />
          {{ saving ? t('myProfilePage.saving') : t('myProfilePage.save') }}
        </AppButton>
      </section>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'staff',
})

const { t } = useI18n()
const { api, apiUpload, user, setSession, ensureUserLoaded, token } = useMedDirectApi()
const { activeOrganization } = useActiveOrganization()

const fileInputRef = ref(null)
const pendingAvatarFile = ref(null)
const uploadingAvatar = ref(false)
const uploadError = ref('')
const saving = ref(false)
const saveError = ref('')
const saveSuccess = ref(false)

const form = reactive({
  name: '',
  title: '',
})

const isPlatformAdmin = computed(() => user.value?.role === 'admin')
const canEditTitle = computed(() =>
  isPlatformAdmin.value
  || !!activeOrganization.value?.is_owner
  || !!activeOrganization.value?.abilities?.canManageStaff,
)

const DEFAULT_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCVK97OtNxxSoN6rN6uT_FGP_fffGYWgMmPnYA8CnAoX7_Dx02aei6oT8WmE0T0-BrhQKA0P19vRJcZCZlhkrd9eRhCaLQVNg_7PmN-us6cFjCsDcxL8ssIqTglWb2Zo0v2PlQwBF3yF2okERjh8wuvwvbHxoq42MXoqKtDn6viyEEH2M0FB9uRRpAW7Gy5FmtBMubY_x0b40RQph1S2PrkDnMYBljFheHRFO0GHQo7ugfaw-plW5sOJx1aC_L5uEAlWUZOp48XuH8'

const objectUrl = ref('')

const avatarPreview = computed(() => objectUrl.value || user.value?.avatar_url || DEFAULT_AVATAR)

watch(pendingAvatarFile, (file) => {
  if (objectUrl.value) {
    URL.revokeObjectURL(objectUrl.value)
    objectUrl.value = ''
  }
  if (file) {
    objectUrl.value = URL.createObjectURL(file)
  }
})

onUnmounted(() => {
  if (objectUrl.value) {
    URL.revokeObjectURL(objectUrl.value)
  }
})

function syncFormFromState() {
  form.name = user.value?.name || ''
  form.title = activeOrganization.value?.title || ''
}

onMounted(async () => {
  await ensureUserLoaded()
  syncFormFromState()
})

watch([user, activeOrganization], () => {
  syncFormFromState()
})

function onFileSelected(e) {
  const f = e.target?.files?.[0]
  uploadError.value = ''
  saveSuccess.value = false
  pendingAvatarFile.value = f || null
}

async function uploadAvatar() {
  if (!pendingAvatarFile.value) return
  uploadError.value = ''
  uploadingAvatar.value = true
  try {
    const fd = new FormData()
    fd.append('avatar', pendingAvatarFile.value)
    const res = await apiUpload('/api/user/avatar', fd)
    setSession(token.value, res.user)
    pendingAvatarFile.value = null
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
  }
  catch {
    uploadError.value = t('myProfilePage.uploadError')
  }
  finally {
    uploadingAvatar.value = false
  }
}

async function saveProfile() {
  saveError.value = ''
  saveSuccess.value = false
  const name = form.name.trim()
  if (!name) {
    saveError.value = t('myProfilePage.nameRequired')
    return
  }
  saving.value = true
  try {
    const res = await api('/api/user/profile', { method: 'PATCH', body: { name } })
    setSession(token.value, res.user)

    if (canEditTitle.value && activeOrganization.value) {
      const titleRes = await api(`/api/organizations/${activeOrganization.value.id}/membership/title`, {
        method: 'PATCH',
        body: { title: form.title.trim() || null },
      })
      const updatedUser = {
        ...res.user,
        organizations: (res.user.organizations ?? []).map((org) =>
          org.id === activeOrganization.value.id ? { ...org, title: titleRes.title } : org,
        ),
      }
      setSession(token.value, updatedUser)
    }

    saveSuccess.value = true
  }
  catch (e) {
    saveError.value = e?.data?.message || t('myProfilePage.saveError')
  }
  finally {
    saving.value = false
  }
}

useSeoMeta({
  title: () => t('myProfilePage.seoTitle'),
})
</script>
