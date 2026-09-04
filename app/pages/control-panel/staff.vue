<template>
  <div class="bg-surface font-body-md text-on-surface min-h-dvh flex flex-col antialiased">
    <ControlPanelHeader />

    <main class="flex-1 px-6 md:px-12 py-8 max-w-4xl mx-auto w-full">
      <header class="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 class="font-h1 text-h1 text-blue-900 dark:text-blue-100 mb-2">
            {{ t('staffPage.title') }}
          </h1>
          <p class="text-on-surface-variant font-body-md">
            {{ t('staffPage.subtitle') }}
          </p>
        </div>
        <AppButton
          v-if="canAddStaff"
          type="button"
          class="px-5 py-2.5 bg-tertiary text-on-tertiary font-button rounded-lg shadow-sm active:scale-95 transition-all inline-flex items-center justify-center gap-2 shrink-0"
          @click="showAddForm = !showAddForm"
        >
          <FontAwesomeIcon icon="user-plus" aria-hidden="true" />
          {{ t('staffPage.addStaffCta') }}
        </AppButton>
      </header>

      <form
        v-if="showAddForm"
        class="bg-white dark:bg-slate-900 border border-outline-variant rounded-xl shadow-sm p-6 mb-6 space-y-4"
        @submit.prevent="addMember"
      >
        <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100">{{ t('staffPage.addForm.title') }}</h2>
        <p class="text-body-sm text-on-surface-variant">{{ t('staffPage.addForm.hint') }}</p>

        <p v-if="addError" class="rounded-lg border border-error/40 bg-error/10 px-4 py-3 text-sm text-error" role="alert">
          {{ addError }}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
              t('staffPage.addForm.name')
            }}</label>
            <input
              v-model="addForm.name"
              type="text"
              class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none"
              :placeholder="t('staffPage.addForm.namePlaceholder')"
            >
          </div>
          <div>
            <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
              t('staffPage.addForm.email')
            }}</label>
            <input
              v-model="addForm.email"
              type="email"
              required
              class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none"
              :placeholder="t('staffPage.addForm.emailPlaceholder')"
            >
          </div>
          <div>
            <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
              t('staffPage.addForm.password')
            }}</label>
            <input
              v-model="addForm.password"
              type="password"
              autocomplete="new-password"
              class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none"
              :placeholder="t('staffPage.addForm.passwordPlaceholder')"
            >
          </div>
          <div>
            <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{
              t('staffPage.addForm.jobTitle')
            }}</label>
            <input
              v-model="addForm.title"
              type="text"
              class="w-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2.5 px-3 outline-none"
              :placeholder="t('staffPage.titlePlaceholder')"
            >
          </div>
        </div>

        <label v-if="isPlatformAdmin" class="flex items-center gap-2 text-sm text-on-surface">
          <input
            v-model="addForm.is_owner"
            type="checkbox"
            class="rounded border-outline-variant text-tertiary focus:ring-tertiary"
          >
          {{ t('staffPage.addForm.makeOwner') }}
        </label>

        <div class="flex justify-end gap-3">
          <AppButton
            type="button"
            class="px-4 py-2 text-slate-500 dark:text-slate-400 font-button hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            @click="showAddForm = false"
          >
            {{ t('staffPage.addForm.cancel') }}
          </AppButton>
          <AppButton
            type="submit"
            class="px-5 py-2 bg-tertiary text-on-tertiary font-button rounded-lg shadow-sm active:scale-95 transition-all disabled:opacity-60"
            :disabled="adding"
          >
            {{ adding ? t('staffPage.addForm.adding') : t('staffPage.addForm.submit') }}
          </AppButton>
        </div>
      </form>

      <p v-if="loading" class="text-on-surface-variant font-body-md">{{ t('staffPage.loading') }}</p>
      <p v-else-if="loadError" class="text-error text-body-sm" role="alert">{{ loadError }}</p>

      <div v-else class="bg-white dark:bg-slate-900 border border-outline-variant rounded-xl shadow-sm divide-y divide-outline-variant">
        <div v-if="!members.length" class="p-6 text-body-sm text-on-surface-variant text-center">
          {{ t('staffPage.empty') }}
        </div>
        <div v-for="member in members" :key="member.user.id" class="p-6">
          <div class="flex flex-col sm:flex-row sm:items-center gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <p class="font-body-md font-semibold text-blue-900 dark:text-blue-100">{{ member.user.name }}</p>
                <span
                  v-if="member.is_owner"
                  class="text-[11px] font-bold uppercase tracking-wide bg-tertiary/10 text-tertiary px-2 py-0.5 rounded-full"
                >
                  {{ t('staffPage.ownerBadge') }}
                </span>
              </div>
              <p class="text-body-sm text-on-surface-variant truncate">{{ member.user.email }}</p>
            </div>
            <div class="flex items-center gap-2 sm:w-64 shrink-0">
              <input
                v-model="member.title"
                type="text"
                :disabled="member.is_owner"
                class="w-full border border-outline-variant dark:border-slate-600 focus:border-tertiary focus:ring-1 focus:ring-tertiary rounded-lg font-body-md p-2 bg-white dark:bg-slate-950 dark:text-slate-100 outline-none text-sm disabled:opacity-50"
                :placeholder="t('staffPage.titlePlaceholder')"
                @keydown.enter="saveMember(member)"
              >
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <AppButton
                type="button"
                class="p-2 text-tertiary hover:bg-tertiary/10 rounded-lg transition-colors disabled:opacity-50"
                :disabled="member.saving || member.is_owner"
                :aria-label="t('staffPage.saveAria')"
                @click="saveMember(member)"
              >
                <FontAwesomeIcon :icon="member.saving ? 'arrows-rotate' : 'save'" :class="{ 'animate-spin': member.saving }" aria-hidden="true" />
              </AppButton>
              <AppButton
                type="button"
                class="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                :aria-label="t('staffPage.detailsAria')"
                :aria-expanded="member.expanded"
                @click="member.expanded = !member.expanded"
              >
                <FontAwesomeIcon :icon="member.expanded ? 'chevron-down' : 'id-badge'" aria-hidden="true" />
              </AppButton>
              <AppButton
                v-if="!member.is_owner"
                type="button"
                class="p-2 text-outline hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                :disabled="member.removing"
                :aria-label="t('staffPage.removeAria')"
                @click="removeMember(member)"
              >
                <FontAwesomeIcon icon="trash" aria-hidden="true" />
              </AppButton>
            </div>
          </div>

          <p v-if="member.error" class="text-error text-xs mt-2" role="alert">{{ member.error }}</p>

          <div v-if="member.expanded" class="mt-4 pt-4 border-t border-outline-variant dark:border-slate-800">
            <p class="font-label-caps text-label-caps text-on-surface-variant mb-3">{{ t('staffPage.abilitiesTitle') }}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label
                v-for="ability in abilityKeys"
                :key="ability"
                class="flex items-center gap-2 text-sm text-on-surface"
                :class="{ 'opacity-50': member.is_owner }"
              >
                <input
                  v-model="member.abilities[ability]"
                  type="checkbox"
                  :disabled="member.is_owner"
                  class="rounded border-outline-variant text-tertiary focus:ring-tertiary"
                >
                {{ t(`staffPage.abilities.${ability}`) }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'staff',
})

const { t } = useI18n()
const { api, ensureUserLoaded, user } = useMedDirectApi()
const { requireOrganization, activeOrganization } = useActiveOrganization()

useSeoMeta({
  title: () => t('staffPage.seoTitle'),
})

const isPlatformAdmin = computed(() => user.value?.role === 'admin')
const canAddStaff = computed(() => isPlatformAdmin.value || !!activeOrganization.value?.is_owner)

const abilityKeys = [
  'canCreatePatient',
  'canEditPatient',
  'canViewPatients',
  'canEditLabResults',
  'canCreateAddResults',
  'canCreateDoctorsNote',
  'canManageStaff',
  'canEditOrganizationProfile',
]

const members = ref([])
const loading = ref(false)
const loadError = ref('')

function decorateMember(m) {
  return {
    ...m,
    title: m.title || '',
    abilities: { ...m.abilities },
    expanded: false,
    saving: false,
    removing: false,
    error: '',
  }
}

async function loadMembers() {
  loadError.value = ''
  loading.value = true
  try {
    const org = await requireOrganization()
    const res = await api(`/api/organizations/${org.id}/members`)
    members.value = (res.members || []).map(decorateMember)
  }
  catch (e) {
    const status = e?.status ?? e?.statusCode
    loadError.value = status === 403
      ? t('staffPage.errorForbidden')
      : e?.data?.message || e?.message || t('staffPage.errorLoadFailed')
  }
  finally {
    loading.value = false
  }
}

async function saveMember(member) {
  member.error = ''
  member.saving = true
  try {
    const org = await requireOrganization()
    await api(`/api/organizations/${org.id}/members/${member.user.id}/abilities`, {
      method: 'PATCH',
      body: { title: member.title.trim() || null, abilities: member.abilities },
    })
  }
  catch (e) {
    const first = e?.data?.errors && Object.values(e.data.errors).flat()[0]
    member.error = first || e?.data?.message || e?.message || t('staffPage.errorSaveFailed')
  }
  finally {
    member.saving = false
  }
}

async function removeMember(member) {
  if (!window.confirm(t('staffPage.confirmRemove', { name: member.user.name }))) return
  member.error = ''
  member.removing = true
  try {
    const org = await requireOrganization()
    await api(`/api/organizations/${org.id}/members/${member.user.id}`, { method: 'DELETE' })
    members.value = members.value.filter((m) => m.user.id !== member.user.id)
  }
  catch (e) {
    member.error = e?.data?.message || e?.message || t('staffPage.errorRemoveFailed')
  }
  finally {
    member.removing = false
  }
}

const showAddForm = ref(false)
const adding = ref(false)
const addError = ref('')
const addForm = reactive({ name: '', email: '', password: '', title: '', is_owner: false })

async function addMember() {
  addError.value = ''
  adding.value = true
  try {
    const org = await requireOrganization()
    const res = await api(`/api/organizations/${org.id}/members`, {
      method: 'POST',
      body: {
        name: addForm.name.trim() || null,
        email: addForm.email.trim(),
        password: addForm.password || null,
        title: addForm.title.trim() || null,
        is_owner: addForm.is_owner,
      },
    })
    members.value.push(decorateMember(res))
    addForm.name = ''
    addForm.email = ''
    addForm.password = ''
    addForm.title = ''
    addForm.is_owner = false
    showAddForm.value = false
  }
  catch (e) {
    const first = e?.data?.errors && Object.values(e.data.errors).flat()[0]
    addError.value = first || e?.data?.message || e?.message || t('staffPage.addForm.errorFailed')
  }
  finally {
    adding.value = false
  }
}

onMounted(async () => {
  await ensureUserLoaded()
  await loadMembers()
})
</script>
