<template>
  <div class="font-body-md text-on-background min-h-dvh flex flex-col pb-24 md:pb-8 bg-slate-50 dark:bg-slate-950">
    <header
      class="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center gap-3"
    >
      <AppButton
        to="/profile"
        class="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium shrink-0"
      >
        <FontAwesomeIcon icon="arrow-left" class="text-base" aria-hidden="true" />
        <span class="hidden sm:inline">{{ t('patientProfile.editPage.backToProfile') }}</span>
      </AppButton>
      <h1 class="text-lg font-extrabold text-blue-900 dark:text-blue-200 font-h3 truncate">
        {{ t('patientProfile.editPage.title') }}
      </h1>
    </header>

    <main class="flex-1 p-gutter max-w-lg mx-auto w-full space-y-lg">
      <p class="text-body-sm text-slate-500 dark:text-slate-400">
        {{ t('patientProfile.editPage.subtitle') }}
      </p>

      <section
        class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-xl shadow-[0_10px_20px_-15px_rgba(0,0,0,0.04)] space-y-lg"
      >
        <div>
          <p class="text-label-caps font-label-caps text-slate-400 mb-sm">
            {{ t('patientProfile.editPage.fieldAvatar') }}
          </p>
          <div class="flex flex-col sm:flex-row sm:items-end gap-4">
            <div class="w-28 h-28 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0">
              <img
                :src="avatarPreview"
                alt=""
                class="h-full w-full object-cover"
                width="112"
                height="112"
              />
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
                {{ t('patientProfile.editPage.changePhoto') }}
              </AppButton>
              <AppButton
                type="button"
                class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-tertiary text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none"
                :disabled="!pendingAvatarFile || uploadingAvatar"
                @click="uploadAvatar"
              >
                <FontAwesomeIcon v-if="uploadingAvatar" icon="arrows-rotate" class="text-base animate-spin" aria-hidden="true" />
                <FontAwesomeIcon v-else icon="upload" class="text-base" aria-hidden="true" />
                {{ uploadingAvatar ? t('patientProfile.editPage.uploadingPhoto') : t('patientProfile.editPage.uploadPhoto') }}
              </AppButton>
            </div>
          </div>
          <p v-if="uploadError" class="mt-2 text-sm text-error">
            {{ uploadError }}
          </p>
        </div>

        <div class="space-y-1">
          <p class="text-label-caps font-label-caps text-slate-400">
            {{ t('patientProfile.editPage.fieldName') }}
          </p>
          <p class="font-body-md font-semibold text-slate-800 dark:text-slate-100 break-words px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-dashed border-slate-200 dark:border-slate-700">
            {{ user?.name || '—' }}
          </p>
        </div>

        <div class="space-y-1">
          <p class="text-label-caps font-label-caps text-slate-400">
            {{ t('patientProfile.editPage.fieldEmail') }}
          </p>
          <p class="font-body-md font-semibold text-slate-800 dark:text-slate-100 break-all px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-dashed border-slate-200 dark:border-slate-700">
            {{ user?.email || '—' }}
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {{ t('patientProfile.editPage.readOnlyHint') }}
          </p>
        </div>

        <div class="space-y-1">
          <label class="text-label-caps font-label-caps text-slate-400" for="edit-national-id">
            {{ t('patientProfile.editPage.fieldNationalId') }}
          </label>
          <input
            id="edit-national-id"
            v-model="form.national_id"
            type="text"
            class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tertiary/30"
          >
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {{ t('patientProfile.editPage.nationalIdHint') }}
          </p>
        </div>

        <div class="space-y-1">
          <label class="text-label-caps font-label-caps text-slate-400" for="edit-birthdate">
            {{ t('patientProfile.editPage.fieldBirthdate') }}
          </label>
          <input
            id="edit-birthdate"
            v-model="form.date_of_birth"
            type="date"
            class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tertiary/30"
          >
        </div>

        <div class="space-y-1">
          <label class="text-label-caps font-label-caps text-slate-400" for="edit-blood">
            {{ t('patientProfile.editPage.fieldBloodType') }}
          </label>
          <select
            id="edit-blood"
            v-model="form.blood_type"
            class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tertiary/30"
          >
            <option value="">
              {{ t('patientProfile.editPage.bloodTypePlaceholder') }}
            </option>
            <option v-for="bt in bloodTypes" :key="bt" :value="bt">
              {{ bt }}
            </option>
          </select>
        </div>

        <div class="space-y-1">
          <label class="text-label-caps font-label-caps text-slate-400" for="edit-phone">
            {{ t('patientProfile.editPage.fieldPhone') }}
          </label>
          <input
            id="edit-phone"
            v-model="form.phone"
            type="tel"
            autocomplete="tel"
            class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tertiary/30"
          >
        </div>

        <div class="space-y-1">
          <label class="text-label-caps font-label-caps text-slate-400" for="edit-address">
            {{ t('patientProfile.editPage.fieldAddress') }}
          </label>
          <textarea
            id="edit-address"
            v-model="form.address"
            rows="3"
            class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-tertiary/30 resize-y min-h-[5rem]"
          />
        </div>

        <p v-if="saveError" class="text-sm text-error">
          {{ saveError }}
        </p>
        <p v-if="saveSuccess" class="text-sm text-green-700 dark:text-green-400">
          {{ t('patientProfile.editPage.saved') }}
        </p>

        <AppButton
          type="button"
          class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-900 dark:bg-blue-700 text-white font-button text-sm font-semibold hover:opacity-95 disabled:opacity-50 disabled:pointer-events-none"
          :disabled="saving"
          @click="saveProfile"
        >
          <FontAwesomeIcon v-if="saving" icon="arrows-rotate" class="animate-spin" aria-hidden="true" />
          <FontAwesomeIcon v-else icon="save" aria-hidden="true" />
          {{ saving ? t('patientProfile.editPage.saving') : t('patientProfile.editPage.save') }}
        </AppButton>
      </section>

      <section
        class="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 rounded-xl p-xl space-y-3"
      >
        <h2 class="font-h3 text-body-lg text-red-800 dark:text-red-300">
          {{ t('patientProfile.editPage.deleteAccount') }}
        </h2>
        <p class="text-body-sm text-slate-600 dark:text-slate-400">
          {{ t('patientProfile.editPage.deleteModalBody') }}
        </p>
        <AppButton
          type="button"
          class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-950/40"
          @click="deleteModalOpen = true"
        >
          <FontAwesomeIcon icon="trash" aria-hidden="true" />
          {{ t('patientProfile.editPage.deleteAccount') }}
        </AppButton>
      </section>
    </main>

    <BottomNavBar class="md:hidden" />
    <div class="h-16 md:hidden" aria-hidden="true" />

    <Teleport to="body">
      <div
        v-if="deleteModalOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="deleteTitleId"
        @click.self="deleteModalOpen = false"
      >
        <div
          class="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-xl space-y-md"
          @keydown.esc="deleteModalOpen = false"
        >
          <div class="flex items-start gap-3">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300">
              <FontAwesomeIcon icon="triangle-exclamation" class="text-lg" aria-hidden="true" />
            </span>
            <div class="min-w-0">
              <h2 :id="deleteTitleId" class="font-h2 text-h3 text-slate-900 dark:text-slate-100">
                {{ t('patientProfile.editPage.deleteModalTitle') }}
              </h2>
              <p class="mt-2 text-body-sm text-slate-600 dark:text-slate-400">
                {{ t('patientProfile.editPage.deleteModalBody') }}
              </p>
            </div>
          </div>
          <p v-if="deleteError" class="text-sm text-error">
            {{ deleteError }}
          </p>
          <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
            <AppButton
              type="button"
              class="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
              :disabled="deleting"
              @click="deleteModalOpen = false"
            >
              {{ t('patientProfile.editPage.deleteModalCancel') }}
            </AppButton>
            <AppButton
              type="button"
              class="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
              :disabled="deleting"
              @click="confirmDeleteAccount"
            >
              {{ deleting ? t('patientProfile.editPage.deleting') : t('patientProfile.editPage.deleteModalConfirm') }}
            </AppButton>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()
const { api, apiUpload, user, setSession, clearSession, ensureUserLoaded, token } = useMedDirectApi()

const deleteTitleId = 'edit-profile-delete-title'

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']

const fileInputRef = ref(null)
const pendingAvatarFile = ref(null)
const uploadingAvatar = ref(false)
const uploadError = ref('')
const saving = ref(false)
const saveError = ref('')
const saveSuccess = ref(false)
const deleteModalOpen = ref(false)
const deleteError = ref('')
const deleting = ref(false)

const form = reactive({
  date_of_birth: '',
  blood_type: '',
  phone: '',
  address: '',
  national_id: '',
})

const DEFAULT_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQIp2SeFA0BiY7NcwrfY-ovT4swpQNvKfYl4B2IYVPYmksVrkHEzJKCM992CZ25h99dpDHf-2rL3M2u9iiwF_FZW3qPUelnSGLskfBByrF4eZeiR4LNdVN5M0PoFTXXCQoN4CncOEaB0CJQoUD4IXQ23aar5y4tcRDWtWR5zU4RFxDh9JjT28yu9pRePagaTuF7TAgACP5Nr4svs_uZQ-F6AsEQTb3VxZJnCBEGO2zt-r_Ggz9OFyhGkJJtyDUY6M391m3AqFgXQ0'

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

function syncFormFromUser() {
  const u = user.value
  if (!u) return
  form.date_of_birth = u.date_of_birth || ''
  form.blood_type = u.blood_type || ''
  form.phone = u.phone || ''
  form.address = u.address || ''
  form.national_id = u.national_id || ''
}

onMounted(async () => {
  await ensureUserLoaded()
  syncFormFromUser()
})

watch(user, () => {
  syncFormFromUser()
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
    uploadError.value = t('patientProfile.editPage.uploadError')
  }
  finally {
    uploadingAvatar.value = false
  }
}

async function saveProfile() {
  saveError.value = ''
  saveSuccess.value = false
  saving.value = true
  try {
    const body = {
      date_of_birth: form.date_of_birth || null,
      blood_type: form.blood_type || null,
      phone: form.phone?.trim() || null,
      address: form.address?.trim() || null,
      national_id: form.national_id?.trim() || null,
    }
    const res = await api('/api/user/profile', { method: 'PATCH', body })
    setSession(token.value, res.user)
    saveSuccess.value = true
  }
  catch {
    saveError.value = t('patientProfile.editPage.saveError')
  }
  finally {
    saving.value = false
  }
}

async function confirmDeleteAccount() {
  deleteError.value = ''
  deleting.value = true
  try {
    await api('/api/user', { method: 'DELETE' })
    clearSession()
    deleteModalOpen.value = false
    await navigateTo('/auth/login')
  }
  catch (e) {
    const code = e?.statusCode ?? e?.status ?? e?.response?.status
    if (code === 403) {
      deleteError.value = t('patientProfile.editPage.deleteForbidden')
    }
    else {
      deleteError.value = t('patientProfile.editPage.deleteError')
    }
  }
  finally {
    deleting.value = false
  }
}

useSeoMeta({
  title: () => t('patientProfile.editPage.seoTitle'),
})
</script>
