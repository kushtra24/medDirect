<template>
  <div>
    <NuxtRouteAnnouncer />
    <LanguageSelectGate />
    <NuxtPage />
  </div>
</template>

<script setup>
import { SUPPORTED_LOCALES } from './composables/useLocalePreference'

const { locale: storedLocale } = useLocalePreference()
const { locale: i18nLocale, setLocale } = useI18n()

/** Cookie → i18n (must stay in component setup, not a plugin). */
watch(
  () => storedLocale.value,
  async (code) => {
    if (code && SUPPORTED_LOCALES.includes(code)) {
      await setLocale(code)
    }
  },
  { immediate: true },
)

/** HTML dir/lang from active i18n locale (client only; useI18n is invalid in plugins). */
function applyDocumentLocale(code) {
  if (!import.meta.client) return
  const resolved = code && SUPPORTED_LOCALES.includes(code) ? code : 'en'
  const rtl = resolved === 'ar' || resolved === 'ku'
  document.documentElement.dir = rtl ? 'rtl' : 'ltr'
  document.documentElement.lang = resolved === 'ar' ? 'ar' : resolved === 'ku' ? 'ku' : 'en'
}

watch(
  () => i18nLocale.value,
  (code) => applyDocumentLocale(code),
  { immediate: true },
)
</script>
