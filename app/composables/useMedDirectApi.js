/**
 * JSON API client for the Laravel `med-direct-backend` (Sanctum bearer tokens).
 */
export const CONTROL_PANEL_ROLES = /** @type {const} */ (['admin', 'staff'])

export const DEV_PARTNER_TOKEN = '__dev_partner__'

export function isControlPanelRole(role) {
  return role != null && CONTROL_PANEL_ROLES.includes(role)
}

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
    if (b == null || b === '') {
      return ''
    }
    return String(b).replace(/\/$/, '')
  })

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
    return await $fetch(url, {
      ...opts,
      headers,
      credentials: 'omit',
    })
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
    return await $fetch(url, {
      method: 'POST',
      headers,
      body: formData,
      credentials: 'omit',
    })
  }

  function setSession(sessionToken, sessionUser) {
    token.value = sessionToken
    user.value = sessionUser
    userCookie.value = sessionUser
  }

  function clearSession() {
    token.value = null
    user.value = null
    userCookie.value = null
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
