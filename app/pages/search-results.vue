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
      <ClientOnly>
        <SearchResultsMap
          ref="mapRef"
          :institutes="institutes"
          :selected-slug="selectedSlug"
          @select="selectedSlug = $event"
        />
        <template #fallback>
          <div class="absolute inset-0 flex items-center justify-center text-on-surface-variant text-body-sm">
            {{ t('searchResults.mapAlt') }}
          </div>
        </template>
      </ClientOnly>

      <div class="absolute top-md right-md flex flex-col gap-2 z-[1000]">
        <AppButton
          class="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors"
          @click="mapRef?.zoomIn()"
        >
          <FontAwesomeIcon icon="plus" />
        </AppButton>
        <AppButton
          class="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors border-t border-outline-variant"
          @click="mapRef?.zoomOut()"
        >
          <FontAwesomeIcon icon="minus" />
        </AppButton>
        <AppButton
          class="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors mt-2"
          @click="mapRef?.locateMe()"
        >
          <FontAwesomeIcon icon="location-crosshairs" />
        </AppButton>
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
const mapRef = ref(null)

const route = useRoute()

const searchQuery = computed(() => ({
  q: String(route.query.q ?? '').trim(),
  city: String(route.query.city ?? '').trim(),
}))

const { data, pending, error } = await useAsyncData(
  () => `med-search-${searchQuery.value.q}-${searchQuery.value.city}`,
  () => {
    const params = new URLSearchParams()
    if (searchQuery.value.q) {
      params.set('q', searchQuery.value.q)
    }
    if (searchQuery.value.city) {
      params.set('city', searchQuery.value.city)
    }
    const qs = params.toString()
    return api(qs ? `/api/med?${qs}` : '/api/med')
  },
  { watch: [searchQuery] },
)

const institutes = computed(() => data.value?.institutes ?? [])

watch(
  institutes,
  (list) => {
    if (!list.length) {
      selectedSlug.value = null
      return
    }
    if (selectedSlug.value == null || !list.some((item) => item.slug === selectedSlug.value)) {
      selectedSlug.value = list[0].slug
    }
  },
  { immediate: true },
)
</script>
