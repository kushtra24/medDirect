<template>
  <nav
    class="fixed bottom-0 left-0 right-0 w-full h-16 flex justify-around items-center px-4 pb-safe md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50"
  >
    <AppButton
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
    </AppButton>
  </nav>
</template>

<script setup>
import { isControlPanelRole } from '~/composables/useMedDirectApi'

const { t } = useI18n()
const route = useRoute()
const { user } = useMedDirectApi()

const profileTo = computed(() =>
  isControlPanelRole(user.value?.role) ? '/control-panel' : '/profile',
)

const navItems = computed(() => {
  const path = route.path
  const isStaff = isControlPanelRole(user.value?.role)
  return [
    { label: t('nav.home'), icon: ['fas', 'house'], to: '/', active: path === '/' },
    { label: t('nav.search'), icon: ['fas', 'magnifying-glass'], to: '/search-results', active: path.startsWith('/search-results') },
    {
      label: isStaff ? t('nav.ControlPanel') : t('nav.profile'),
      icon: ['fas', 'circle-user'],
      to: profileTo.value,
      active: isStaff ? path.startsWith('/control-panel') : path.startsWith('/profile'),
    },
  ]
})
</script>
