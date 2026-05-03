<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-blue-900/40 dark:bg-slate-950/70 backdrop-blur-sm p-4"
      role="presentation"
      @click.self="close"
    >
      <div
        class="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="descId"
        @click.stop
      >
        <div class="bg-tertiary p-6 text-on-tertiary relative isolate">
          <button
            type="button"
            class="absolute end-4 top-4 z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            :aria-label="t('labResultsPage.finalizedOverlay.closeAria')"
            @click="close"
          >
            <FontAwesomeIcon icon="xmark" class="text-xl" aria-hidden="true" />
          </button>
          <div class="mx-auto max-w-sm px-6 text-center">
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
              <FontAwesomeIcon icon="circle-check" class="text-4xl text-white" />
            </div>
            <h2 :id="titleId" class="font-h2 text-h2 text-white">
              {{ t('labResultsPage.finalizedOverlay.title') }}
            </h2>
            <p :id="descId" class="text-teal-50 opacity-90 dark:text-white/90">
              {{ t('labResultsPage.finalizedOverlay.subtitle') }}
            </p>
          </div>
        </div>

        <div class="p-8 md:p-10 space-y-8">
          <div class="text-center">
            <div class="font-h3 text-blue-900 dark:text-blue-100">
              {{ t('labResultsPage.finalizedOverlay.demoPatientName') }}
            </div>
            <div class="text-body-sm text-slate-500 dark:text-slate-400">
              {{ t('labResultsPage.finalizedOverlay.demoBirth') }}
            </div>
          </div>

          <div class="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-4 border-2 border-dashed border-slate-200 dark:border-slate-600 text-center">
            <label class="block font-label-caps text-slate-400 dark:text-slate-500 mb-2">{{
              t('labResultsPage.finalizedOverlay.securePinLabel')
            }}</label>
            <div class="flex justify-center gap-2 flex-wrap" role="group" :aria-label="t('labResultsPage.finalizedOverlay.securePinLabel')">
              <span
                v-for="(digit, i) in pinDigits"
                :key="i"
                class="w-10 h-14 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-600 rounded flex items-center justify-center text-2xl font-black text-blue-900 dark:text-blue-100 tabular-nums"
              >{{ digit }}</span>
            </div>
            <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-4">
              {{ t('labResultsPage.finalizedOverlay.pinHint') }}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-6">
            <div class="w-32 h-32 bg-white dark:bg-slate-950 p-2 border border-slate-100 dark:border-slate-700 rounded-lg shadow-sm shrink-0">
              <img
                class="w-full h-full object-contain"
                :alt="t('labResultsPage.finalizedOverlay.qrAlt')"
                :src="qrImageSrc"
              >
            </div>
            <div class="flex-1 space-y-4 w-full min-w-0">
              <p class="text-body-sm text-slate-600 dark:text-slate-400 italic">
                {{ t('labResultsPage.finalizedOverlay.qrHint') }}
              </p>
              <button
                type="button"
                class="w-full bg-tertiary hover:opacity-90 text-on-tertiary dark:bg-blue-800 dark:hover:bg-blue-900 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                @click="onPrint"
              >
                <FontAwesomeIcon icon="print" aria-hidden="true" />
                {{ t('labResultsPage.finalizedOverlay.printSlip') }}
              </button>
            </div>
          </div>
        </div>

        <div class="bg-slate-50 dark:bg-slate-800/60 p-4 text-center border-t border-slate-100 dark:border-slate-700">
          <button
            type="button"
            class="text-tertiary font-button text-sm hover:underline"
            @click="onDownloadPdf"
          >
            {{ t('labResultsPage.finalizedOverlay.downloadPdf') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onUnmounted, useId, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:open', 'print', 'downloadPdf'])

const { t } = useI18n()
const { openSlipNewTab } = useLabReportSlip()

const titleId = useId()
const descId = useId()

/** Demo PIN — replace with API response when wired */
const pinDigits = ['4', '8', '2', '9', '3', '1']

const qrImageSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBlDiX8v7NgTjXvNPGeIxBa2xYdlet6y5WfAiaul1UBUkk_H2mGHFVRIAYLJeWhps86fS6z5sy8IVQsihA9KSllRD9qFZlmUTKSY3pHstyCZ2NI0oO8w4IiY9lCed5wkiZIpQ43cJa_Ds1u1VMUPEXvBykvBaW_62c7s13HDBb41np5lcn64aF5JeXUPmDW-kT4rt-rNNetGZhPOcaSm-Vvk6CMcWCfnlE-VICa-e6AfimHeELYUEGXUd-DkxiMU2PJiMPSrNKRg-8'

function close() {
  emit('update:open', false)
}

function onPrint() {
  emit('print')
  openSlipNewTab({ autoprint: true })
}

function onDownloadPdf() {
  emit('downloadPdf')
  openSlipNewTab({ autoprint: true })
}

watch(
  () => props.open,
  (isOpen) => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('overflow-hidden', isOpen)
    }
  },
)

onUnmounted(() => {
  if (import.meta.client) {
    document.documentElement.classList.remove('overflow-hidden')
  }
})
</script>
