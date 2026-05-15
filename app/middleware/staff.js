import { DEV_PARTNER_TOKEN, isControlPanelRole } from '~/composables/useMedDirectApi'

/**
 * Control panel: requires Sanctum session and role `admin` or `staff`.
 */
export default defineNuxtRouteMiddleware(async () => {
  const { token, user, ensureUserLoaded } = useMedDirectApi()

  if (!token.value) {
    return navigateTo('/auth/login')
  }

  if (import.meta.dev && token.value === DEV_PARTNER_TOKEN) {
    if (isControlPanelRole(user.value?.role)) {
      return
    }
    return navigateTo('/profile')
  }

  const u = await ensureUserLoaded()
  if (!u) {
    return navigateTo('/auth/login')
  }
  if (!isControlPanelRole(u.role)) {
    return navigateTo('/profile')
  }
})
