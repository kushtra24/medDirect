<template>
  <div class="bg-surface font-body-md text-on-surface min-h-dvh flex flex-col antialiased">
    <ControlPanelHeader />

    <main class="flex-1 px-6 md:px-12 py-8 max-w-6xl mx-auto w-full">
      <div class="mb-6">
        <h1 class="font-h1 text-h1 text-blue-900 dark:text-blue-100">
          {{ t('ordersPage.title') }}
        </h1>
        <p class="text-on-surface-variant font-body-md mt-1">
          {{ t('ordersPage.subtitle') }}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2 mb-6">
        <button
          v-for="tab in scopeTabs"
          :key="tab.value"
          type="button"
          class="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          :class="scope === tab.value
            ? 'bg-blue-900 dark:bg-blue-700 text-white'
            : 'bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-700 text-on-surface-variant hover:bg-surface-container dark:hover:bg-slate-800'"
          @click="scope = tab.value"
        >
          {{ tab.label }}
        </button>
        <div class="ms-auto">
          <select v-model="status" class="form-input w-auto">
            <option value="open">{{ t('ordersPage.statusOpen') }}</option>
            <option value="completed">{{ t('ordersPage.statusCompleted') }}</option>
            <option value="cancelled">{{ t('ordersPage.statusCancelled') }}</option>
            <option value="all">{{ t('ordersPage.statusAll') }}</option>
          </select>
        </div>
      </div>

      <p v-if="loading" class="text-on-surface-variant font-body-md">
        {{ t('ordersPage.loading') }}
      </p>
      <p v-else-if="loadError" class="text-error text-body-sm" role="alert">
        {{ loadError }}
      </p>
      <p v-else-if="!orders.length" class="text-on-surface-variant text-body-sm bg-white dark:bg-slate-900 border border-outline-variant rounded-xl p-lg">
        {{ t('ordersPage.empty') }}
      </p>

      <ul v-else class="flex flex-col gap-3">
        <li
          v-for="order in orders"
          :key="order.id"
          class="bg-white dark:bg-slate-900 border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <FontAwesomeIcon
                :icon="order.type === 'examination' ? 'stethoscope' : 'microscope'"
                class="text-tertiary shrink-0"
                aria-hidden="true"
              />
              <AppButton
                :to="{ path: '/control-panel/patient-record', query: { patient_id: String(order.patient_id) } }"
                class="font-body-md font-semibold text-secondary hover:underline"
              >
                {{ order.patient_name }}
              </AppButton>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="statusBadgeClass(order.status)">
                {{ t(`clinicalHistory.orders.status${capitalize(order.status)}`) }}
              </span>
            </div>
            <p v-if="order.reason" class="text-body-sm text-on-surface-variant mt-1">{{ order.reason }}</p>
            <p class="text-xs text-on-surface-variant mt-1">
              {{ order.assigned_to ? t('clinicalHistory.orders.assignedTo', { name: order.assigned_to.name }) : t('clinicalHistory.orders.unassigned') }}
              · {{ formatDateTime(order.created_at) }}
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <AppButton
              v-if="!order.assigned_to && isOpen(order.status)"
              type="button"
              class="px-3 py-1.5 rounded-md border border-outline-variant dark:border-slate-700 text-xs font-semibold hover:bg-surface-container dark:hover:bg-slate-800"
              :disabled="actingId === order.id"
              @click="claim(order)"
            >
              {{ t('ordersPage.claim') }}
            </AppButton>
            <AppButton
              v-if="isOpen(order.status)"
              :to="resultEntryPath(order)"
              class="px-3 py-1.5 rounded-md bg-tertiary text-on-tertiary text-xs font-semibold hover:opacity-90"
            >
              {{ t('ordersPage.enterResults') }}
            </AppButton>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'staff',
})

const { t, locale } = useI18n()
const { api, ensureUserLoaded, user } = useMedDirectApi()
const { requireOrganization } = useActiveOrganization()

useSeoMeta({
  title: () => t('ordersPage.seoTitle'),
})

const scope = ref('all')
const status = ref('open')
const orders = ref([])
const loading = ref(false)
const loadError = ref('')
const actingId = ref(null)

const scopeTabs = computed(() => [
  { value: 'mine', label: t('ordersPage.scopeMine') },
  { value: 'unassigned', label: t('ordersPage.scopeUnassigned') },
  { value: 'all', label: t('ordersPage.scopeAll') },
])

function isOpen(s) {
  return s === 'pending' || s === 'in_progress'
}

function capitalize(s) {
  if (!s) return s
  return s.split('_').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')
}

function statusBadgeClass(s) {
  if (s === 'completed') return 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300'
  if (s === 'cancelled') return 'bg-surface-container dark:bg-slate-800 text-on-surface-variant'
  if (s === 'in_progress') return 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
  return 'bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300'
}

function formatDateTime(iso) {
  if (!iso) return ''
  try {
    const loc = locale.value === 'ar' ? 'ar' : locale.value === 'ku' ? 'ku' : 'en'
    return new Intl.DateTimeFormat(loc, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
  }
  catch {
    return iso
  }
}

function resultEntryPath(order) {
  const path = order.type === 'examination' ? '/control-panel/examination-results' : '/control-panel/lab-results'
  return { path, query: { patient_id: String(order.patient_id), order_id: String(order.id) } }
}

async function loadOrders() {
  loading.value = true
  loadError.value = ''
  try {
    const org = await requireOrganization()
    const res = await api(`/api/organizations/${org.id}/orders?scope=${scope.value}&status=${status.value}`)
    orders.value = res.orders ?? []
  }
  catch (e) {
    orders.value = []
    loadError.value = e?.data?.message || e?.message || t('ordersPage.errorLoadFailed')
  }
  finally {
    loading.value = false
  }
}

async function claim(order) {
  actingId.value = order.id
  try {
    const org = await requireOrganization()
    await api(`/api/organizations/${org.id}/orders/${order.id}`, {
      method: 'PATCH',
      body: { assigned_to_user_id: user.value?.id },
    })
    await loadOrders()
  }
  catch {
    // Leave as-is; user can retry.
  }
  finally {
    actingId.value = null
  }
}

watch([scope, status], () => {
  loadOrders()
})

onMounted(async () => {
  await ensureUserLoaded()
  await loadOrders()
})
</script>

<style scoped>
.form-input {
  @apply border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2 px-3 outline-none;
}
</style>
