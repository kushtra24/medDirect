/**
 * JSON API client for the Laravel `med-direct-backend` (Sanctum bearer tokens).
 */
export const CONTROL_PANEL_ROLES = /** @type {const} */ (['admin', 'staff'])

export const DEV_PARTNER_TOKEN = '__dev_partner__'

export function isControlPanelRole(role) {
  return role != null && CONTROL_PANEL_ROLES.includes(role)
}

// Module-scope (not per-composable-call) so concurrent 401s from independent callers — e.g. the
// page's own data load racing a header component's notification fetch — only trigger one redirect.
let redirectingToLogin = false

export function useMedDirectApi() {
  const config = useRuntimeConfig()

  const cookieOpts = {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
    secure: !import.meta.dev,
  }

  const token = useCookie('md_token', cookieOpts)

  const userCookie = useCookie('md_user', cookieOpts)

  const user = useState('md_user', () => userCookie.value ?? null)

  const baseURL = computed(() => {
    const b = config.public.apiBase
    if (b != null && b !== '') {
      return String(b).replace(/\/$/, '')
    }
    // Relative "/api/*" calls only reach the Laravel backend via the Vite dev proxy, which
    // exists solely for the browser. SSR-side `$fetch` runs in-process and never touches that
    // proxy, so it needs an absolute origin instead — otherwise it 404s against Nuxt's own router.
    if (import.meta.server) {
      return String(config.apiBaseServer ?? '').replace(/\/$/, '')
    }
    return ''
  })

  function setSession(sessionToken, sessionUser) {
    token.value = sessionToken
    user.value = sessionUser
    userCookie.value = sessionUser
    // A fresh session earns back the right to trigger the redirect-to-login safety net below —
    // otherwise, once tripped, it would silently stay disarmed for the rest of this tab's life.
    redirectingToLogin = false
  }

  function clearSession() {
    token.value = null
    user.value = null
    userCookie.value = null
  }

  /**
   * A cached session (`user`/`token` cookies) can outlive the token it was built from — the
   * backend db can be reseeded, or the token can simply expire — and nothing re-checks it until
   * an authenticated call actually 401s. Without this, the UI keeps showing a "logged in" header
   * while every real request fails, `guest` middleware bounces the user away from `/auth/login`
   * (it trusts the same stale cache), and there is no way back in short of clearing cookies by
   * hand. Clearing the session here and sending them to login turns that dead end into a normal
   * "please sign in again".
   */
  async function handleUnauthorized(e) {
    const status = e?.status ?? e?.statusCode ?? e?.response?.status
    if (status !== 401 || !token.value) {
      return
    }
    clearSession()
    if (import.meta.client && !redirectingToLogin) {
      redirectingToLogin = true
      await navigateTo('/auth/login?expired=1')
    }
  }

  async function api(path, opts = {}) {
    const p = path.startsWith('/') ? path : `/${path}`
    const url = baseURL.value ? `${baseURL.value}${p}` : p
    const headers = {
      Accept: 'application/json',
      ...opts.headers,
    }
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`
    }
    try {
      return await $fetch(url, {
        ...opts,
        headers,
        credentials: 'omit',
      })
    }
    catch (e) {
      await handleUnauthorized(e)
      throw e
    }
  }

  /**
   * Multipart POST (e.g. avatar upload). Do not set Content-Type; browser sets boundary.
   */
  async function apiUpload(path, formData) {
    const p = path.startsWith('/') ? path : `/${path}`
    const url = baseURL.value ? `${baseURL.value}${p}` : p
    const headers = { Accept: 'application/json' }
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`
    }
    try {
      return await $fetch(url, {
        method: 'POST',
        headers,
        body: formData,
        credentials: 'omit',
      })
    }
    catch (e) {
      await handleUnauthorized(e)
      throw e
    }
  }

  /**
   * Resolves the current user from state, cookie, or `GET /api/user` (legacy token-only sessions).
   * @returns {Promise<object|null>}
   */
  async function ensureUserLoaded() {
    if (!token.value) {
      return null
    }
    if (import.meta.dev && token.value === DEV_PARTNER_TOKEN) {
      return user.value?.role ? user.value : null
    }
    if (user.value?.role) {
      return user.value
    }
    try {
      const res = await api('/api/user')
      setSession(token.value, res.user)
      return res.user
    }
    catch {
      clearSession()
      return null
    }
  }

  return {
    api,
    apiUpload,
    token,
    user,
    setSession,
    clearSession,
    baseURL,
    ensureUserLoaded,
  }
}
