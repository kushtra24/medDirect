<template>
  <div class="bg-white dark:bg-slate-900 p-6 border border-outline-variant rounded-xl shadow-sm">
    <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
      <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100 flex items-center gap-2">
        <FontAwesomeIcon icon="clipboard-list" class="text-tertiary text-xl shrink-0" aria-hidden="true" />
        {{ t('clinicalHistory.orders.title') }}
      </h2>
      <AppButton
        v-if="canCreate && !showAddForm"
        type="button"
        class="flex items-center gap-xs px-sm py-1.5 rounded-full text-xs font-semibold bg-tertiary text-on-tertiary hover:opacity-90"
        @click="openAddForm"
      >
        <FontAwesomeIcon icon="plus" aria-hidden="true" />
        {{ t('clinicalHistory.orders.add') }}
      </AppButton>
    </div>

    <form v-if="showAddForm" class="mb-4 p-4 rounded-lg border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-800/40 space-y-3" @submit.prevent="submitForm">
      <fieldset>
        <legend class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-2">{{ t('clinicalHistory.orders.type') }}</legend>
        <div class="flex flex-wrap gap-4">
          <label class="flex items-center gap-2 cursor-pointer text-sm">
            <input v-model="form.type" type="radio" value="lab" name="order-type" class="text-tertiary focus:ring-tertiary">
            {{ t('clinicalHistory.orders.typeLab') }}
          </label>
          <label class="flex items-center gap-2 cursor-pointer text-sm">
            <input v-model="form.type" type="radio" value="examination" name="order-type" class="text-tertiary focus:ring-tertiary">
            {{ t('clinicalHistory.orders.typeExamination') }}
          </label>
        </div>
      </fieldset>
      <div>
        <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.orders.reason') }}</label>
        <textarea v-model="form.reason" rows="2" class="form-input" :placeholder="t('clinicalHistory.orders.reasonPlaceholder')" />
      </div>
      <div>
        <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">
          {{ form.type === 'examination' ? t('clinicalHistory.orders.assignDoctor') : t('clinicalHistory.orders.assignOptional') }}
        </label>
        <select v-model="form.assigned_to_user_id" class="form-input">
          <option :value="null">{{ t('clinicalHistory.orders.unassigned') }}</option>
          <option v-for="member in directory" :key="member.id" :value="member.id">
            {{ member.name }}{{ member.title ? ` — ${member.title}` : '' }}
          </option>
        </select>
      </div>
      <p v-if="formError" class="text-sm text-error">{{ formError }}</p>
      <div class="flex justify-end gap-2">
        <AppButton type="button" class="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-xs font-semibold" @click="cancelForm">
          {{ t('clinicalHistory.cancel') }}
        </AppButton>
        <AppButton type="submit" class="px-3 py-1.5 rounded-md bg-tertiary text-on-tertiary text-xs font-semibold disabled:opacity-60" :disabled="saving">
          {{ saving ? t('clinicalHistory.saving') : t('clinicalHistory.orders.create') }}
        </AppButton>
      </div>
    </form>

    <p v-if="!items.length && !showAddForm" class="text-on-surface-variant text-body-sm">
      {{ t('clinicalHistory.orders.empty') }}
    </p>

    <ul v-else class="divide-y divide-outline-variant dark:divide-slate-700">
      <li v-for="item in pagedItems" :key="item.id" class="py-3 flex items-start justify-between gap-3">
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <FontAwesomeIcon
              :icon="item.type === 'examination' ? 'stethoscope' : 'microscope'"
              class="text-[13px] text-on-primary-container shrink-0"
              aria-hidden="true"
            />
            <span class="font-body-md font-semibold text-blue-900 dark:text-blue-100">
              {{ item.type === 'examination' ? t('clinicalHistory.orders.typeExamination') : t('clinicalHistory.orders.typeLab') }}
            </span>
            <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="statusBadgeClass(item.status)">
              {{ t(`clinicalHistory.orders.status${capitalize(item.status)}`) }}
            </span>
          </div>
          <p v-if="item.reason" class="text-body-sm text-on-surface-variant mt-0.5">{{ item.reason }}</p>
          <p class="text-xs text-on-surface-variant mt-0.5">
            {{ item.assigned_to ? t('clinicalHistory.orders.assignedTo', { name: item.assigned_to.name }) : t('clinicalHistory.orders.unassigned') }}
            · {{ formatDateTime(item.created_at) }}
          </p>
        </div>
        <div v-if="canCreate && isOpen(item.status)" class="shrink-0">
          <template v-if="cancellingId === item.id">
            <span class="text-xs text-error me-1">{{ t('clinicalHistory.confirmDelete') }}</span>
            <AppButton type="button" class="text-xs font-semibold text-error" @click="confirmCancel(item)">{{ t('clinicalHistory.yes') }}</AppButton>
            <AppButton type="button" class="text-xs font-semibold text-on-surface-variant ms-1" @click="cancellingId = null">{{ t('clinicalHistory.no') }}</AppButton>
          </template>
          <AppButton
            v-else
            type="button"
            class="text-xs font-semibold text-error hover:underline"
            @click="cancellingId = item.id"
          >
            {{ t('clinicalHistory.orders.cancelOrder') }}
          </AppButton>
        </div>
      </li>
    </ul>

    <div v-if="totalPages > 1" class="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-outline-variant dark:border-slate-700">
      <p class="text-xs text-on-surface-variant">
        {{ t('clinicalHistory.orders.pageSummary', { from: rangeStart, to: rangeEnd, total: items.length }) }}
      </p>
      <div class="flex items-center gap-2">
        <AppButton
          type="button"
          class="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 disabled:pointer-events-none"
          :disabled="currentPage <= 1"
          @click="currentPage--"
        >
          {{ t('clinicalHistory.orders.previous') }}
        </AppButton>
        <span class="text-xs text-on-surface-variant tabular-nums">
          {{ t('clinicalHistory.orders.pageOf', { page: currentPage, pages: totalPages }) }}
        </span>
        <AppButton
          type="button"
          class="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 disabled:pointer-events-none"
          :disabled="currentPage >= totalPages"
          @click="currentPage++"
        >
          {{ t('clinicalHistory.orders.next') }}
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  patientId: { type: [Number, String], required: true },
  organizationId: { type: [Number, String], required: true },
  records: { type: Array, default: () => [] },
  canCreate: { type: Boolean, default: false },
})

const { t, locale } = useI18n()
const { api } = useMedDirectApi()

const PAGE_SIZE = 5

const items = ref([...props.records])
const currentPage = ref(1)

watch(() => props.records, (val) => {
  items.value = [...(val ?? [])]
  currentPage.value = 1
})

const totalPages = computed(() => Math.max(1, Math.ceil(items.value.length / PAGE_SIZE)))
const rangeStart = computed(() => items.value.length ? (currentPage.value - 1) * PAGE_SIZE + 1 : 0)
const rangeEnd = computed(() => Math.min(currentPage.value * PAGE_SIZE, items.value.length))
const pagedItems = computed(() => items.value.slice((currentPage.value - 1) * PAGE_SIZE, currentPage.value * PAGE_SIZE))

watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages
})

const directory = ref([])
async function loadDirectory() {
  try {
    const res = await api(`/api/organizations/${props.organizationId}/members/directory`)
    directory.value = res.members ?? []
  }
  catch {
    directory.value = []
  }
}

const showAddForm = ref(false)
const cancellingId = ref(null)
const saving = ref(false)
const formError = ref('')

const emptyForm = () => ({ type: 'lab', reason: '', assigned_to_user_id: null })
const form = reactive(emptyForm())

function openAddForm() {
  Object.assign(form, emptyForm())
  formError.value = ''
  showAddForm.value = true
  if (!directory.value.length) loadDirectory()
}

function cancelForm() {
  showAddForm.value = false
  formError.value = ''
}

function isOpen(status) {
  return status === 'pending' || status === 'in_progress'
}

function capitalize(s) {
  if (!s) return s
  return s.split('_').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')
}

function statusBadgeClass(status) {
  if (status === 'completed') return 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300'
  if (status === 'cancelled') return 'bg-surface-container dark:bg-slate-800 text-on-surface-variant'
  if (status === 'in_progress') return 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
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

async function submitForm() {
  formError.value = ''
  saving.value = true
  try {
    const res = await api(`/api/organizations/${props.organizationId}/patients/${props.patientId}/orders`, {
      method: 'POST',
      body: {
        type: form.type,
        reason: form.reason || null,
        assigned_to_user_id: form.assigned_to_user_id || null,
      },
    })
    items.value = [res.order, ...items.value]
    currentPage.value = 1
    cancelForm()
  }
  catch (e) {
    const first = e?.data?.errors && Object.values(e.data.errors).flat()[0]
    formError.value = first || e?.data?.message || t('clinicalHistory.saveError')
  }
  finally {
    saving.value = false
  }
}

async function confirmCancel(item) {
  try {
    const res = await api(`/api/organizations/${props.organizationId}/orders/${item.id}`, {
      method: 'PATCH',
      body: { status: 'cancelled' },
    })
    const idx = items.value.findIndex((i) => i.id === item.id)
    if (idx !== -1) items.value[idx] = res.order
  }
  catch {
    // Leave the row as-is; user can retry.
  }
  finally {
    cancellingId.value = null
  }
}
</script>

<style scoped>
.form-input {
  @apply w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2 px-3 outline-none;
}
</style>
