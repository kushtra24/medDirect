<template>
  <div class="min-h-screen bg-slate-100 text-slate-800 font-body-md antialiased print:bg-white print:p-0">
    <p class="no-print mx-auto max-w-[800px] px-4 pt-4 text-center text-body-sm text-slate-500">
      {{ t('labReportSlip.nonPrintHint') }}
    </p>

    <main class="flex w-full flex-col items-center justify-center p-4 md:p-8 print:p-0">
      <div
        class="print-area w-full max-w-[800px] border border-slate-200 bg-white p-8 font-body-md shadow-sm md:p-12 print:max-w-none print:border-0 print:shadow-none"
      >
        <!-- Header -->
        <div class="mb-8 flex flex-col gap-6 border-b border-slate-100 pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-center gap-3">
            <div class="rounded-lg bg-blue-900 p-2">
              <FontAwesomeIcon icon="notes-medical" class="text-3xl text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 class="font-h3 text-h3 leading-none text-blue-900">
                {{ t('labReportSlip.institutionName') }}
              </h1>
              <p class="mt-1 text-body-sm font-semibold uppercase tracking-widest text-slate-500">
                {{ t('labReportSlip.institutionTagline') }}
              </p>
            </div>
          </div>
          <div class="text-start sm:text-end">
            <h2 class="font-h2 text-h2 uppercase tracking-tighter text-blue-900 opacity-20">
              {{ t('labReportSlip.officialReportTitle') }}
            </h2>
            <p class="text-body-sm font-bold text-teal-600">
              {{ t('labReportSlip.refIdLabel') }}
              {{ t('labReportSlip.refId') }}
            </p>
          </div>
        </div>

        <!-- Patient grid -->
        <div class="mb-8 grid grid-cols-1 gap-x-8 gap-y-6 rounded-lg border border-slate-100 bg-slate-50 p-6 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <span class="mb-1 block font-label-caps text-slate-400">{{ t('labReportSlip.patientNameLabel') }}</span>
            <span class="text-body-lg font-bold text-blue-900">{{ t('labReportSlip.patientName') }}</span>
          </div>
          <div>
            <span class="mb-1 block font-label-caps text-slate-400">{{ t('labReportSlip.dobLabel') }}</span>
            <span class="text-body-md font-medium">{{ t('labReportSlip.dobDisplay') }}</span>
          </div>
          <div>
            <span class="mb-1 block font-label-caps text-slate-400">{{ t('labReportSlip.genderLabel') }}</span>
            <span class="text-body-md font-medium">{{ t('labReportSlip.gender') }}</span>
          </div>
          <div>
            <span class="mb-1 block font-label-caps text-slate-400">{{ t('labReportSlip.patientIdLabel') }}</span>
            <span class="text-body-md font-medium text-teal-600">{{ t('labReportSlip.patientId') }}</span>
          </div>
          <div>
            <span class="mb-1 block font-label-caps text-slate-400">{{ t('labReportSlip.collectionLabel') }}</span>
            <span class="text-body-md font-medium">{{ t('labReportSlip.collectionDisplay') }}</span>
          </div>
          <div>
            <span class="mb-1 block font-label-caps text-slate-400">{{ t('labReportSlip.reportStatusLabel') }}</span>
            <span class="inline-flex items-center gap-1 font-bold text-teal-600">
              <FontAwesomeIcon icon="circle-check" class="text-[16px]" aria-hidden="true" />
              {{ t('labReportSlip.reportStatusFinal') }}
            </span>
          </div>
        </div>

        <!-- Results table -->
        <div class="mb-10 overflow-hidden">
          <table class="w-full border-collapse text-start">
            <thead>
              <tr class="bg-blue-900 text-white">
                <th class="px-4 py-3 font-label-caps text-[11px]">{{ t('labReportSlip.table.testDescription') }}</th>
                <th class="px-4 py-3 font-label-caps text-[11px]">{{ t('labReportSlip.table.result') }}</th>
                <th class="px-4 py-3 font-label-caps text-[11px]">{{ t('labReportSlip.table.units') }}</th>
                <th class="px-4 py-3 font-label-caps text-[11px]">{{ t('labReportSlip.table.referenceRange') }}</th>
                <th class="px-4 py-3 text-end font-label-caps text-[11px]">{{ t('labReportSlip.table.status') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr class="transition-colors print:hover:bg-transparent hover:bg-slate-50">
                <td class="px-4 py-4 font-semibold text-blue-900">{{ t('labReportSlip.rows.glucose.name') }}</td>
                <td class="px-4 py-4 font-bold text-red-600">{{ t('labReportSlip.rows.glucose.result') }}</td>
                <td class="px-4 py-4 text-body-sm text-slate-500">{{ t('labReportSlip.rows.glucose.units') }}</td>
                <td class="px-4 py-4 text-body-sm text-slate-500">{{ t('labReportSlip.rows.glucose.reference') }}</td>
                <td class="px-4 py-4 text-end">
                  <span class="inline-block rounded bg-red-50 px-2 py-1 text-[10px] font-bold uppercase text-red-800">{{
                    t('labReportSlip.badge.high')
                  }}</span>
                </td>
              </tr>
              <tr class="transition-colors print:hover:bg-transparent hover:bg-slate-50">
                <td class="px-4 py-4 font-semibold text-blue-900">{{ t('labReportSlip.rows.hba1c.name') }}</td>
                <td class="px-4 py-4 font-bold text-slate-900">{{ t('labReportSlip.rows.hba1c.result') }}</td>
                <td class="px-4 py-4 text-body-sm text-slate-500">{{ t('labReportSlip.rows.hba1c.units') }}</td>
                <td class="px-4 py-4 text-body-sm text-slate-500">{{ t('labReportSlip.rows.hba1c.reference') }}</td>
                <td class="px-4 py-4 text-end">
                  <span class="inline-block rounded bg-teal-50 px-2 py-1 text-[10px] font-bold uppercase text-teal-700">{{
                    t('labReportSlip.badge.normal')
                  }}</span>
                </td>
              </tr>
              <tr class="transition-colors print:hover:bg-transparent hover:bg-slate-50">
                <td class="px-4 py-4 font-semibold text-blue-900">{{ t('labReportSlip.rows.creatinine.name') }}</td>
                <td class="px-4 py-4 font-bold text-slate-900">{{ t('labReportSlip.rows.creatinine.result') }}</td>
                <td class="px-4 py-4 text-body-sm text-slate-500">{{ t('labReportSlip.rows.creatinine.units') }}</td>
                <td class="px-4 py-4 text-body-sm text-slate-500">{{ t('labReportSlip.rows.creatinine.reference') }}</td>
                <td class="px-4 py-4 text-end">
                  <span class="inline-block rounded bg-teal-50 px-2 py-1 text-[10px] font-bold uppercase text-teal-700">{{
                    t('labReportSlip.badge.normal')
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- QR + PIN -->
        <div class="mb-12 grid items-center gap-6 border-t border-slate-100 pt-8 md:grid-cols-2">
          <div class="flex gap-4 rounded-lg border border-teal-100 bg-teal-50/30 p-5">
            <div class="rounded border border-slate-100 bg-white p-2 shadow-sm">
              <FontAwesomeIcon icon="qrcode" class="text-4xl text-blue-900" aria-hidden="true" />
            </div>
            <div>
              <h4 class="mb-1 text-body-sm font-bold text-blue-900">{{ t('labReportSlip.onlineTitle') }}</h4>
              <p class="text-[12px] leading-tight text-slate-600">
                {{ t('labReportSlip.onlineBodyStart') }}
                <span class="font-bold text-teal-600">{{ t('labReportSlip.onlineVerifyUrl') }}</span>
                {{ t('labReportSlip.onlineBodyEnd') }}
              </p>
            </div>
          </div>
          <div class="rounded-lg border-2 border-dashed border-slate-200 p-5 text-center">
            <span class="mb-1 block font-label-caps text-slate-400">{{ t('labReportSlip.securePinLabel') }}</span>
            <span class="font-h2 text-h2 tracking-widest text-blue-900">{{ t('labReportSlip.pinDisplay') }}</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-slate-100 pt-8">
          <div class="mb-8 grid gap-8 md:grid-cols-2">
            <div>
              <h4 class="mb-2 font-label-caps text-slate-400">{{ t('labReportSlip.disclaimerTitle') }}</h4>
              <p class="text-[11px] italic leading-relaxed text-slate-500">
                {{ t('labReportSlip.disclaimerBody') }}
              </p>
            </div>
            <div class="flex flex-col items-start md:items-end">
              <div class="mb-2 w-48 border-b border-blue-900 pb-1">
                <img
                  class="h-10 opacity-80 mix-blend-multiply"
                  :alt="t('labReportSlip.signatureAlt')"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3NsOCmycgZEoMedaPgHhOJTmXav3Ptu1ozfAOH3_ki0xYEguypH6iW-xcFnOJqrvkVnE8zE3igGya0sisnppiqgU1BSmMNyo6r6-vcMHie6wDhapC2dVVw8fgbvqibbxMrM1AnmWtaLNOgrCbWfCmjjNnnUuEN2yD1GUk6mJxrH6lrAq3W0D2xyUNoi8leFx2KNj4QLabYX6xlbXAOswc_zhHcnB0ChRNIPWwlgJ28OtXS-RF_O7U_XjY5Ms287dMDOsQItqhcIY"
                >
              </div>
              <span class="text-body-sm font-bold text-blue-900">{{ t('labReportSlip.signerName') }}</span>
              <span class="font-label-caps text-slate-400">{{ t('labReportSlip.signerRole') }}</span>
            </div>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-2 border-t border-slate-50 pt-4 text-[10px] text-slate-400">
            <span>{{ t('labReportSlip.footerAccreditation') }}</span>
            <span>{{ t('labReportSlip.footerLocation') }}</span>
            <span>{{ t('labReportSlip.footerPage') }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
})

const route = useRoute()
const { t } = useI18n()

useSeoMeta({
  title: () => t('labReportSlip.seoTitle'),
})

onMounted(() => {
  if (route.query.autoprint === '1') {
    nextTick(() => {
      setTimeout(() => {
        window.print()
      }, 450)
    })
  }
})
</script>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }

  :deep(html),
  :deep(body) {
    background: white !important;
  }
}

@page {
  margin: 12mm;
  size: A4 portrait;
}
</style>
