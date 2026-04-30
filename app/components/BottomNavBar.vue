<template>
  <nav
    class="fixed bottom-0 left-0 right-0 w-full h-16 flex justify-around items-center px-4 pb-safe md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50"
  >
    <NuxtLink
      v-for="item in navItems"
      :key="item.label"
      :to="item.to"
      class="flex flex-col items-center justify-center gap-1 transition-transform duration-300 ease-in-out px-4 py-1"
      :aria-current="item.active ? 'page' : undefined"
      :class="item.active
        ? 'text-blue-900 dark:text-blue-400 scale-110'
        : 'text-slate-400 dark:text-slate-500 active:bg-slate-50 dark:active:bg-slate-800'"
    >
      <FontAwesomeIcon :icon="item.icon" class="text-xl" />
      <span class="text-[10px] font-semibold uppercase tracking-wider">{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup>
const { t } = useI18n()
const route = useRoute()

const navItems = computed(() => {
  const path = route.path
  return [
    { label: t('nav.home'), icon: ['fas', 'house'], to: '/', active: path === '/' || path === '/home' },
    { label: t('nav.search'), icon: ['fas', 'magnifying-glass'], to: '/search-results', active: path.startsWith('/search-results') },
    { label: t('nav.profile'), icon: ['fas', 'circle-user'], to: '/profile', active: path.startsWith('/profile') },
  ]
})
</script>
