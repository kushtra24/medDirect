import { DEV_PARTNER_TOKEN, isControlPanelRole } from '~/composables/useMedDirectApi'

/**
 * Blocks guest-only routes (e.g. login) when a session cookie exists.
 */
export default defineNuxtRouteMiddleware(async () => {
  const { token, user, ensureUserLoaded } = useMedDirectApi()

  if (!token.value) {
    return
  }

  if (import.meta.dev && token.value === DEV_PARTNER_TOKEN) {
    return navigateTo('/control-panel')
  }

  let u = user.value?.role ? user.value : null
  if (!u) {
    u = await ensureUserLoaded()
  }
  if (!u) {
    return
  }

  const dest = isControlPanelRole(u.role) ? '/control-panel' : '/profile'
  return navigateTo(dest)
})
