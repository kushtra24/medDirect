/**
 * Active clinic/lab for control-panel API calls (staff/admin).
 */
export function useActiveOrganization() {
  const { user, ensureUserLoaded } = useMedDirectApi()

  const cookieOpts = {
    maxAge: 60 * 60 * 24 * 90,
    sameSite: 'lax',
    secure: !import.meta.dev,
  }

  const activeOrganizationId = useCookie('md_active_org_id', cookieOpts)

  const organizations = computed(() => user.value?.organizations ?? [])

  const activeOrganization = computed(() => {
    const orgs = organizations.value
    if (!orgs.length) {
      return null
    }
    const selectedId = activeOrganizationId.value != null
      ? Number(activeOrganizationId.value)
      : null
    if (selectedId) {
      const match = orgs.find((o) => o.id === selectedId)
      if (match) {
        return match
      }
    }
    return orgs[0]
  })

  watch(activeOrganization, (org) => {
    if (org && String(activeOrganizationId.value) !== String(org.id)) {
      activeOrganizationId.value = String(org.id)
    }
  }, { immediate: true })

  async function requireOrganization() {
    await ensureUserLoaded()
    if (!activeOrganization.value) {
      throw new Error('NO_ORGANIZATION')
    }
    return activeOrganization.value
  }

  return {
    organizations,
    activeOrganization,
    activeOrganizationId,
    requireOrganization,
  }
}
