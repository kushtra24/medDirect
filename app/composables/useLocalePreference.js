export const LOCALE_COOKIE = 'clinicdirect-locale'

/** @type {readonly ['ar', 'en', 'ku']} */
export const SUPPORTED_LOCALES = ['ar', 'en', 'ku']

export function useLocalePreference() {
  const locale = useCookie(LOCALE_COOKIE, {
    default: () => '',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
    secure: import.meta.env.PROD,
  })

  const hasChosenLocale = computed(() => {
    const v = locale.value
    return Boolean(v && SUPPORTED_LOCALES.includes(v))
  })

  /**
   * @param {'ar' | 'en' | 'ku'} code
   */
  function persistLocale(code) {
    locale.value = code
  }

  return { locale, hasChosenLocale, persistLocale }
}
