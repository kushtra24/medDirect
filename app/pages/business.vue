<template>
  <div class="bg-surface font-body-md text-on-surface selection:bg-secondary-container min-h-dvh flex flex-col">
    <nav
      class="fixed top-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none"
    >
      <div class="flex justify-between items-center max-w-7xl mx-auto px-6 h-20 gap-4">
        <div class="text-xl font-bold tracking-tighter text-blue-900 dark:text-white font-h2 shrink-0">
          {{ t('businessLanding.nav.brand') }}
        </div>
        <div class="hidden md:flex items-center gap-8">
          <a
            class="font-manrope text-sm font-semibold tracking-tight text-blue-700 dark:text-blue-300 border-b-2 border-blue-700 pb-1"
            href="#services"
          >{{ t('businessLanding.nav.services') }}</a>
          <a
            class="font-manrope text-sm font-semibold tracking-tight text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors duration-200"
            href="#benefits"
          >{{ t('businessLanding.nav.benefits') }}</a>
          <a
            class="font-manrope text-sm font-semibold tracking-tight text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors duration-200"
            href="#case-studies"
          >{{ t('businessLanding.nav.caseStudies') }}</a>
          <a
            class="font-manrope text-sm font-semibold tracking-tight text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors duration-200"
            href="#pricing"
          >{{ t('businessLanding.nav.pricing') }}</a>
        </div>
        <div class="flex items-center gap-2 sm:gap-4 shrink-0">
          <NuxtLink
            to="/auth/login"
            class="px-4 sm:px-5 py-2.5 font-button text-button rounded-lg text-secondary border border-secondary hover:bg-secondary/5 transition-all text-center whitespace-nowrap"
          >
            {{ t('businessLanding.nav.partnerLogin') }}
          </NuxtLink>
          <NuxtLink
            to="/auth/signup"
            class="inline-flex px-4 sm:px-5 py-2.5 font-button text-button rounded-lg bg-secondary text-white hover:bg-on-secondary-fixed-variant transition-all shadow-sm text-center whitespace-nowrap items-center justify-center"
          >
            {{ t('businessLanding.nav.getStarted') }}
          </NuxtLink>
        </div>
      </div>
    </nav>

    <main class="pt-20 flex-1">
      <!-- Hero -->
      <section class="relative overflow-hidden bg-surface-container-lowest py-24 md:py-32">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="z-10">
            <span
              class="inline-block py-1 px-3 mb-6 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps"
            >
              {{ t('businessLanding.hero.badge') }}
            </span>
            <h1 class="font-h1 text-h1 text-on-background mb-6 leading-tight">
              {{ t('businessLanding.hero.titleBefore') }}
              <span class="text-secondary">{{ t('businessLanding.hero.titleAccent') }}</span>
            </h1>
            <p class="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg">
              {{ t('businessLanding.hero.description') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink
                to="/auth/signup"
                class="px-8 py-4 bg-secondary text-white font-button text-button rounded-xl hover:shadow-lg transition-all text-center"
              >
                {{ t('businessLanding.hero.signUpFree') }}
              </NuxtLink>
              <button
                type="button"
                class="px-8 py-4 bg-surface-container text-on-surface font-button text-button rounded-xl border border-outline-variant hover:bg-surface-container-high transition-all flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon="circle-play" class="text-xl" aria-hidden="true" />
                {{ t('businessLanding.hero.viewDemo') }}
              </button>
            </div>
          </div>
          <div class="relative">
            <div class="absolute -top-12 -right-12 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            <div class="relative rounded-2xl border border-outline-variant overflow-hidden shadow-2xl">
              <img
                class="w-full h-full object-cover"
                :alt="t('businessLanding.hero.heroImgAlt')"
                :src="IMG_HERO"
                width="800"
                height="600"
              />
              <div
                class="absolute bottom-6 right-6 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg border border-outline shadow-lg flex items-center gap-3 max-w-[calc(100%-3rem)]"
              >
                <div class="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-white shrink-0">
                  <FontAwesomeIcon icon="circle-check" aria-hidden="true" />
                </div>
                <div class="min-w-0">
                  <p class="text-xs font-bold text-on-background">{{ t('businessLanding.hero.floatTitle') }}</p>
                  <p class="text-[10px] text-on-surface-variant">{{ t('businessLanding.hero.floatSubtitle') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services -->
      <section id="services" class="scroll-mt-24 py-24 bg-surface-bright">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="font-h2 text-h2 text-on-background mb-4">{{ t('businessLanding.services.sectionTitle') }}</h2>
            <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              {{ t('businessLanding.services.sectionSubtitle') }}
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              class="col-span-1 md:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-8 items-center"
            >
              <div class="flex-1 order-2 md:order-1 min-w-0">
                <div class="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                  <FontAwesomeIcon :icon="['fas', 'qrcode']" class="text-2xl" aria-hidden="true" />
                </div>
                <h3 class="font-h3 text-h3 text-on-background mb-3">{{ t('businessLanding.services.portalTitle') }}</h3>
                <p class="font-body-md text-body-md text-on-surface-variant mb-6">
                  {{ t('businessLanding.services.portalBody') }}
                </p>
                <a class="text-secondary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all" href="#">
                  {{ t('businessLanding.services.learnMore') }}
                  <FontAwesomeIcon icon="arrow-right" aria-hidden="true" />
                </a>
              </div>
              <div class="flex-1 order-1 md:order-2 bg-surface-container-low rounded-lg p-4 w-full">
                <div class="aspect-video bg-white dark:bg-slate-800 rounded border border-outline-variant flex items-center justify-center p-4">
                  <img
                    class="rounded shadow-sm max-h-full w-auto object-contain"
                    :alt="t('businessLanding.hero.thumbAlt')"
                    :src="IMG_THUMB"
                    width="640"
                    height="360"
                  />
                </div>
              </div>
            </div>

            <div
              class="col-span-1 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div class="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary mb-6">
                  <FontAwesomeIcon icon="gauge-high" class="text-2xl" aria-hidden="true" />
                </div>
                <h3 class="font-h3 text-h3 text-on-background mb-3">{{ t('businessLanding.services.labTitle') }}</h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant">{{ t('businessLanding.services.labBody') }}</p>
              </div>
              <div class="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <div class="flex -space-x-2" aria-hidden="true">
                  <div class="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200" />
                  <div class="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-300" />
                  <div class="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-400" />
                </div>
                <span class="text-xs text-on-surface-variant font-medium">{{ t('businessLanding.services.labsActive') }}</span>
              </div>
            </div>

            <div
              id="case-studies"
              class="scroll-mt-24 col-span-1 md:col-span-3 bg-secondary text-white p-10 rounded-xl flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative"
            >
              <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 pointer-events-none" aria-hidden="true" />
              <div class="z-10 max-w-xl">
                <h3 class="font-h3 text-h3 mb-4">{{ t('businessLanding.services.visibilityTitle') }}</h3>
                <p class="font-body-md text-body-md text-secondary-container mb-6 opacity-90">
                  {{ t('businessLanding.services.visibilityBody') }}
                </p>
                <button
                  type="button"
                  class="px-6 py-3 bg-white text-secondary font-button text-button rounded-lg hover:bg-secondary-container transition-colors"
                >
                  {{ t('businessLanding.services.visibilityCta') }}
                </button>
              </div>
              <div class="z-10 w-full md:w-auto">
                <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 rounded-lg bg-white/20 shrink-0" />
                    <div class="space-y-2 flex-1">
                      <div class="h-4 w-32 bg-white/30 rounded max-w-full" />
                      <div class="h-3 w-20 bg-white/20 rounded" />
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="h-16 bg-white/5 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon="star" class="text-white/50 text-xl" aria-hidden="true" />
                    </div>
                    <div class="h-16 bg-white/5 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon="location-dot" class="text-white/50 text-xl" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits -->
      <section id="benefits" class="scroll-mt-24 py-24 bg-surface">
        <div class="max-w-7xl mx-auto px-6">
          <div class="mb-16">
            <span class="text-tertiary font-label-caps text-label-caps uppercase tracking-widest">{{
              t('businessLanding.benefits.label')
            }}</span>
            <h2 class="font-h2 text-h2 text-on-background mt-2">{{ t('businessLanding.benefits.title') }}</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div class="group">
              <div
                class="mb-6 inline-flex p-4 bg-white dark:bg-slate-900 border border-outline-variant rounded-2xl group-hover:border-tertiary transition-colors"
              >
                <FontAwesomeIcon icon="user-check" class="text-tertiary text-3xl" aria-hidden="true" />
              </div>
              <h4 class="font-h3 text-h3 text-on-background mb-4">{{ t('businessLanding.benefits.secureTitle') }}</h4>
              <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {{ t('businessLanding.benefits.secureBody') }}
              </p>
            </div>
            <div class="group">
              <div
                class="mb-6 inline-flex p-4 bg-white dark:bg-slate-900 border border-outline-variant rounded-2xl group-hover:border-tertiary transition-colors"
              >
                <FontAwesomeIcon icon="bolt" class="text-tertiary text-3xl" aria-hidden="true" />
              </div>
              <h4 class="font-h3 text-h3 text-on-background mb-4">{{ t('businessLanding.benefits.efficientTitle') }}</h4>
              <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {{ t('businessLanding.benefits.efficientBody') }}
              </p>
            </div>
            <div class="group">
              <div
                class="mb-6 inline-flex p-4 bg-white dark:bg-slate-900 border border-outline-variant rounded-2xl group-hover:border-tertiary transition-colors"
              >
                <FontAwesomeIcon icon="face-smile" class="text-tertiary text-3xl" aria-hidden="true" />
              </div>
              <h4 class="font-h3 text-h3 text-on-background mb-4">{{ t('businessLanding.benefits.trustTitle') }}</h4>
              <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {{ t('businessLanding.benefits.trustBody') }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section id="pricing" class="scroll-mt-24 py-24 bg-white dark:bg-slate-900">
        <div class="max-w-7xl mx-auto px-6">
          <div
            class="bg-surface-container-low dark:bg-slate-800 rounded-[2rem] p-12 md:p-20 text-center border border-outline-variant relative overflow-hidden"
          >
            <div class="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
              <div
                class="absolute top-0 left-0 w-full h-full"
                style="background-image: radial-gradient(circle at 2px 2px, #3a5f94 1px, transparent 0); background-size: 40px 40px;"
              />
            </div>
            <div class="relative z-10">
              <h2 class="font-h1 text-h1 text-on-background mb-6">{{ t('businessLanding.cta.title') }}</h2>
              <p class="font-h3 text-h3 text-tertiary mb-10">{{ t('businessLanding.cta.subtitle') }}</p>
              <div class="flex flex-col sm:flex-row justify-center gap-6">
                <NuxtLink
                  to="/auth/signup"
                  class="px-10 py-5 bg-secondary text-white font-button text-button rounded-xl hover:scale-105 transition-all shadow-xl text-center"
                >
                  {{ t('businessLanding.cta.signUp') }}
                </NuxtLink>
                <button
                  type="button"
                  class="px-10 py-5 bg-white dark:bg-slate-900 text-on-surface font-button text-button rounded-xl border border-outline-variant hover:bg-surface-container transition-all"
                >
                  {{ t('businessLanding.cta.contactSales') }}
                </button>
              </div>
              <p class="mt-8 text-xs font-medium text-on-surface-variant uppercase tracking-widest">
                {{ t('businessLanding.cta.disclaimer') }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-slate-50 dark:bg-slate-950 w-full py-12 border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        <div class="col-span-1 md:col-span-1">
          <div class="text-lg font-bold text-blue-900 dark:text-white mb-6">{{ t('businessLanding.footer.brand') }}</div>
          <p class="font-manrope text-xs font-normal text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
            {{ t('businessLanding.footer.tagline') }}
          </p>
        </div>
        <div class="space-y-4">
          <h5 class="text-on-background font-bold text-sm">{{ t('businessLanding.footer.productTitle') }}</h5>
          <ul class="space-y-2">
            <li><a class="font-manrope text-xs text-slate-500 hover:text-blue-900 dark:hover:text-blue-300 transition-colors" href="#">{{ t('businessLanding.footer.productLabs') }}</a></li>
            <li><a class="font-manrope text-xs text-slate-500 hover:text-blue-900 dark:hover:text-blue-300 transition-colors" href="#">{{ t('businessLanding.footer.productClinics') }}</a></li>
            <li><a class="font-manrope text-xs text-slate-500 hover:text-blue-900 dark:hover:text-blue-300 transition-colors" href="#">{{ t('businessLanding.footer.productSecurity') }}</a></li>
          </ul>
        </div>
        <div class="space-y-4">
          <h5 class="text-on-background font-bold text-sm">{{ t('businessLanding.footer.companyTitle') }}</h5>
          <ul class="space-y-2">
            <li><a class="font-manrope text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">{{ t('businessLanding.footer.privacy') }}</a></li>
            <li><a class="font-manrope text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">{{ t('businessLanding.footer.terms') }}</a></li>
            <li><a class="font-manrope text-xs text-teal-600 dark:text-teal-400 font-medium hover:underline" href="#">{{ t('businessLanding.footer.hipaa') }}</a></li>
          </ul>
        </div>
        <div class="space-y-4">
          <h5 class="text-on-background font-bold text-sm">{{ t('businessLanding.footer.supportTitle') }}</h5>
          <ul class="space-y-2">
            <li><a class="font-manrope text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">{{ t('businessLanding.footer.contactSupport') }}</a></li>
            <li><a class="font-manrope text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">{{ t('businessLanding.footer.providerPortal') }}</a></li>
            <li><a class="font-manrope text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">{{ t('businessLanding.footer.systemStatus') }}</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="font-manrope text-xs font-normal text-slate-500 dark:text-slate-400 text-center md:text-start">
          {{ t('businessLanding.footer.copyright', { year: copyrightYear }) }}
        </p>
        <div class="flex gap-6">
          <a class="text-slate-400 hover:text-blue-900 dark:hover:text-blue-300" href="#" :aria-label="t('businessLanding.footer.socialAriaWeb')">
            <FontAwesomeIcon icon="earth-americas" class="text-sm" />
          </a>
          <a class="text-slate-400 hover:text-blue-900 dark:hover:text-blue-300" href="#" :aria-label="t('businessLanding.footer.socialAriaMail')">
            <FontAwesomeIcon icon="envelope" class="text-sm" />
          </a>
          <a class="text-slate-400 hover:text-blue-900 dark:hover:text-blue-300" href="#" :aria-label="t('businessLanding.footer.socialAriaShare')">
            <FontAwesomeIcon icon="share-nodes" class="text-sm" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const { t } = useI18n()

const IMG_HERO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCmpIKd5it9sJrQswodQhvB0xa6xQR_IulcwdsYbhfIYWN3AG2TL1NNVII1x-bNKP-gwUUMicwTcMa9vWsM3HyNWZy5NRwTLu4a9LeFHzs2VEZ9z30yXqtvoP8SpUixcHRv91GNGxQ5beJlLS6BSqc_YAIGXIVia1PfXSfb390Fe5NusNy7bFrFsPm8DtA12cDfqWQQOa_lHOmkpBpIeshYUWcuLuMSWa9IR9PVhnRXO4q2qhN1Z6nuMy-ig1GK7i2snneA47ONfxQ'

const IMG_THUMB =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC7OBfZkMkG9-fBkYrvLmuoOzLxes6JDafIlWgQv3J7YeBXU_6AqYYZmslRlQSLOYk0soX-3ny3R6susMUDBI0Yoxt8I3B8qFsbHSuIrR5fVuZXDx_g0KFryeovS_diifLzEBrnrTmgASSGx0juQVBNqmxTb2qL6k3MA7Q1s70KrvHewpfxqbjJNmHJDlj5bzOIMQL0A9TU9Y2RClhuMBoDj1IA_6tCXyTu-I3Mp8wsBQT-ylI5QWDjinxn_TXNx29goSgLCfaLJZg'

const copyrightYear = new Date().getFullYear()

useSeoMeta({
  title: () => t('businessLanding.seoTitle'),
})
</script>
