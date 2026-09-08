<template>
  <div class="bg-white dark:bg-slate-900 p-6 border border-outline-variant rounded-xl shadow-sm">
    <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
      <h2 class="font-h3 text-h3 text-blue-900 dark:text-blue-100 flex items-center gap-2">
        <FontAwesomeIcon icon="heart-pulse" class="text-tertiary text-xl shrink-0" aria-hidden="true" />
        {{ t('clinicalHistory.vitals.title') }}
      </h2>
      <AppButton
        v-if="canEdit && !showAddForm"
        type="button"
        class="flex items-center gap-xs px-sm py-1.5 rounded-full text-xs font-semibold bg-tertiary text-on-tertiary hover:opacity-90"
        @click="openAddForm"
      >
        <FontAwesomeIcon icon="plus" aria-hidden="true" />
        {{ t('clinicalHistory.vitals.add') }}
      </AppButton>
    </div>

    <form v-if="showAddForm || editingId" class="mb-4 p-4 rounded-lg border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-800/40 space-y-3" @submit.prevent="submitForm">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="col-span-2 sm:col-span-1">
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.vitals.recordedAt') }}</label>
          <input v-model="form.recorded_at" type="datetime-local" class="form-input">
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.vitals.heightCm') }}</label>
          <input v-model.number="form.height_cm" type="number" step="0.1" class="form-input">
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.vitals.weightKg') }}</label>
          <input v-model.number="form.weight_kg" type="number" step="0.1" class="form-input">
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.vitals.bloodPressure') }}</label>
          <div class="flex items-center gap-1">
            <input v-model.number="form.blood_pressure_systolic" type="number" class="form-input" placeholder="120">
            <span class="text-slate-400">/</span>
            <input v-model.number="form.blood_pressure_diastolic" type="number" class="form-input" placeholder="80">
          </div>
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.vitals.heartRate') }}</label>
          <input v-model.number="form.heart_rate" type="number" class="form-input">
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.vitals.temperatureC') }}</label>
          <input v-model.number="form.temperature_c" type="number" step="0.1" class="form-input">
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.vitals.respiratoryRate') }}</label>
          <input v-model.number="form.respiratory_rate" type="number" class="form-input">
        </div>
        <div>
          <label class="block font-label-caps text-label-caps text-slate-500 dark:text-slate-400 mb-1">{{ t('clinicalHistory.vitals.oxygenSaturation') }}</label>
          <input v-model.number="form.oxygen_saturation" type="number" min="0" max="100" class="form-input">
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
      {{ t('clinicalHistory.vitals.empty') }}
    </p>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[720px]">
        <thead>
          <tr class="bg-surface-container-low dark:bg-slate-800">
            <th class="px-3 py-2 font-label-caps text-[10px] text-on-primary-container">{{ t('clinicalHistory.vitals.recordedAt') }}</th>
            <th class="px-3 py-2 font-label-caps text-[10px] text-on-primary-container">{{ t('clinicalHistory.vitals.heightCm') }}</th>
            <th class="px-3 py-2 font-label-caps text-[10px] text-on-primary-container">{{ t('clinicalHistory.vitals.weightKg') }}</th>
            <th class="px-3 py-2 font-label-caps text-[10px] text-on-primary-container">{{ t('clinicalHistory.vitals.bmi') }}</th>
            <th class="px-3 py-2 font-label-caps text-[10px] text-on-primary-container">{{ t('clinicalHistory.vitals.bloodPressureShort') }}</th>
            <th class="px-3 py-2 font-label-caps text-[10px] text-on-primary-container">{{ t('clinicalHistory.vitals.heartRateShort') }}</th>
            <th class="px-3 py-2 font-label-caps text-[10px] text-on-primary-container">{{ t('clinicalHistory.vitals.temperatureShort') }}</th>
            <th class="px-3 py-2 font-label-caps text-[10px] text-on-primary-container">{{ t('clinicalHistory.vitals.oxygenShort') }}</th>
            <th v-if="canEdit" class="px-3 py-2 font-label-caps text-[10px] text-on-primary-container text-end">{{ t('clinicalHistory.actions') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-outline-variant dark:divide-slate-700">
          <tr v-for="item in items" :key="item.id" class="hover:bg-surface dark:hover:bg-slate-800/40">
            <td class="px-3 py-2 text-xs text-on-surface whitespace-nowrap">{{ formatDateTime(item.recorded_at) }}</td>
            <td class="px-3 py-2 text-xs">{{ item.height_cm ?? notAvailable }}</td>
            <td class="px-3 py-2 text-xs">{{ item.weight_kg ?? notAvailable }}</td>
            <td class="px-3 py-2 text-xs font-semibold">{{ item.bmi ?? notAvailable }}</td>
            <td class="px-3 py-2 text-xs">
              <span v-if="item.blood_pressure_systolic || item.blood_pressure_diastolic">
                {{ item.blood_pressure_systolic ?? '—' }}/{{ item.blood_pressure_diastolic ?? '—' }}
              </span>
              <span v-else>{{ notAvailable }}</span>
            </td>
            <td class="px-3 py-2 text-xs">{{ item.heart_rate ?? notAvailable }}</td>
            <td class="px-3 py-2 text-xs">{{ item.temperature_c ?? notAvailable }}</td>
            <td class="px-3 py-2 text-xs">{{ item.oxygen_saturation ?? notAvailable }}</td>
            <td v-if="canEdit" class="px-3 py-2 text-end">
              <template v-if="deletingId === item.id">
                <span class="text-xs text-error me-1">{{ t('clinicalHistory.confirmDelete') }}</span>
                <AppButton type="button" class="text-xs font-semibold text-error" @click="confirmDelete(item)">{{ t('clinicalHistory.yes') }}</AppButton>
                <AppButton type="button" class="text-xs font-semibold text-on-surface-variant ms-1" @click="deletingId = null">{{ t('clinicalHistory.no') }}</AppButton>
              </template>
              <template v-else>
                <button type="button" class="icon-btn" :aria-label="t('clinicalHistory.edit')" @click="startEdit(item)">
                  <FontAwesomeIcon icon="pen-to-square" aria-hidden="true" />
                </button>
                <button type="button" class="icon-btn" :aria-label="t('clinicalHistory.delete')" @click="deletingId = item.id">
                  <FontAwesomeIcon icon="trash" aria-hidden="true" />
                </button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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

const notAvailable = computed(() => t('clinicalHistory.notAvailable'))

const items = ref([...props.records])
watch(() => props.records, (val) => { items.value = [...(val ?? [])] })

const showAddForm = ref(false)
const editingId = ref(null)
const deletingId = ref(null)
const saving = ref(false)
const formError = ref('')

const emptyForm = () => ({
  recorded_at: '', height_cm: null, weight_kg: null,
  blood_pressure_systolic: null, blood_pressure_diastolic: null,
  heart_rate: null, temperature_c: null, respiratory_rate: null, oxygen_saturation: null,
  notes: '',
})
const form = reactive(emptyForm())

function toLocalInput(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function openAddForm() {
  Object.assign(form, emptyForm())
  form.recorded_at = toLocalInput(new Date().toISOString())
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
    recorded_at: toLocalInput(item.recorded_at),
    height_cm: item.height_cm ?? null,
    weight_kg: item.weight_kg ?? null,
    blood_pressure_systolic: item.blood_pressure_systolic ?? null,
    blood_pressure_diastolic: item.blood_pressure_diastolic ?? null,
    heart_rate: item.heart_rate ?? null,
    temperature_c: item.temperature_c ?? null,
    respiratory_rate: item.respiratory_rate ?? null,
    oxygen_saturation: item.oxygen_saturation ?? null,
    notes: item.notes || '',
  })
}

function cancelForm() {
  showAddForm.value = false
  editingId.value = null
  formError.value = ''
}

function formatDateTime(iso) {
  if (!iso) return notAvailable.value
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
  const body = {
    recorded_at: form.recorded_at ? new Date(form.recorded_at).toISOString() : null,
    height_cm: form.height_cm ?? null,
    weight_kg: form.weight_kg ?? null,
    blood_pressure_systolic: form.blood_pressure_systolic ?? null,
    blood_pressure_diastolic: form.blood_pressure_diastolic ?? null,
    heart_rate: form.heart_rate ?? null,
    temperature_c: form.temperature_c ?? null,
    respiratory_rate: form.respiratory_rate ?? null,
    oxygen_saturation: form.oxygen_saturation ?? null,
    notes: form.notes || null,
  }
  try {
    const base = `/api/organizations/${props.organizationId}/patients/${props.patientId}/vitals`
    if (editingId.value) {
      const res = await api(`${base}/${editingId.value}`, { method: 'PATCH', body })
      const idx = items.value.findIndex((i) => i.id === editingId.value)
      if (idx !== -1) items.value[idx] = res.vital
    }
    else {
      const res = await api(base, { method: 'POST', body })
      items.value = [res.vital, ...items.value]
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
    await api(`/api/organizations/${props.organizationId}/patients/${props.patientId}/vitals/${item.id}`, { method: 'DELETE' })
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
  @apply inline-flex items-center justify-center h-7 w-7 rounded-full text-on-surface-variant hover:bg-surface-container dark:hover:bg-slate-800 transition-colors;
}
</style>
