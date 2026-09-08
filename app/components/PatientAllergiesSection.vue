<template>
  <div class="bg-white dark:bg-slate-900 p-6 border border-outline-variant rounded-xl shadow-sm">
    <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
      <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100 flex items-center gap-2">
        <FontAwesomeIcon icon="triangle-exclamation" class="text-tertiary text-xl shrink-0" aria-hidden="true" />
        {{ t('clinicalHistory.allergies.title') }}
      </h2>
      <AppButton
        v-if="canEdit && !showAddForm"
        type="button"
        class="flex items-center gap-xs px-sm py-1.5 rounded-full text-xs font-semibold bg-tertiary text-on-tertiary hover:opacity-90"
        @click="openAddForm"
      >
        <FontAwesomeIcon icon="plus" aria-hidden="true" />
        {{ t('clinicalHistory.allergies.add') }}
      </AppButton>
    </div>

    <form
      v-if="showAddForm"
      class="mb-4 p-4 rounded-lg border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-800/40 space-y-3"
      @submit.prevent="submitForm"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.allergies.substance') }}</label>
          <input v-model="form.substance" type="text" required class="form-input" :placeholder="t('clinicalHistory.allergies.substancePlaceholder')">
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.allergies.reaction') }}</label>
          <input v-model="form.reaction" type="text" class="form-input" :placeholder="t('clinicalHistory.allergies.reactionPlaceholder')">
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.allergies.severity') }}</label>
          <select v-model="form.severity" class="form-input">
            <option value="">{{ t('clinicalHistory.selectOption') }}</option>
            <option value="mild">{{ t('clinicalHistory.allergies.severityMild') }}</option>
            <option value="moderate">{{ t('clinicalHistory.allergies.severityModerate') }}</option>
            <option value="severe">{{ t('clinicalHistory.allergies.severitySevere') }}</option>
          </select>
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.allergies.notedAt') }}</label>
          <input v-model="form.noted_at" type="date" class="form-input">
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
          {{ saving ? t('clinicalHistory.saving') : (editingId ? t('clinicalHistory.saveChanges') : t('clinicalHistory.add')) }}
        </AppButton>
      </div>
    </form>

    <p v-if="!items.length && !showAddForm" class="text-on-surface-variant text-body-sm">
      {{ t('clinicalHistory.allergies.empty') }}
    </p>

    <ul v-else class="divide-y divide-outline-variant dark:divide-slate-700">
      <li v-for="item in items" :key="item.id" class="py-3">
        <template v-if="editingId === item.id">
          <form class="p-4 rounded-lg border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-800/40 space-y-3" @submit.prevent="submitForm">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.allergies.substance') }}</label>
                <input v-model="form.substance" type="text" required class="form-input">
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.allergies.reaction') }}</label>
                <input v-model="form.reaction" type="text" class="form-input">
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.allergies.severity') }}</label>
                <select v-model="form.severity" class="form-input">
                  <option value="">{{ t('clinicalHistory.selectOption') }}</option>
                  <option value="mild">{{ t('clinicalHistory.allergies.severityMild') }}</option>
                  <option value="moderate">{{ t('clinicalHistory.allergies.severityModerate') }}</option>
                  <option value="severe">{{ t('clinicalHistory.allergies.severitySevere') }}</option>
                </select>
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.allergies.notedAt') }}</label>
                <input v-model="form.noted_at" type="date" class="form-input">
              </div>
              <div>
                <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.status') }}</label>
                <select v-model="form.status" class="form-input">
                  <option value="active">{{ t('clinicalHistory.allergies.statusActive') }}</option>
                  <option value="inactive">{{ t('clinicalHistory.allergies.statusInactive') }}</option>
                </select>
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
        </template>
        <div v-else class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-body-md font-semibold text-blue-900 dark:text-blue-100">{{ item.substance }}</span>
              <span v-if="item.severity" class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="severityBadgeClass(item.severity)">
                {{ t(`clinicalHistory.allergies.severity${capitalize(item.severity)}`) }}
              </span>
              <span
                class="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                :class="item.status === 'inactive' ? 'bg-surface-container dark:bg-slate-800 text-on-surface-variant' : 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300'"
              >
                {{ item.status === 'inactive' ? t('clinicalHistory.allergies.statusInactive') : t('clinicalHistory.allergies.statusActive') }}
              </span>
            </div>
            <p v-if="item.reaction" class="text-body-sm text-on-surface-variant mt-0.5">{{ item.reaction }}</p>
            <p v-if="item.notes" class="text-xs text-on-surface-variant mt-0.5 italic">{{ item.notes }}</p>
            <p v-if="item.noted_at" class="text-xs text-on-surface-variant mt-0.5">{{ formatDate(item.noted_at) }}</p>
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

const { t, locale } = useI18n()
const { api } = useMedDirectApi()

const items = ref([...props.records])
watch(() => props.records, (val) => { items.value = [...(val ?? [])] })

const showAddForm = ref(false)
const editingId = ref(null)
const deletingId = ref(null)
const saving = ref(false)
const formError = ref('')

const emptyForm = () => ({ substance: '', reaction: '', severity: '', status: 'active', noted_at: '', notes: '' })
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
    substance: item.substance || '',
    reaction: item.reaction || '',
    severity: item.severity || '',
    status: item.status || 'active',
    noted_at: item.noted_at || '',
    notes: item.notes || '',
  })
}

function cancelForm() {
  showAddForm.value = false
  editingId.value = null
  formError.value = ''
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s
}

function severityBadgeClass(severity) {
  if (severity === 'severe') return 'bg-red-50 dark:bg-red-950/40 text-error'
  if (severity === 'moderate') return 'bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300'
  return 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
}

function formatDate(iso) {
  try {
    const loc = locale.value === 'ar' ? 'ar' : locale.value === 'ku' ? 'ku' : 'en'
    return new Intl.DateTimeFormat(loc, { dateStyle: 'medium' }).format(new Date(`${iso}T12:00:00`))
  }
  catch {
    return iso
  }
}

async function submitForm() {
  formError.value = ''
  saving.value = true
  const body = {
    substance: form.substance,
    reaction: form.reaction || null,
    severity: form.severity || null,
    status: form.status || 'active',
    noted_at: form.noted_at || null,
    notes: form.notes || null,
  }
  try {
    const base = `/api/organizations/${props.organizationId}/patients/${props.patientId}/allergies`
    if (editingId.value) {
      const res = await api(`${base}/${editingId.value}`, { method: 'PATCH', body })
      const idx = items.value.findIndex((i) => i.id === editingId.value)
      if (idx !== -1) items.value[idx] = res.allergy
    }
    else {
      const res = await api(base, { method: 'POST', body })
      items.value = [res.allergy, ...items.value]
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
    await api(`/api/organizations/${props.organizationId}/patients/${props.patientId}/allergies/${item.id}`, { method: 'DELETE' })
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
