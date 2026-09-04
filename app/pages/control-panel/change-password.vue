<template>
  <div class="bg-surface font-body-md text-on-surface min-h-dvh flex flex-col antialiased">
    <ControlPanelHeader />

    <main class="flex-1 px-6 md:px-12 py-8 max-w-md mx-auto w-full">
      <header class="mb-8">
        <h1 class="font-h1 text-h1 text-blue-900 dark:text-blue-100 mb-2">
          {{ t('changePasswordPage.title') }}
        </h1>
        <p class="text-on-surface-variant font-body-md">
          {{ mustChangePassword ? t('changePasswordPage.requiredSubtitle') : t('changePasswordPage.subtitle') }}
        </p>
      </header>

      <form
        class="bg-white dark:bg-slate-900 border border-outline-variant rounded-xl shadow-sm p-6 space-y-4"
        @submit.prevent="onSubmit"
      >
        <p v-if="error" class="rounded-lg border border-error/40 bg-error/10 px-4 py-3 text-sm text-error" role="alert">
          {{ error }}
        </p>
        <p v-if="success" class="rounded-lg border border-tertiary/30 bg-tertiary/10 px-4 py-3 text-sm text-teal-900 dark:text-teal-100" role="status">
          {{ t('changePasswordPage.success') }}
        </p>

        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
            t('changePasswordPage.currentPassword')
          }}</label>
          <input
            v-model="form.current_password"
            type="password"
            autocomplete="current-password"
            required
            class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none"
          >
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
            t('changePasswordPage.newPassword')
          }}</label>
          <input
            v-model="form.password"
            type="password"
            autocomplete="new-password"
            required
            minlength="8"
            class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none"
          >
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
            t('changePasswordPage.confirmPassword')
          }}</label>
          <input
            v-model="form.password_confirmation"
            type="password"
            autocomplete="new-password"
            required
            minlength="8"
            class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none"
          >
        </div>

        <AppButton
          type="submit"
          class="w-full px-5 py-2.5 bg-tertiary text-on-tertiary font-button rounded-lg shadow-sm active:scale-95 transition-all disabled:opacity-60"
          :disabled="submitting"
        >
          {{ submitting ? t('changePasswordPage.saving') : t('changePasswordPage.submit') }}
        </AppButton>
      </form>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'staff',
})

const { t } = useI18n()
const { api, token, user, setSession } = useMedDirectApi()

useSeoMeta({
  title: () => t('changePasswordPage.seoTitle'),
})

const mustChangePassword = computed(() => !!user.value?.must_change_password)

const form = reactive({ current_password: '', password: '', password_confirmation: '' })
const submitting = ref(false)
const error = ref('')
const success = ref(false)

async function onSubmit() {
  error.value = ''
  success.value = false

  if (form.password !== form.password_confirmation) {
    error.value = t('changePasswordPage.errorMismatch')
    return
  }

  submitting.value = true
  try {
    await api('/api/user/password', {
      method: 'PATCH',
      body: {
        current_password: form.current_password,
        password: form.password,
        password_confirmation: form.password_confirmation,
      },
    })
    setSession(token.value, { ...user.value, must_change_password: false })
    success.value = true
    await navigateTo('/control-panel')
  }
  catch (e) {
    const first = e?.data?.errors && Object.values(e.data.errors).flat()[0]
    error.value = first || e?.data?.message || e?.message || t('changePasswordPage.errorFailed')
  }
  finally {
    submitting.value = false
  }
}
</script>
