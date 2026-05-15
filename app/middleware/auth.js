/**
 * Requires patient session (`md_token`). Sends guests to login.
 */
export default defineNuxtRouteMiddleware(() => {
  const { token } = useMedDirectApi()
  if (!token.value) {
    return navigateTo('/auth/login')
  }
})
