<template>
  <div class="bg-surface text-on-surface font-body-md selection:bg-secondary-container">
    <main class="max-w-md mx-auto bg-white min-h-screen pb-32 relative shadow-xl">

      <!-- Hero -->
      <ClinicHero
        :image="clinic.heroImage"
        :alt="clinic.name"
      />

      <!-- Identity -->
      <ClinicIdentity
        :name="clinic.name"
        :logo="clinic.logo"
        :certified="clinic.certified"
      />

      <!-- Description -->
      <section class="px-lg py-md">
        <h2 class="font-label-caps text-label-caps text-outline mb-sm">{{ t('clinicPage.description') }}</h2>
        <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {{ clinic.description }}
        </p>
      </section>

      <!-- Services -->
      <section class="px-lg py-md">
        <h2 class="font-label-caps text-label-caps text-outline mb-md">{{ t('clinicPage.services') }}</h2>
        <div class="grid grid-cols-2 gap-md">
          <ServiceCard
            v-for="service in clinic.services"
            :key="service.label"
            :icon="service.icon"
            :label="service.label"
            :icon-color="service.iconColor"
          />
        </div>
      </section>

      <!-- Contact & Location -->
      <section class="px-lg py-md space-y-md">
        <div class="bg-surface-bright border border-outline-variant rounded-xl overflow-hidden">
          <div class="h-32">
            <img
              :alt="t('clinicPage.mapLocationAlt')"
              :src="clinic.mapImage"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-md space-y-md">
            <div class="flex items-start gap-md">
              <FontAwesomeIcon icon="location-dot" class="text-tertiary mt-0.5" />
              <div>
                <span class="block font-body-sm text-body-sm font-bold text-secondary">{{ t('clinicPage.address') }}</span>
                <span class="block font-body-sm text-body-sm text-on-surface-variant">{{ clinic.address }}</span>
              </div>
            </div>
            <div class="flex items-start gap-md">
              <FontAwesomeIcon icon="phone" class="text-tertiary mt-0.5" />
              <div>
                <span class="block font-body-sm text-body-sm font-bold text-secondary">{{ t('clinicPage.mobileNumber') }}</span>
                <span class="block font-body-sm text-body-sm text-on-surface-variant">{{ clinic.phone }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Opening Hours -->
      <section class="px-lg py-md mb-xl">
        <h2 class="font-label-caps text-label-caps text-outline mb-md">{{ t('clinicPage.openingHours') }}</h2>
        <div class="bg-white border border-outline-variant rounded-xl divide-y divide-outline-variant">
          <div
            v-for="slot in clinic.hours"
            :key="slot.days"
            class="flex justify-between p-md"
            :class="slot.highlight ? 'bg-surface-container-low' : ''"
          >
            <span class="font-body-sm text-body-sm" :class="slot.closed ? 'text-outline' : 'text-on-surface'">
              {{ slot.days }}
            </span>
            <span class="font-body-sm text-body-sm font-semibold" :class="slot.closed ? 'text-error' : 'text-secondary'">
              {{ slot.time }}
            </span>
          </div>
        </div>
      </section>

      <!-- Bottom Nav -->
      <BottomNavBar />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n()

const clinic = computed(() => ({
  name: t('clinicDemo.name'),
  certified: true,
  description: t('clinicDemo.description'),
  address: t('clinicDemo.address'),
  phone: t('clinicDemo.phone'),
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCppFH1yhJ_wOWmK-7x9MitDrsq4NPdTakSSPQHAfW0Qxvm3Sa72WgJjg-jTfBxlb-EJ6ZoLbl0i-LkMOrecl74IfB6qIw3-Q9e5Mm7-amBbbUk64lS8tBFA3vA2K5Gj_ktBOSTLZgFBNZXAr92uWIass1S2A-4sP09Q5e-aG7kpczLQ6Na_zuPpoDhghUdLEntOV8nEy9s7XKty8iX8DdChTDJK8c7BMWaAweD7w2k5OK4uNiXSo64HpNDO8g7G8hmDLJLLWzDWy8',
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFaAofXuyaV7ORARWOR0qNttT1cGqFZ1N9O55nMYJsuYjWGvqO-7Jb3FmtbJ9NXf7Q2RQXAjLWHEx1sA6a9mmYJxaNwpRREo4wh7PRUThPxi3jDSTqa_1P1_9iQNH12wSfZTtrMMOGs-mH5TPuisnxv45e90YoOICyzudVNCJYBM6jJwZUT3wGZml-kvEi10FCZv_0znx5rCzzjnehFAReGtx32Gn-W4yvCxOyEvSgDQowIm95_umJAVUojC0L8p3GYvcE71ATYB8',
  mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSf5BBdsYwPReDnSsJr3dVDcf1nxMr-qZEN17vZcmlTR2Be90xNrb7FqyokhSwfi8ZAe7yHondfISRZomYnF3RwnOw2WONWF4KUDJZTSJpu-7-_d5ODfbkKubQDyCxwq5iV_HkylUyTyyCxGdfGkGKJjmi303MhN8Fs8tGMInjBrMD0sFNI8LrlM-B5taegpg9iea1GCw84gPg9JiZIMXPPrCiUbER1WEQrXPF8wgbqtp57HTssKqPg0VWiG8yGj9ETUUPWNA50m4',
  services: [
    { icon: 'droplet', label: t('clinicDemo.services.bloodTests'), iconColor: 'text-secondary' },
    { icon: 'microscope', label: t('clinicDemo.services.dnaAnalysis'), iconColor: 'text-tertiary' },
    { icon: 'magnifying-glass', label: t('clinicDemo.services.pathology'), iconColor: 'text-secondary' },
    { icon: 'virus', label: t('clinicDemo.services.covid'), iconColor: 'text-error' },
  ],
  hours: [
    { days: t('clinicDemo.hours.weekdays'), time: t('clinicDemo.hours.weekdayTime'), closed: false, highlight: false },
    { days: t('clinicDemo.hours.sunday'), time: t('clinicDemo.hours.closed'), closed: true, highlight: true },
  ],
}))
</script>
