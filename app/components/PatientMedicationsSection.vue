<template>
  <div class="bg-white dark:bg-slate-900 p-6 border border-outline-variant rounded-xl shadow-sm">
    <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
      <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100 flex items-center gap-2">
        <FontAwesomeIcon icon="briefcase-medical" class="text-tertiary text-xl shrink-0" aria-hidden="true" />
        {{ t('clinicalHistory.medications.title') }}
      </h2>
      <AppButton
        v-if="canEdit && !showAddForm"
        type="button"
        class="flex items-center gap-xs px-sm py-1.5 rounded-full text-xs font-semibold bg-tertiary text-on-tertiary hover:opacity-90"
        @click="openAddForm"
      >
        <FontAwesomeIcon icon="plus" aria-hidden="true" />
        {{ t('clinicalHistory.medications.add') }}
      </AppButton>
    </div>

    <form v-if="showAddForm" class="mb-4 p-4 rounded-lg border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-800/40 space-y-3" @submit.prevent="submitForm">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.medications.name') }}</label>
          <input v-model="form.name" type="text" required class="form-input" :placeholder="t('clinicalHistory.medications.namePlaceholder')">
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.medications.dosage') }}</label>
          <input v-model="form.dosage" type="text" class="form-input" :placeholder="t('clinicalHistory.medications.dosagePlaceholder')">
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.medications.frequency') }}</label>
          <input v-model="form.frequency" type="text" class="form-input" :placeholder="t('clinicalHistory.medications.frequencyPlaceholder')">
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.medications.route') }}</label>
          <input v-model="form.route" type="text" class="form-input" :placeholder="t('clinicalHistory.medications.routePlaceholder')">
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.medications.startDate') }}</label>
          <input v-model="form.start_date" type="date" class="form-input">
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.medications.prescriber') }}</label>
          <input v-model="form.prescriber" type="text" class="form-input">
        </div>
      </div>
      <div>
        <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.notes') }}</label>
        <textarea v-model="form.notes" rows="2" class="form-input" />
      </div>
      <p v-if="formError" class="text-sm text-error">{{ formError }}</p>
      <div class="flex justify-end gap-2">
        <AppButton type="button" class="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-xs font-semibold" @click="cancelForm">
          {{ t('clinicalHistory.cancel') }}
        </AppButton>
        <AppButton type="submit" class="px-3 py-1.5 rounded-md bg-tertiary text-on-tertiary text-xs font-semibold disabled:opacity-60" :disabled="saving">
          {{ saving ? t('clinicalHistory.saving') : t('clinicalHistory.add') }}
        </AppButton>
      </div>
    </form>

    <p v-if="!items.length && !showAddForm" class="text-on-surface-variant text-body-sm">
      {{ t('clinicalHistory.medications.empty') }}
    </p>

    <ul v-else class="divide-y divide-outline-variant dark:divide-slate-700">
      <li v-for="item in items" :key="item.id" class="py-3">
        <form v-if="editingId === item.id" class="p-4 rounded-lg border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-800/40 space-y-3" @submit.prevent="submitForm">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.medications.name') }}</label>
              <input v-model="form.name" type="text" required class="form-input">
            </div>
            <div>
              <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.medications.dosage') }}</label>
              <input v-model="form.dosage" type="text" class="form-input">
            </div>
            <div>
              <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.medications.frequency') }}</label>
              <input v-model="form.frequency" type="text" class="form-input">
            </div>
            <div>
              <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.medications.route') }}</label>
              <input v-model="form.route" type="text" class="form-input">
            </div>
            <div>
              <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.status') }}</label>
              <select v-model="form.status" class="form-input">
                <option value="active">{{ t('clinicalHistory.medications.statusActive') }}</option>
                <option value="discontinued">{{ t('clinicalHistory.medications.statusDiscontinued') }}</option>
              </select>
            </div>
            <div>
              <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.medications.startDate') }}</label>
              <input v-model="form.start_date" type="date" class="form-input">
            </div>
            <div>
              <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.medications.endDate') }}</label>
              <input v-model="form.end_date" type="date" class="form-input">
            </div>
            <div>
              <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.medications.prescriber') }}</label>
              <input v-model="form.prescriber" type="text" class="form-input">
            </div>
          </div>
          <div>
            <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.notes') }}</label>
            <textarea v-model="form.notes" rows="2" class="form-input" />
          </div>
          <p v-if="formError" class="text-sm text-error">{{ formError }}</p>
          <div class="flex justify-end gap-2">
            <AppButton type="button" class="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-xs font-semibold" @click="cancelForm">
              {{ t('clinicalHistory.cancel') }}
            </AppButton>
            <AppButton type="submit" class="px-3 py-1.5 rounded-md bg-tertiary text-on-tertiary text-xs font-semibold disabled:opacity-60" :disabled="saving">
              {{ saving ? t('clinicalHistory.saving') : t('clinicalHistory.saveChanges') }}
            </AppButton>
          </div>
        </form>
        <div v-else class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-body-md font-semibold text-blue-900 dark:text-blue-100">{{ item.name }}</span>
              <span v-if="item.dosage" class="text-body-sm text-on-surface-variant">{{ item.dosage }}</span>
              <span
                class="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                :class="item.status === 'discontinued' ? 'bg-surface-container dark:bg-slate-800 text-on-surface-variant' : 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300'"
              >
                {{ item.status === 'discontinued' ? t('clinicalHistory.medications.statusDiscontinued') : t('clinicalHistory.medications.statusActive') }}
              </span>
            </div>
            <p v-if="item.frequency || item.route" class="text-body-sm text-on-surface-variant mt-0.5">
              {{ [item.frequency, item.route].filter(Boolean).join(' · ') }}
            </p>
            <p v-if="item.prescriber" class="text-xs text-on-surface-variant mt-0.5">{{ t('clinicalHistory.medications.prescribedBy', { name: item.prescriber }) }}</p>
            <p v-if="item.notes" class="text-xs text-on-surface-variant mt-0.5 italic">{{ item.notes }}</p>
          </div>
          <div v-if="canEdit" class="flex items-center gap-xs shrink-0">
            <template v-if="deletingId === item.id">
              <span class="text-xs text-error">{{ t('clinicalHistory.confirmDelete') }}</span>
              <AppButton type="button" class="text-xs font-semibold text-error" @click="confirmDelete(item)">{{ t('clinicalHistory.yes') }}</AppButton>
              <AppButton type="button" class="text-xs font-semibold text-on-surface-variant" @click="deletingId = null">{{ t('clinicalHistory.no') }}</AppButton>
            </template>
            <template v-else>
              <button type="button" class="icon-btn" :aria-label="t('clinicalHistory.edit')" @click="startEdit(item)">
                <FontAwesomeIcon icon="pen-to-square" aria-hidden="true" />
              </button>
              <button type="button" class="icon-btn" :aria-label="t('clinicalHistory.delete')" @click="deletingId = item.id">
                <FontAwesomeIcon icon="trash" aria-hidden="true" />
              </button>
            </template>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  patientId: { type: [Number, String], required: true },
  organizationId: { type: [Number, String], required: true },
  records: { type: Array, default: () => [] },
  canEdit: { type: Boolean, default: false },
})

const { t } = useI18n()
const { api } = useMedDirectApi()

const items = ref([...props.records])
watch(() => props.records, (val) => { items.value = [...(val ?? [])] })

const showAddForm = ref(false)
const editingId = ref(null)
const deletingId = ref(null)
const saving = ref(false)
const formError = ref('')

const emptyForm = () => ({
  name: '', dosage: '', frequency: '', route: '', status: 'active',
  start_date: '', end_date: '', prescriber: '', notes: '',
})
const form = reactive(emptyForm())

function openAddForm() {
  Object.assign(form, emptyForm())
  editingId.value = null
  formError.value = ''
  showAddForm.value = true
}

function startEdit(item) {
  showAddForm.value = false
  deletingId.value = null
  formError.value = ''
  editingId.value = item.id
  Object.assign(form, {
    name: item.name || '',
    dosage: item.dosage || '',
    frequency: item.frequency || '',
    route: item.route || '',
    status: item.status || 'active',
    start_date: item.start_date || '',
    end_date: item.end_date || '',
    prescriber: item.prescriber || '',
    notes: item.notes || '',
  })
}

function cancelForm() {
  showAddForm.value = false
  editingId.value = null
  formError.value = ''
}

async function submitForm() {
  formError.value = ''
  saving.value = true
  const body = {
    name: form.name,
    dosage: form.dosage || null,
    frequency: form.frequency || null,
    route: form.route || null,
    status: form.status || 'active',
    start_date: form.start_date || null,
    end_date: form.end_date || null,
    prescriber: form.prescriber || null,
    notes: form.notes || null,
  }
  try {
    const base = `/api/organizations/${props.organizationId}/patients/${props.patientId}/medications`
    if (editingId.value) {
      const res = await api(`${base}/${editingId.value}`, { method: 'PATCH', body })
      const idx = items.value.findIndex((i) => i.id === editingId.value)
      if (idx !== -1) items.value[idx] = res.medication
    }
    else {
      const res = await api(base, { method: 'POST', body })
      items.value = [res.medication, ...items.value]
    }
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

async function confirmDelete(item) {
  try {
    await api(`/api/organizations/${props.organizationId}/patients/${props.patientId}/medications/${item.id}`, { method: 'DELETE' })
    items.value = items.value.filter((i) => i.id !== item.id)
  }
  catch {
    // Leave the row in place; user can retry.
  }
  finally {
    deletingId.value = null
  }
}
</script>

<style scoped>
.form-input {
  @apply w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-950 dark:text-slate-100 rounded-lg text-sm focus:border-tertiary focus:ring-1 focus:ring-tertiary py-2 px-3 outline-none;
}
.icon-btn {
  @apply flex items-center justify-center h-7 w-7 rounded-full text-on-surface-variant hover:bg-surface-container dark:hover:bg-slate-800 transition-colors;
}
</style>
