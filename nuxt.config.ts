// https://nuxt.com/docs/api/configuration/nuxt-config
const apiProxyTarget = process.env.NUXT_API_PROXY_TARGET || 'http://127.0.0.1:8000'

export default defineNuxtConfig({
  routeRules: {
    '/home': { redirect: '/' },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  runtimeConfig: {
    public: {
      /**
       * Laravel API origin. Leave empty in dev to call `/api/*` via the Vite proxy (no CORS).
       * Set e.g. `http://localhost:8000` only when not using the proxy.
       */
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? '',
    },
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: false,
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json', dir: 'ltr' },
      { code: 'ar', language: 'ar', name: 'Arabic', file: 'ar.json', dir: 'rtl' },
      { code: 'ku', language: 'ku', name: 'Kurdish', file: 'ku.json', dir: 'rtl' },
    ],
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
        },
      },
    },
    optimizeDeps: {
      include: [
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/vue-fontawesome',
        '@fortawesome/free-solid-svg-icons',
        'vue-i18n',
      ],
    },
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700',
        },
      ],
    },
  },
})
