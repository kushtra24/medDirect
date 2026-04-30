<template>
  <main class="flex h-screen overflow-hidden">
    <!-- Sidebar: Clinic List -->
    <aside class="w-full md:w-1/3 lg:w-[400px] bg-surface flex flex-col border-r border-outline-variant z-10">
      <SearchResultsHeader />

      <!-- Scrollable Cards -->
      <div class="flex-1 overflow-y-auto p-md space-y-md">
        <ClinicCard
          v-for="(clinic, index) in clinics"
          :key="index"
          v-bind="clinic"
        />
      </div>
    </aside>

    <!-- Main Content: Map -->
    <section class="hidden md:flex flex-1 relative bg-surface-container">
      <div class="absolute inset-0 grayscale-[0.2] opacity-90 contrast-75">
        <img
          :alt="t('searchResults.mapAlt')"
          class="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFA9wgsaKSnMNhmzMclKx1ypFrAX3R79T7YtOQXYzV0ROybmOkysFzxyaIxAyxGkUotwCJtU9D0QE4FLwhL1-DccLw43q3_oTLwWYckPagqgSJc768StyNauE5ipB1xnJU3V59zMiTlqUB-D7CfFHtdtx9BA5_Pp8EORW50658TL1CHV06KCy9D-JopyJa6V1f9rsPuDLZxVLzVDDHBwKmlnjAWm-Oi6BVAHcKmxAysr7x52m1bp882oc7A5PlaDwDcb411ztgN70"
        />
      </div>

      <!-- Map Zoom/Location Controls -->
      <div class="absolute top-md right-md flex flex-col gap-2">
        <button class="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors">
          <FontAwesomeIcon icon="plus" />
        </button>
        <button class="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors border-t border-outline-variant">
          <FontAwesomeIcon icon="minus" />
        </button>
        <button class="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors mt-2">
          <FontAwesomeIcon icon="location-crosshairs" />
        </button>
      </div>

      <!-- Map Pins -->
      <div class="absolute top-1/4 left-1/4 group cursor-pointer">
        <div class="relative">
          <div class="bg-secondary text-white p-2 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform">
            <FontAwesomeIcon icon="briefcase-medical" class="text-xl" />
          </div>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-10 w-48 bg-white p-2 rounded-lg shadow-xl hidden group-hover:block border border-outline-variant">
            <p class="font-h3 text-[14px] text-secondary">{{ clinics[0]?.name }}</p>
            <p class="text-body-sm text-[12px] text-on-surface-variant">
              {{ t('searchResults.availableAt', { time: '2:00 PM' }) }}
            </p>
          </div>
        </div>
      </div>

      <div class="absolute top-1/2 left-1/2 group cursor-pointer">
        <div class="relative">
          <div class="bg-secondary text-white p-2 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform">
            <FontAwesomeIcon icon="briefcase-medical" class="text-xl" />
          </div>
        </div>
      </div>

      <div class="absolute bottom-1/3 right-1/3 group cursor-pointer">
        <div class="relative">
          <div class="bg-secondary text-white p-2 rounded-full shadow-lg ring-4 ring-secondary/20 transform -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform">
            <FontAwesomeIcon icon="briefcase-medical" class="text-xl" />
          </div>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-10 w-48 bg-white p-2 rounded-lg shadow-xl border border-secondary">
            <p class="font-h3 text-[14px] text-secondary">{{ clinics[3]?.name }}</p>
            <p class="text-body-sm text-[12px] text-on-surface-variant">{{ t('searchResults.quickAppointment') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom Nav (mobile) -->
    <BottomNavBar />

    <!-- Bottom padding so content isn't hidden behind nav on mobile -->
    <div class="h-16 md:hidden" aria-hidden="true" />
  </main>
</template>

<script setup>
const { t } = useI18n()

const clinics = [
  {
    name: 'Mercy General Clinic',
    rating: 4.9,
    distance: 0.8,
    neighborhood: 'Downtown',
    isOpen: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxYtcVZLS7fIvBemRINhlSF5Juhm271599O4ury3vdtYb_4PUe3gxqINlrvuiKn8B7gCbOIu8XXpPevsGOdSXY2IP3eNsbow5tB7plDl-suUCUtGeZLiO7WJJNC_T682c29vgyFOxKeoSHyLTb1_mQ_xD1SakPzKCIIi_KHVDVQZPAFyZv9gab8vNz3bPCAHDVAvW4sN9U-1djS-YcNygPokSwpRL6BVikaKzdOAcsNMJbo_qNdCGvyJth2_gi7xCo9IVd1X13nAs',
    selected: false,
  },
  {
    name: 'Wellness Hub Care',
    rating: 4.7,
    distance: 1.2,
    neighborhood: 'North Side',
    isOpen: false,
    openTime: '8AM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATVUbiM1CMpfympefoGMlZ4cdsG8PmFxnpqa9m9t0MORySvkDR2b9Dvpw_UjkGqaBCWsg8JeEsufN9F5MROCZlHzd9QjHjJdjQq52DwJlJZ1TfAWkt49JyUpSEov77Sl8Nxt-fSOQfFC8iQqXVMkESdqT9rFJ2M_jnj3_U6Aa_YScpS0zDEYSVniIx_Tj1q43VrGqkpDdvtOytYtetxyxCIyj1gKzX6QEOw8jbKnzOgKZFf8mnvFoFqzJ4OWFYmLDfRfNm6BwPMoE',
    selected: false,
  },
  {
    name: 'Horizon Health Center',
    rating: 4.8,
    distance: 2.5,
    neighborhood: 'Riverside',
    isOpen: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEg8__eNe_trzRcJX6z7YyavyJkRjCASSfwc7MTUwh09LbmRmy8TmriXgRPYBU_fpcSpgbWrYmqePLaACsochPD63sF_vcgM6sWHroY7Ro6Xf-b4tp-KaxTufTZfIphpHWglGSnXlRQErm34Ieu2Bu7yTOYsUoDdvECnvKCrB7gl1Iv9TEHD7GIGmyJIewNSG205JhIT5PtlZxNwUMj5AdfGOJs9fBRExXbvGL1D0y9zfosIK9QYNddcydGmIcsTlkiteD1i7lb68',
    selected: false,
  },
  {
    name: 'City Life Medical',
    rating: 4.5,
    distance: 3.1,
    neighborhood: 'East End',
    isOpen: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYuvU1uAJ5yedTctidgVEPeK2oCu-tMIFJaO87PheGAiVWDsJ8uV5ZTU4i6ubhtbrR0iIEOA6Ds9qr8D_ls56BSrANn46xaokOsDkKELxkCqxXADJvhj-10S4qFmECxubtl87GvmuVHGVc99jbiOlzVSKc85_-hnz1VK8wgsPqUapmb2a5QXY75aFq7uhlmBmmfIxUpbNyrTnaheOygBU5y58_ZksrMyGQo-d31aEfR4oTa13gWEp4OA8PlsHJrTCB6Q9n5hfY7gw',
    selected: true,
  },
  {
    name: 'City Life Medical',
    rating: 4.5,
    distance: 3.1,
    neighborhood: 'East End',
    isOpen: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYuvU1uAJ5yedTctidgVEPeK2oCu-tMIFJaO87PheGAiVWDsJ8uV5ZTU4i6ubhtbrR0iIEOA6Ds9qr8D_ls56BSrANn46xaokOsDkKELxkCqxXADJvhj-10S4qFmECxubtl87GvmuVHGVc99jbiOlzVSKc85_-hnz1VK8wgsPqUapmb2a5QXY75aFq7uhlmBmmfIxUpbNyrTnaheOygBU5y58_ZksrMyGQo-d31aEfR4oTa13gWEp4OA8PlsHJrTCB6Q9n5hfY7gw',
    selected: false,
  },
  {
    name: 'City Life Medical',
    rating: 4.5,
    distance: 3.1,
    neighborhood: 'East End',
    isOpen: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYuvU1uAJ5yedTctidgVEPeK2oCu-tMIFJaO87PheGAiVWDsJ8uV5ZTU4i6ubhtbrR0iIEOA6Ds9qr8D_ls56BSrANn46xaokOsDkKELxkCqxXADJvhj-10S4qFmECxubtl87GvmuVHGVc99jbiOlzVSKc85_-hnz1VK8wgsPqUapmb2a5QXY75aFq7uhlmBmmfIxUpbNyrTnaheOygBU5y58_ZksrMyGQo-d31aEfR4oTa13gWEp4OA8PlsHJrTCB6Q9n5hfY7gw',
    selected: false,
  },
  {
    name: 'City Life Medical',
    rating: 4.5,
    distance: 3.1,
    neighborhood: 'East End',
    isOpen: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYuvU1uAJ5yedTctidgVEPeK2oCu-tMIFJaO87PheGAiVWDsJ8uV5ZTU4i6ubhtbrR0iIEOA6Ds9qr8D_ls56BSrANn46xaokOsDkKELxkCqxXADJvhj-10S4qFmECxubtl87GvmuVHGVc99jbiOlzVSKc85_-hnz1VK8wgsPqUapmb2a5QXY75aFq7uhlmBmmfIxUpbNyrTnaheOygBU5y58_ZksrMyGQo-d31aEfR4oTa13gWEp4OA8PlsHJrTCB6Q9n5hfY7gw',
    selected: false,
  },
  {
    name: 'City Life Medical',
    rating: 4.5,
    distance: 3.1,
    neighborhood: 'East End',
    isOpen: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYuvU1uAJ5yedTctidgVEPeK2oCu-tMIFJaO87PheGAiVWDsJ8uV5ZTU4i6ubhtbrR0iIEOA6Ds9qr8D_ls56BSrANn46xaokOsDkKELxkCqxXADJvhj-10S4qFmECxubtl87GvmuVHGVc99jbiOlzVSKc85_-hnz1VK8wgsPqUapmb2a5QXY75aFq7uhlmBmmfIxUpbNyrTnaheOygBU5y58_ZksrMyGQo-d31aEfR4oTa13gWEp4OA8PlsHJrTCB6Q9n5hfY7gw',
    selected: false,
  },
  {
    name: 'City Life Medical',
    rating: 4.5,
    distance: 3.1,
    neighborhood: 'East End',
    isOpen: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYuvU1uAJ5yedTctidgVEPeK2oCu-tMIFJaO87PheGAiVWDsJ8uV5ZTU4i6ubhtbrR0iIEOA6Ds9qr8D_ls56BSrANn46xaokOsDkKELxkCqxXADJvhj-10S4qFmECxubtl87GvmuVHGVc99jbiOlzVSKc85_-hnz1VK8wgsPqUapmb2a5QXY75aFq7uhlmBmmfIxUpbNyrTnaheOygBU5y58_ZksrMyGQo-d31aEfR4oTa13gWEp4OA8PlsHJrTCB6Q9n5hfY7gw',
    selected: false,
  },
  {
    name: 'City Life Medical',
    rating: 4.5,
    distance: 3.1,
    neighborhood: 'East End',
    isOpen: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYuvU1uAJ5yedTctidgVEPeK2oCu-tMIFJaO87PheGAiVWDsJ8uV5ZTU4i6ubhtbrR0iIEOA6Ds9qr8D_ls56BSrANn46xaokOsDkKELxkCqxXADJvhj-10S4qFmECxubtl87GvmuVHGVc99jbiOlzVSKc85_-hnz1VK8wgsPqUapmb2a5QXY75aFq7uhlmBmmfIxUpbNyrTnaheOygBU5y58_ZksrMyGQo-d31aEfR4oTa13gWEp4OA8PlsHJrTCB6Q9n5hfY7gw',
    selected: false,
  },
  {
    name: 'City Life Medical',
    rating: 4.5,
    distance: 3.1,
    neighborhood: 'East End',
    isOpen: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYuvU1uAJ5yedTctidgVEPeK2oCu-tMIFJaO87PheGAiVWDsJ8uV5ZTU4i6ubhtbrR0iIEOA6Ds9qr8D_ls56BSrANn46xaokOsDkKELxkCqxXADJvhj-10S4qFmECxubtl87GvmuVHGVc99jbiOlzVSKc85_-hnz1VK8wgsPqUapmb2a5QXY75aFq7uhlmBmmfIxUpbNyrTnaheOygBU5y58_ZksrMyGQo-d31aEfR4oTa13gWEp4OA8PlsHJrTCB6Q9n5hfY7gw',
    selected: false,
  },
]
</script>
