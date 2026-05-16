<template>
  <main class="flex h-screen overflow-hidden">
    <aside class="w-full md:w-1/3 lg:w-[400px] bg-surface flex flex-col border-r border-outline-variant z-10">
      <SearchResultsHeader />

      <div v-if="pending" class="flex-1 overflow-y-auto p-md text-on-surface-variant text-body-sm">
        …
      </div>

      <div v-else-if="error" class="flex-1 overflow-y-auto p-md text-error text-body-sm">
        {{ t('searchResults.loadError') }}
      </div>

      <div v-else-if="!institutes.length" class="flex-1 overflow-y-auto p-md text-on-surface-variant text-body-sm">
        {{ t('searchResults.empty') }}
      </div>

      <div v-else class="flex-1 overflow-y-auto p-md space-y-md">
        <ClinicCard
          v-for="item in institutes"
          :key="item.slug"
          :slug="item.slug"
          :name="item.name"
          :distance="item.distance ?? 0"
          :neighborhood="item.neighborhood ?? ''"
          :is-open="item.isOpen"
          :open-time="item.openTime"
          :image="item.image ?? ''"
          :selected="selectedSlug === item.slug"
          @mouseenter="selectedSlug = item.slug"
        />
      </div>
    </aside>

    <section class="hidden md:flex flex-1 relative bg-surface-container">
      <div class="absolute inset-0 grayscale-[0.2] opacity-90 contrast-75">
        <img
          :alt="t('searchResults.mapAlt')"
          class="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFA9wgsaKSnMNhmzMclKx1ypFrAX3R79T7YtOQXYzV0ROybmOkysFzxyaIxAyxGkUotwCJtU9D0QE4FLwhL1-DccLw43q3_oTLwWYckPagqgSJc768StyNauE5ipB1xnJU3V59zMiTlqUB-D7CfFHtdtx9BA5_Pp8EORW50658TL1CHV06KCy9D-JopyJa6V1f9rsPuDLZxVLzVDDHBwKmlnjAWm-Oi6BVAHcKmxAysr7x52m1bp882oc7A5PlaDwDcb411ztgN70"
        />
      </div>

      <div class="absolute top-md right-md flex flex-col gap-2">
        <AppButton class="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors">
          <FontAwesomeIcon icon="plus" />
        </AppButton>
        <AppButton class="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors border-t border-outline-variant">
          <FontAwesomeIcon icon="minus" />
        </AppButton>
        <AppButton class="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors mt-2">
          <FontAwesomeIcon icon="location-crosshairs" />
        </AppButton>
      </div>

      <div
        v-for="(item, index) in mapPins"
        :key="item.slug"
        class="absolute group cursor-pointer"
        :class="pinPositions[index % pinPositions.length]"
      >
        <div class="relative">
          <div
            class="bg-secondary text-white p-2 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform"
            :class="selectedSlug === item.slug ? 'ring-4 ring-secondary/20' : ''"
          >
            <FontAwesomeIcon icon="briefcase-medical" class="text-xl" />
          </div>
          <div
            v-if="selectedSlug === item.slug"
            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-10 w-48 bg-white p-2 rounded-lg shadow-xl border border-secondary"
          >
            <p class="font-h3 text-[14px] text-secondary">{{ item.name }}</p>
            <p class="text-body-sm text-[12px] text-on-surface-variant">
              {{ item.allowsAppointments ? t('searchResults.quickAppointment') : t('clinicCard.closedOpens', { time: item.openTime ?? '—' }) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <BottomNavBar />
    <div class="h-16 md:hidden" aria-hidden="true" />
  </main>
</template>

<script setup>
const { t } = useI18n()
const { api } = useMedDirectApi()

const selectedSlug = ref(null)

const pinPositions = [
  'top-1/4 left-1/4',
  'top-1/2 left-1/2',
  'bottom-1/3 right-1/3',
  'top-1/3 right-1/4',
]

const { data, pending, error } = await useAsyncData('med-search', () => api('/api/med'))

const institutes = computed(() => data.value?.institutes ?? [])

const mapPins = computed(() => institutes.value.slice(0, 4))

watch(
  institutes,
  (list) => {
    if (list.length && selectedSlug.value == null) {
      selectedSlug.value = list[0].slug
    }
  },
  { immediate: true },
)
</script>
