<template>
  <div class="bg-surface text-on-surface font-body-md selection:bg-secondary-container">
    <main class="max-w-md mx-auto bg-white min-h-screen pb-32 relative shadow-xl">
      <div v-if="pending" class="p-lg text-center text-on-surface-variant">
        …
      </div>

      <div v-else-if="error || !institute" class="p-lg text-center text-error">
        {{ error ? t('clinicPage.loadError') : t('clinicPage.notFound') }}
      </div>

      <template v-else>
        <ClinicHero
          :image="institute.heroImage"
          :alt="institute.name"
        />

        <ClinicIdentity
          :name="institute.name"
          :logo="institute.logo"
          :certified="institute.certified"
        />

        <section class="px-lg py-md">
          <h2 class="font-label-caps text-label-caps text-outline mb-sm">{{ t('clinicPage.description') }}</h2>
          <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {{ institute.description }}
          </p>
        </section>

        <section v-if="institute.specialties?.length" class="px-lg py-md">
          <h2 class="font-label-caps text-label-caps text-outline mb-sm">{{ t('clinicPage.specialties') }}</h2>
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="item in institute.specialties"
              :key="item"
              class="px-3 py-1 rounded-full bg-surface-container-low text-body-sm font-body-sm text-secondary"
            >
              {{ item }}
            </li>
          </ul>
        </section>

        <section v-if="institute.services?.length" class="px-lg py-md">
          <h2 class="font-label-caps text-label-caps text-outline mb-md">{{ t('clinicPage.services') }}</h2>
          <div class="grid grid-cols-2 gap-md">
            <ServiceCard
              v-for="service in institute.services"
              :key="service.label"
              :icon="service.icon"
              :label="service.label"
              :icon-color="service.iconColor"
            />
          </div>
        </section>

        <section class="px-lg py-md">
          <h2 class="font-label-caps text-label-caps text-outline mb-sm">{{ t('clinicPage.appointments') }}</h2>
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            {{ institute.allowsAppointments ? t('clinicPage.appointmentsAllowed') : t('clinicPage.appointmentsNotAllowed') }}
          </p>
        </section>

        <section class="px-lg py-md space-y-md">
          <div class="bg-surface-bright border border-outline-variant rounded-xl overflow-hidden">
            <div v-if="institute.mapImage" class="h-32">
              <img
                :alt="t('clinicPage.mapLocationAlt')"
                :src="institute.mapImage"
                class="w-full h-full object-cover"
              >
            </div>
            <div class="p-md space-y-md">
              <div
                v-for="addr in institute.addresses"
                :key="addr.id"
                class="flex items-start gap-md"
              >
                <FontAwesomeIcon icon="location-dot" class="text-tertiary mt-0.5" />
                <div>
                  <span class="block font-body-sm text-body-sm font-bold text-secondary">
                    {{ addr.description || t('clinicPage.address') }}
                  </span>
                  <span class="block font-body-sm text-body-sm text-on-surface-variant">{{ addr.line }}</span>
                </div>
              </div>
              <div
                v-for="phone in institute.phones"
                :key="phone.id"
                class="flex items-start gap-md"
              >
                <FontAwesomeIcon icon="phone" class="text-tertiary mt-0.5" />
                <div>
                  <span class="block font-body-sm text-body-sm font-bold text-secondary">
                    {{ phone.label || t('clinicPage.mobileNumber') }}
                  </span>
                  <span class="block font-body-sm text-body-sm text-on-surface-variant">{{ phone.number }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section v-if="institute.healthInsurances?.length" class="px-lg py-md">
          <h2 class="font-label-caps text-label-caps text-outline mb-sm">{{ t('clinicPage.healthInsurances') }}</h2>
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            {{ institute.healthInsurances.join(' · ') }}
          </p>
        </section>

        <section v-if="institute.languagesSpoken?.length" class="px-lg py-md">
          <h2 class="font-label-caps text-label-caps text-outline mb-sm">{{ t('clinicPage.languagesSpoken') }}</h2>
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            {{ institute.languagesSpoken.join(' · ') }}
          </p>
        </section>

        <section v-if="institute.diplomas?.length" class="px-lg py-md">
          <h2 class="font-label-caps text-label-caps text-outline mb-sm">{{ t('clinicPage.diplomas') }}</h2>
          <ul class="space-y-2">
            <li
              v-for="diploma in institute.diplomas"
              :key="diploma"
              class="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-2"
            >
              <FontAwesomeIcon icon="certificate" class="text-tertiary mt-0.5 flex-shrink-0" />
              {{ diploma }}
            </li>
          </ul>
        </section>

        <section class="px-lg py-md mb-xl">
          <h2 class="font-label-caps text-label-caps text-outline mb-md">{{ t('clinicPage.openingHours') }}</h2>
          <div class="bg-white border border-outline-variant rounded-xl divide-y divide-outline-variant">
            <div
              v-for="slot in institute.hours"
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
      </template>

      <BottomNavBar />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n()
const route = useRoute()
const { api } = useMedDirectApi()

const slug = computed(() => route.params.slug)

const { data, pending, error } = await useAsyncData(
  () => `med-${slug.value}`,
  () => api(`/api/med/${slug.value}`),
  { watch: [slug] },
)

const institute = computed(() => data.value?.institute ?? null)
</script>
