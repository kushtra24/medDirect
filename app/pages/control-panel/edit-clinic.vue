<template>
  <div class="bg-surface font-body-md text-on-surface min-h-dvh flex flex-col">
    <ControlPanelHeader />

    <main class="flex-1 flex flex-col min-h-0">
      <div class="p-lg max-w-container-max mx-auto w-full flex-1">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-xl">
          <div>
            <h2 class="font-h2 text-h2 text-blue-900 dark:text-blue-300 mb-xs">{{ t('editClinicPage.title') }}</h2>
            <p class="font-body-md text-body-md text-on-surface-variant">{{ t('editClinicPage.subtitle') }}</p>
          </div>
          <div class="flex flex-col items-end gap-xs shrink-0">
            <div class="flex gap-md">
              <AppButton
                type="button"
                class="px-lg py-sm bg-white dark:bg-slate-900 border border-outline-variant text-on-surface font-button text-button rounded-xl hover:bg-surface-container dark:hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <FontAwesomeIcon icon="upload" class="text-xl" aria-hidden="true" />
                {{ t('editClinicPage.requestPublish') }}
              </AppButton>
              <AppButton
                type="button"
                class="px-lg py-sm bg-tertiary text-on-tertiary font-button text-button rounded-xl shadow-md hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-60"
                :disabled="saving || loading"
                @click="saveProfile"
              >
                <FontAwesomeIcon v-if="saving" icon="arrows-rotate" class="text-xl animate-spin" aria-hidden="true" />
                <FontAwesomeIcon v-else icon="save" class="text-xl" aria-hidden="true" />
                {{ saving ? t('editClinicPage.saving') : t('editClinicPage.saveChanges') }}
              </AppButton>
            </div>
            <p v-if="saveError" class="text-error text-body-sm" role="alert">{{ saveError }}</p>
            <p v-if="saveSuccess" class="text-green-700 dark:text-green-400 text-body-sm flex items-center gap-1">
              <FontAwesomeIcon icon="circle-check" aria-hidden="true" />
              {{ t('editClinicPage.saved') }}
            </p>
          </div>
        </div>

        <p v-if="loading" class="text-on-surface-variant font-body-md">{{ t('editClinicPage.loading') }}</p>
        <p v-else-if="loadError" class="text-error text-body-sm" role="alert">{{ loadError }}</p>

        <div v-else class="grid grid-cols-12 gap-lg">
          <div class="col-span-12 lg:col-span-8 flex flex-col gap-lg">
            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="circle-info" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('editClinicPage.basicInfo.sectionTitle') }}</h3>
              </div>
              <div class="space-y-md">
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs" for="clinic-name">{{
                    t('editClinicPage.basicInfo.name')
                  }}</label>
                  <input
                    id="clinic-name"
                    v-model="form.name"
                    class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all bg-white dark:bg-slate-950 dark:border-slate-700"
                    type="text"
                    :placeholder="t('editClinicPage.basicInfo.namePlaceholder')"
                  >
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs" for="clinic-description">{{
                    t('editClinicPage.basicInfo.description')
                  }}</label>
                  <div
                    class="w-full rounded-lg border border-outline-variant focus-within:border-tertiary focus-within:ring-1 focus-within:ring-tertiary transition-all overflow-hidden bg-white dark:bg-slate-950 dark:border-slate-700"
                  >
                    <div class="flex items-center gap-1 p-2 border-b border-outline-variant bg-surface-container-low dark:bg-slate-800 flex-wrap">
                      <AppButton type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('editClinicPage.editor.bold')">
                        <FontAwesomeIcon icon="bold" class="text-[18px]" aria-hidden="true" />
                      </AppButton>
                      <AppButton type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('editClinicPage.editor.italic')">
                        <FontAwesomeIcon icon="italic" class="text-[18px]" aria-hidden="true" />
                      </AppButton>
                      <AppButton type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('editClinicPage.editor.underline')">
                        <FontAwesomeIcon icon="underline" class="text-[18px]" aria-hidden="true" />
                      </AppButton>
                      <div class="w-px h-4 bg-outline-variant mx-1" aria-hidden="true" />
                      <AppButton type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('editClinicPage.editor.bulletList')">
                        <FontAwesomeIcon icon="list-ul" class="text-[18px]" aria-hidden="true" />
                      </AppButton>
                      <AppButton type="button" class="p-1 hover:bg-surface-variant dark:hover:bg-slate-700 rounded text-on-surface-variant transition-colors" :title="t('editClinicPage.editor.numberedList')">
                        <FontAwesomeIcon icon="list-ol" class="text-[18px]" aria-hidden="true" />
                      </AppButton>
                    </div>
                    <textarea
                      id="clinic-description"
                      v-model="form.description"
                      class="w-full px-md py-sm border-none focus:ring-0 outline-none resize-none min-h-[160px] bg-transparent text-on-surface"
                      :placeholder="t('editClinicPage.basicInfo.descriptionPlaceholder')"
                      rows="6"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="palette" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('editClinicPage.branding.sectionTitle') }}</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-lg mb-lg">
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('editClinicPage.branding.clinicLogo')
                  }}</label>
                  <input ref="logoInputRef" type="file" accept="image/png,image/svg+xml,image/jpeg,image/webp" class="sr-only" @change="onLogoSelected">
                  <div
                    v-if="!logo"
                    class="border-2 border-dashed border-outline-variant rounded-xl p-xl flex flex-col items-center justify-center bg-surface-container-lowest dark:bg-slate-950 hover:bg-surface-container-low dark:hover:bg-slate-800 transition-all cursor-pointer group"
                    role="button"
                    tabindex="0"
                    @click="logoInputRef?.click()"
                    @keydown.enter="logoInputRef?.click()"
                  >
                    <FontAwesomeIcon
                      :icon="logoUploading ? 'arrows-rotate' : 'images'"
                      :class="['text-outline-variant group-hover:text-tertiary text-4xl mb-sm transition-colors', logoUploading && 'animate-spin']"
                      aria-hidden="true"
                    />
                    <p class="text-body-sm font-body-sm text-on-surface-variant text-center">
                      {{ t('editClinicPage.branding.logoDrop') }}
                      <span class="text-tertiary font-bold underline">{{ t('editClinicPage.branding.browse') }}</span>
                    </p>
                    <p class="text-[10px] text-outline mt-xs uppercase">{{ t('editClinicPage.branding.logoFormats') }}</p>
                  </div>
                  <div v-else class="relative rounded-xl overflow-hidden border border-outline-variant bg-surface-container-lowest dark:bg-slate-950 h-[172px] flex items-center justify-center p-md group">
                    <img :src="logo.url" :alt="t('editClinicPage.branding.clinicLogo')" class="max-h-full max-w-full object-contain">
                    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-sm">
                      <AppButton type="button" class="px-md py-xs rounded-full bg-white/90 text-xs font-bold text-blue-900" @click="logoInputRef?.click()">
                        {{ t('editClinicPage.branding.replace') }}
                      </AppButton>
                      <AppButton type="button" class="px-md py-xs rounded-full bg-white/90 text-xs font-bold text-error" @click="deleteImage(logo, 'logo')">
                        {{ t('editClinicPage.branding.remove') }}
                      </AppButton>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('editClinicPage.branding.featuredImage')
                  }}</label>
                  <input ref="featuredInputRef" type="file" accept="image/jpeg,image/png,image/webp" class="sr-only" @change="onFeaturedSelected">
                  <div
                    v-if="!featuredImage"
                    class="border-2 border-dashed border-outline-variant rounded-xl p-xl flex flex-col items-center justify-center bg-surface-container-lowest dark:bg-slate-950 hover:bg-surface-container-low dark:hover:bg-slate-800 transition-all cursor-pointer group"
                    role="button"
                    tabindex="0"
                    @click="featuredInputRef?.click()"
                    @keydown.enter="featuredInputRef?.click()"
                  >
                    <FontAwesomeIcon
                      :icon="featuredUploading ? 'arrows-rotate' : 'cloud-arrow-up'"
                      :class="['text-outline-variant group-hover:text-tertiary text-4xl mb-sm transition-colors', featuredUploading && 'animate-spin']"
                      aria-hidden="true"
                    />
                    <p class="text-body-sm font-body-sm text-on-surface-variant text-center">
                      {{ t('editClinicPage.branding.coverDrop') }}
                      <span class="text-tertiary font-bold underline">{{ t('editClinicPage.branding.select') }}</span>
                    </p>
                    <p class="text-[10px] text-outline mt-xs uppercase">{{ t('editClinicPage.branding.coverFormats') }}</p>
                  </div>
                  <div v-else class="relative rounded-xl overflow-hidden border border-outline-variant bg-surface-container-lowest dark:bg-slate-950 h-[172px] group">
                    <img :src="featuredImage.url" :alt="t('editClinicPage.branding.featuredImage')" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-sm">
                      <AppButton type="button" class="px-md py-xs rounded-full bg-white/90 text-xs font-bold text-blue-900" @click="featuredInputRef?.click()">
                        {{ t('editClinicPage.branding.replace') }}
                      </AppButton>
                      <AppButton type="button" class="px-md py-xs rounded-full bg-white/90 text-xs font-bold text-error" @click="deleteImage(featuredImage, 'featured')">
                        {{ t('editClinicPage.branding.remove') }}
                      </AppButton>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                  t('editClinicPage.branding.gallery')
                }}</label>
                <p class="text-body-sm text-on-surface-variant mb-sm">{{ t('editClinicPage.branding.gallerySubtitle') }}</p>
                <input ref="galleryInputRef" type="file" accept="image/jpeg,image/png,image/webp" class="sr-only" @change="onGallerySelected">
                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-sm">
                  <div
                    v-for="photo in gallery"
                    :key="photo.id"
                    class="relative rounded-lg overflow-hidden border border-outline-variant aspect-square group"
                  >
                    <img :src="photo.url" :alt="t('editClinicPage.branding.galleryPhotoAlt')" class="w-full h-full object-cover">
                    <AppButton
                      type="button"
                      class="absolute top-1 end-1 h-6 w-6 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      :aria-label="t('editClinicPage.branding.removePhotoAria')"
                      @click="deleteImage(photo, 'gallery')"
                    >
                      <FontAwesomeIcon icon="xmark" class="text-xs" aria-hidden="true" />
                    </AppButton>
                  </div>
                  <div
                    class="aspect-square rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-1 text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-slate-800 cursor-pointer transition-all"
                    role="button"
                    tabindex="0"
                    @click="galleryInputRef?.click()"
                    @keydown.enter="galleryInputRef?.click()"
                  >
                    <FontAwesomeIcon :icon="galleryUploading ? 'arrows-rotate' : 'plus'" :class="galleryUploading && 'animate-spin'" aria-hidden="true" />
                    <span class="text-[10px] font-bold uppercase">{{ t('editClinicPage.branding.addPhoto') }}</span>
                  </div>
                </div>
              </div>
              <p v-if="brandingError" class="mt-sm text-error text-body-sm" role="alert">{{ brandingError }}</p>
            </section>

            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="universal-access" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('editClinicPage.operations.sectionTitle') }}</h3>
              </div>
              <div class="space-y-md">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div>
                    <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                      t('editClinicPage.operations.coreServices')
                    }}</label>
                    <AppButton
                      type="button"
                      class="w-full px-md py-sm rounded-lg border border-outline-variant hover:border-tertiary transition-all bg-white dark:bg-slate-950 dark:border-slate-700 flex items-center justify-between gap-2 text-start"
                      @click="servicesModalOpen = true"
                    >
                      <span class="flex-1 min-w-0 truncate text-body-sm">
                        {{ selectedServices.length ? selectedServices.map((s) => s.name).join(', ') : t('editClinicPage.operations.selectServices') }}
                      </span>
                      <FontAwesomeIcon icon="chevron-down" class="text-outline text-xs shrink-0" aria-hidden="true" />
                    </AppButton>
                  </div>
                  <div>
                    <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                      t('editClinicPage.operations.certifications')
                    }}</label>
                    <div class="flex flex-wrap gap-xs p-xs border border-outline-variant rounded-lg min-h-[42px] items-center bg-white dark:bg-slate-950 dark:border-slate-700 mb-xs">
                      <span
                        v-for="cert in diplomas"
                        :key="cert"
                        class="bg-secondary-container text-on-secondary-container px-sm py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      >{{ cert }}
                        <AppButton type="button" class="inline-flex" :aria-label="t('editClinicPage.operations.removeCertAria')" @click="removeCertification(cert)">
                          <FontAwesomeIcon icon="xmark" class="text-[14px] cursor-pointer" aria-hidden="true" />
                        </AppButton>
                      </span>
                      <span v-if="!diplomas.length" class="text-xs text-on-surface-variant px-1">{{ t('editClinicPage.operations.noCertifications') }}</span>
                    </div>
                    <div class="flex gap-xs">
                      <input
                        v-model="newCertification"
                        class="flex-1 min-w-0 border border-outline-variant rounded-lg px-sm py-1 text-xs bg-white dark:bg-slate-950 dark:border-slate-700 focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none"
                        type="text"
                        :placeholder="t('editClinicPage.operations.addCertPlaceholder')"
                        @keydown.enter.prevent="addCertification"
                      >
                      <AppButton
                        type="button"
                        class="px-sm py-1 rounded-lg bg-tertiary text-on-tertiary text-xs font-bold hover:opacity-90 transition-opacity shrink-0"
                        @click="addCertification"
                      >
                        {{ t('editClinicPage.operations.addCertButton') }}
                      </AppButton>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                    t('editClinicPage.operations.openingHours')
                  }}</label>
                  <div class="grid grid-cols-7 gap-xs overflow-x-auto pb-1">
                    <button
                      v-for="day in openingHours"
                      :key="day.day"
                      type="button"
                      class="p-sm rounded-lg text-center min-w-[72px] transition-colors"
                      :class="day.closed
                        ? 'bg-surface-variant dark:bg-slate-900 hover:bg-surface-container-low'
                        : 'bg-surface-container dark:bg-slate-800 hover:bg-surface-container-low dark:hover:bg-slate-700'"
                      @click="openHoursModal(day.day)"
                    >
                      <span class="block text-[10px] font-bold mb-xs" :class="day.closed ? 'text-outline' : 'text-on-surface-variant'">
                        {{ t(`editClinicPage.operations.days.${day.day}`) }}
                      </span>
                      <span v-if="day.closed" class="text-xs font-bold text-outline">{{ t('editClinicPage.operations.closed') }}</span>
                      <template v-else>
                        <span class="block font-semibold text-xs mb-1 text-on-surface">{{ day.open }}</span>
                        <span class="block font-semibold text-xs text-on-surface">{{ day.close }}</span>
                      </template>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="id-badge" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('editClinicPage.team.sectionTitle') }}</h3>
              </div>
              <p class="text-body-sm text-on-surface-variant mb-lg">{{ t('editClinicPage.team.subtitle') }}</p>

              <div v-if="teamMembers.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-md mb-lg">
                <div v-for="member in teamMembers" :key="member.id" class="relative group text-center">
                  <div class="h-20 w-20 mx-auto rounded-full overflow-hidden border border-outline-variant bg-surface-container-lowest dark:bg-slate-950 flex items-center justify-center mb-xs">
                    <img v-if="member.image_url" :src="member.image_url" :alt="member.name" class="w-full h-full object-cover">
                    <FontAwesomeIcon v-else icon="user" class="text-outline-variant text-2xl" aria-hidden="true" />
                  </div>
                  <p class="font-body-sm font-semibold text-on-surface truncate">{{ member.name }}</p>
                  <p class="text-xs text-on-surface-variant truncate">{{ member.title || t('editClinicPage.team.noTitle') }}</p>
                  <AppButton
                    type="button"
                    class="absolute top-0 end-2 h-6 w-6 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-outline-variant text-error opacity-0 group-hover:opacity-100 transition-opacity"
                    :aria-label="t('editClinicPage.team.removeAria')"
                    @click="removeTeamMember(member)"
                  >
                    <FontAwesomeIcon icon="xmark" class="text-xs" aria-hidden="true" />
                  </AppButton>
                </div>
              </div>

              <div class="border-t border-outline-variant dark:border-slate-800 pt-lg">
                <p class="font-label-caps text-label-caps text-on-surface-variant mb-sm">{{ t('editClinicPage.team.addTitle') }}</p>
                <div class="grid grid-cols-1 sm:grid-cols-[auto_1fr_1fr_auto] gap-sm items-center">
                  <input ref="memberImageInputRef" type="file" accept="image/jpeg,image/png,image/webp" class="sr-only" @change="onMemberImageSelected">
                  <div
                    class="h-11 w-11 rounded-full overflow-hidden border border-dashed border-outline-variant bg-surface-container-lowest dark:bg-slate-950 flex items-center justify-center cursor-pointer shrink-0"
                    role="button"
                    tabindex="0"
                    :title="t('editClinicPage.team.photoAria')"
                    @click="memberImageInputRef?.click()"
                    @keydown.enter="memberImageInputRef?.click()"
                  >
                    <img v-if="newMemberImagePreviewUrl" :src="newMemberImagePreviewUrl" alt="" class="w-full h-full object-cover">
                    <FontAwesomeIcon v-else icon="camera" class="text-outline-variant text-sm" aria-hidden="true" />
                  </div>
                  <input
                    v-model="newMemberName"
                    class="px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all bg-white dark:bg-slate-950 dark:border-slate-700 text-sm"
                    type="text"
                    :placeholder="t('editClinicPage.team.namePlaceholder')"
                  >
                  <input
                    v-model="newMemberTitle"
                    class="px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all bg-white dark:bg-slate-950 dark:border-slate-700 text-sm"
                    type="text"
                    :placeholder="t('editClinicPage.team.titlePlaceholder')"
                  >
                  <AppButton
                    type="button"
                    class="px-lg py-sm rounded-lg bg-tertiary text-on-tertiary font-button text-body-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                    :disabled="addingMember || !newMemberName.trim()"
                    @click="addTeamMember"
                  >
                    <FontAwesomeIcon :icon="addingMember ? 'arrows-rotate' : 'user-plus'" :class="addingMember && 'animate-spin'" aria-hidden="true" />
                    {{ t('editClinicPage.team.add') }}
                  </AppButton>
                </div>
                <p v-if="memberError" class="mt-sm text-error text-body-sm" role="alert">{{ memberError }}</p>
              </div>
            </section>
          </div>

          <div class="col-span-12 lg:col-span-4 flex flex-col gap-lg">
            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="user-shield" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('editClinicPage.status.sectionTitle') }}</h3>
              </div>
              <div class="space-y-lg">
                <div
                  v-if="certified"
                  class="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-lg p-md flex items-start gap-md"
                >
                  <FontAwesomeIcon icon="circle-check" class="text-green-600 text-xl shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p class="text-sm font-bold text-green-800 dark:text-green-300">{{ t('editClinicPage.status.verifiedTitle') }}</p>
                    <p class="text-[11px] text-green-700 dark:text-green-400 leading-tight mt-1">
                      {{ t('editClinicPage.status.verifiedBody', { regNumber: t('editClinicPage.status.regNumber') }) }}
                    </p>
                  </div>
                </div>
                <div v-else class="bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800 rounded-lg p-md flex items-start gap-md">
                  <FontAwesomeIcon icon="circle-info" class="text-yellow-600 text-xl shrink-0 mt-0.5" aria-hidden="true" />
                  <p class="text-sm font-bold text-yellow-800 dark:text-yellow-300">{{ t('editClinicPage.status.unverifiedTitle') }}</p>
                </div>
                <p class="text-body-sm text-on-surface-variant italic">{{ t('editClinicPage.status.reviewNote') }}</p>
              </div>
            </section>

            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="headset" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('editClinicPage.contact.sectionTitle') }}</h3>
              </div>
              <div class="space-y-md">
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs" for="clinic-address">{{
                    t('editClinicPage.contact.address')
                  }}</label>
                  <div class="relative">
                    <textarea
                      id="clinic-address"
                      v-model="form.address"
                      class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all text-sm bg-white dark:bg-slate-950 dark:border-slate-700 pr-10"
                      rows="2"
                      :placeholder="t('editClinicPage.contact.addressPlaceholder')"
                    />
                    <FontAwesomeIcon
                      icon="location-dot"
                      class="absolute right-3 bottom-3 text-outline-variant pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div class="h-32 w-full rounded-lg overflow-hidden border border-outline-variant bg-surface-container relative">
                  <img
                    :alt="t('editClinicPage.contact.mapAlt')"
                    class="w-full h-full object-cover grayscale opacity-60"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwUYmmEeqCYq1fa-Ul0CFeUy0Oo-kj0lrbp2rEi5w0VlmMp64d9cAPg4ddhDt9ekXhOCgPCYpYx-_BuGRCovzJl_JOEWBX1YahDdYQfPtjBz5DurXpZ6aLbeMkgD-W4mxLFuTUlt0mlJUtOu-yS7umOV8WjLzrqJJHd6xlpxfuyUVMhUZu3OoWK06XB95wNQws6eS-wT7Wcwn36lzaDnT9I6_3mWSTtKmLZAmm6G-5rkpLZiPQFlB5OrW3SFj2PWo7YfYokOrONrc"
                  >
                  <div class="absolute inset-0 flex items-center justify-center">
                    <AppButton
                      type="button"
                      class="bg-white/90 dark:bg-slate-900/90 backdrop-blur px-md py-xs rounded-full shadow-sm text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1"
                      @click="openCoordsModal"
                    >
                      <FontAwesomeIcon icon="map" class="text-sm" aria-hidden="true" />
                      {{ hasCoordinates ? t('editClinicPage.contact.coordinatesSet', { lat: form.latitude, lng: form.longitude }) : t('editClinicPage.contact.setCoordinates') }}
                    </AppButton>
                  </div>
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs" for="clinic-mobile">{{
                    t('editClinicPage.contact.mobile')
                  }}</label>
                  <input
                    id="clinic-mobile"
                    v-model="form.phone"
                    class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all text-sm bg-white dark:bg-slate-950 dark:border-slate-700"
                    type="tel"
                    :placeholder="t('editClinicPage.contact.mobilePlaceholder')"
                  >
                </div>
                <div>
                  <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs" for="clinic-email">{{
                    t('editClinicPage.contact.email')
                  }}</label>
                  <input
                    id="clinic-email"
                    v-model="form.email"
                    class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all text-sm bg-white dark:bg-slate-950 dark:border-slate-700"
                    type="email"
                    :placeholder="t('editClinicPage.contact.emailPlaceholder')"
                  >
                </div>
              </div>
            </section>

            <section class="bg-white dark:bg-slate-900 border border-outline-variant shadow-sm p-xl rounded-xl">
              <div class="flex items-center gap-md mb-lg">
                <FontAwesomeIcon icon="language" class="text-tertiary text-xl" aria-hidden="true" />
                <h3 class="font-h3 text-h3 text-blue-900 dark:text-blue-300">{{ t('editClinicPage.languages.sectionTitle') }}</h3>
              </div>
              <div class="space-y-md">
                <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs">{{
                  t('editClinicPage.languages.spoken')
                }}</label>
                <MultiSelectDropdown
                  v-model="languages"
                  :options="languageOptions"
                  :placeholder="t('editClinicPage.languages.placeholder')"
                  :remove-aria="t('editClinicPage.languages.removeLangAria')"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>

    <OpeningHoursModal
      :open="hoursModalOpen"
      :day-label="t(`editClinicPage.operations.days.${hoursModalDay}`)"
      :model-value="hoursModalDayData"
      @update:open="hoursModalOpen = $event"
      @save="saveHours"
    />

    <CareServicesModal
      v-model:open="servicesModalOpen"
      :services="servicesCatalog"
      :model-value="serviceIds"
      @save="(ids) => (serviceIds = ids)"
    />

    <AppModal
      :open="coordsModalOpen"
      :title="t('editClinicPage.contact.coordinatesModal.title')"
      :close-aria="t('editClinicPage.contact.coordinatesModal.closeAria')"
      max-width-class="max-w-sm"
      @update:open="coordsModalOpen = $event"
    >
      <div class="space-y-md">
        <p class="text-body-sm text-on-surface-variant">{{ t('editClinicPage.contact.coordinatesModal.subtitle') }}</p>
        <div class="grid grid-cols-2 gap-md">
          <div>
            <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs" for="coord-lat">{{
              t('editClinicPage.contact.coordinatesModal.latitude')
            }}</label>
            <input
              id="coord-lat"
              v-model="coordsLat"
              type="number"
              step="any"
              class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all bg-white dark:bg-slate-950 dark:border-slate-700"
              placeholder="52.520008"
            >
          </div>
          <div>
            <label class="block font-label-caps text-label-caps text-on-surface-variant mb-xs" for="coord-lng">{{
              t('editClinicPage.contact.coordinatesModal.longitude')
            }}</label>
            <input
              id="coord-lng"
              v-model="coordsLng"
              type="number"
              step="any"
              class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all bg-white dark:bg-slate-950 dark:border-slate-700"
              placeholder="13.404954"
            >
          </div>
        </div>
      </div>
      <template #footer>
        <AppButton
          type="button"
          class="px-lg py-sm rounded-lg font-button text-body-sm text-on-surface-variant hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
          @click="coordsModalOpen = false"
        >
          {{ t('editClinicPage.contact.coordinatesModal.cancel') }}
        </AppButton>
        <AppButton
          type="button"
          class="px-lg py-sm rounded-lg bg-tertiary text-on-tertiary font-button text-body-sm hover:opacity-90 transition-opacity"
          @click="saveCoords"
        >
          {{ t('editClinicPage.contact.coordinatesModal.save') }}
        </AppButton>
      </template>
    </AppModal>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'staff',
})

const { t } = useI18n()
const { api, apiUpload, ensureUserLoaded } = useMedDirectApi()
const { requireOrganization } = useActiveOrganization()

const WEEK_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const LANGUAGE_OPTIONS = ['english', 'arabic', 'kurdish', 'german', 'french', 'spanish', 'turkish', 'persian', 'russian', 'mandarin', 'hindi', 'urdu']

const languageOptions = computed(() =>
  LANGUAGE_OPTIONS.map((key) => ({
    value: t(`editClinicPage.languages.options.${key}`),
    label: t(`editClinicPage.languages.options.${key}`),
  })),
)

const loading = ref(false)
const loadError = ref('')
const saving = ref(false)
const saveError = ref('')
const saveSuccess = ref(false)
const certified = ref(false)

const form = reactive({
  name: '',
  description: '',
  email: '',
  phone: '',
  address: '',
  latitude: null,
  longitude: null,
})

const languages = ref([])
const diplomas = ref([])
const newCertification = ref('')
const serviceIds = ref([])
const servicesCatalog = ref([])
const openingHours = ref([])

const logo = ref(null)
const featuredImage = ref(null)
const gallery = ref([])
const logoUploading = ref(false)
const featuredUploading = ref(false)
const galleryUploading = ref(false)
const brandingError = ref('')
const logoInputRef = ref(null)
const featuredInputRef = ref(null)
const galleryInputRef = ref(null)

const teamMembers = ref([])
const newMemberName = ref('')
const newMemberTitle = ref('')
const newMemberImageFile = ref(null)
const newMemberImagePreviewUrl = ref('')
const memberImageInputRef = ref(null)
const addingMember = ref(false)
const memberError = ref('')

const servicesModalOpen = ref(false)
const hoursModalOpen = ref(false)
const hoursModalDay = ref('mon')
const coordsModalOpen = ref(false)
const coordsLat = ref('')
const coordsLng = ref('')

const selectedServices = computed(() =>
  servicesCatalog.value.filter((s) => serviceIds.value.includes(s.id)),
)

const hoursModalDayData = computed(() =>
  openingHours.value.find((d) => d.day === hoursModalDay.value) ?? defaultDayEntry(hoursModalDay.value),
)

const hasCoordinates = computed(() => form.latitude != null && form.longitude != null)

function defaultDayEntry(day) {
  return { day, open: '09:00', close: '17:00', closed: false }
}

function normalizeOpeningHours(raw) {
  if (Array.isArray(raw) && raw.length === 7 && raw.every((d) => WEEK_DAYS.includes(d?.day))) {
    return WEEK_DAYS.map((day) => raw.find((d) => d.day === day) ?? defaultDayEntry(day))
  }
  return WEEK_DAYS.map((day) => defaultDayEntry(day))
}

function openHoursModal(day) {
  hoursModalDay.value = day
  hoursModalOpen.value = true
}

function saveHours(data) {
  const dayKey = hoursModalDay.value
  const label = t(`editClinicPage.operations.days.${dayKey}`)
  const timeDisplay = data.closed ? t('editClinicPage.operations.closed') : `${data.open} – ${data.close}`
  const entry = {
    day: dayKey,
    days: label,
    open: data.open,
    close: data.close,
    closed: data.closed,
    time: timeDisplay,
    highlight: data.closed,
  }
  const idx = openingHours.value.findIndex((d) => d.day === dayKey)
  if (idx >= 0) openingHours.value.splice(idx, 1, entry)
  else openingHours.value.push(entry)
}

function addCertification() {
  const value = newCertification.value.trim()
  if (!value || diplomas.value.includes(value)) {
    newCertification.value = ''
    return
  }
  diplomas.value.push(value)
  newCertification.value = ''
}

function removeCertification(value) {
  diplomas.value = diplomas.value.filter((v) => v !== value)
}

async function uploadClinicImage(file, type) {
  const org = await requireOrganization()
  const fd = new FormData()
  fd.append('image', file)
  fd.append('type', type)
  return await apiUpload(`/api/organizations/${org.id}/images`, fd)
}

async function onLogoSelected(e) {
  const file = e.target.files?.[0]
  e.target.value = ''
  if (!file) return
  brandingError.value = ''
  logoUploading.value = true
  try {
    const res = await uploadClinicImage(file, 'logo')
    logo.value = res.image
  }
  catch {
    brandingError.value = t('editClinicPage.branding.uploadError')
  }
  finally {
    logoUploading.value = false
  }
}

async function onFeaturedSelected(e) {
  const file = e.target.files?.[0]
  e.target.value = ''
  if (!file) return
  brandingError.value = ''
  featuredUploading.value = true
  try {
    const res = await uploadClinicImage(file, 'hero')
    featuredImage.value = res.image
  }
  catch {
    brandingError.value = t('editClinicPage.branding.uploadError')
  }
  finally {
    featuredUploading.value = false
  }
}

async function onGallerySelected(e) {
  const file = e.target.files?.[0]
  e.target.value = ''
  if (!file) return
  brandingError.value = ''
  galleryUploading.value = true
  try {
    const res = await uploadClinicImage(file, 'gallery')
    gallery.value.push(res.image)
  }
  catch {
    brandingError.value = t('editClinicPage.branding.uploadError')
  }
  finally {
    galleryUploading.value = false
  }
}

async function deleteImage(image, kind) {
  brandingError.value = ''
  try {
    const org = await requireOrganization()
    await api(`/api/organizations/${org.id}/images/${image.id}`, { method: 'DELETE' })
    if (kind === 'logo') logo.value = null
    else if (kind === 'featured') featuredImage.value = null
    else gallery.value = gallery.value.filter((g) => g.id !== image.id)
  }
  catch {
    brandingError.value = t('editClinicPage.branding.deleteError')
  }
}

function openCoordsModal() {
  coordsLat.value = form.latitude ?? ''
  coordsLng.value = form.longitude ?? ''
  coordsModalOpen.value = true
}

function saveCoords() {
  form.latitude = coordsLat.value === '' ? null : Number(coordsLat.value)
  form.longitude = coordsLng.value === '' ? null : Number(coordsLng.value)
  coordsModalOpen.value = false
}

function onMemberImageSelected(e) {
  const file = e.target.files?.[0] || null
  newMemberImageFile.value = file
  if (newMemberImagePreviewUrl.value) {
    URL.revokeObjectURL(newMemberImagePreviewUrl.value)
    newMemberImagePreviewUrl.value = ''
  }
  if (file) {
    newMemberImagePreviewUrl.value = URL.createObjectURL(file)
  }
}

async function addTeamMember() {
  if (!newMemberName.value.trim()) return
  memberError.value = ''
  addingMember.value = true
  try {
    const org = await requireOrganization()
    const fd = new FormData()
    fd.append('name', newMemberName.value.trim())
    if (newMemberTitle.value.trim()) fd.append('title', newMemberTitle.value.trim())
    if (newMemberImageFile.value) fd.append('image', newMemberImageFile.value)
    const res = await apiUpload(`/api/organizations/${org.id}/team-members`, fd)
    teamMembers.value.push(res.team_member)
    newMemberName.value = ''
    newMemberTitle.value = ''
    newMemberImageFile.value = null
    if (newMemberImagePreviewUrl.value) {
      URL.revokeObjectURL(newMemberImagePreviewUrl.value)
      newMemberImagePreviewUrl.value = ''
    }
    if (memberImageInputRef.value) memberImageInputRef.value.value = ''
  }
  catch {
    memberError.value = t('editClinicPage.team.addError')
  }
  finally {
    addingMember.value = false
  }
}

async function removeTeamMember(member) {
  memberError.value = ''
  try {
    const org = await requireOrganization()
    await api(`/api/organizations/${org.id}/team-members/${member.id}`, { method: 'DELETE' })
    teamMembers.value = teamMembers.value.filter((m) => m.id !== member.id)
  }
  catch {
    memberError.value = t('editClinicPage.team.removeError')
  }
}

async function loadProfile() {
  loading.value = true
  loadError.value = ''
  try {
    const org = await requireOrganization()
    const [profileRes, servicesRes] = await Promise.all([
      api(`/api/organizations/${org.id}`),
      api('/api/services'),
    ])
    const p = profileRes.profile
    form.name = p.name || ''
    form.description = p.description || ''
    form.email = p.email || ''
    form.phone = p.phone || ''
    form.address = p.address || ''
    form.latitude = p.latitude
    form.longitude = p.longitude
    languages.value = p.languages_spoken || []
    diplomas.value = p.diplomas || []
    serviceIds.value = p.service_ids || []
    openingHours.value = normalizeOpeningHours(p.opening_hours)
    logo.value = p.logo
    featuredImage.value = p.featured_image
    gallery.value = p.gallery || []
    teamMembers.value = p.team_members || []
    certified.value = !!p.certified
    servicesCatalog.value = servicesRes.services || []
  }
  catch (e) {
    if (e?.message === 'NO_ORGANIZATION') {
      loadError.value = t('editClinicPage.errorNoOrganization')
    }
    else {
      loadError.value = e?.data?.message || t('editClinicPage.errorLoadFailed')
    }
  }
  finally {
    loading.value = false
  }
}

async function saveProfile() {
  saveError.value = ''
  saveSuccess.value = false
  if (!form.name.trim()) {
    saveError.value = t('editClinicPage.errorNameRequired')
    return
  }
  saving.value = true
  try {
    const org = await requireOrganization()
    const body = {
      name: form.name.trim(),
      description: form.description || null,
      email: form.email || null,
      phone: form.phone || null,
      address: form.address || null,
      latitude: form.latitude,
      longitude: form.longitude,
      languages_spoken: languages.value,
      diplomas: diplomas.value,
      service_ids: serviceIds.value,
      opening_hours: openingHours.value,
    }
    await api(`/api/organizations/${org.id}`, { method: 'PATCH', body })
    saveSuccess.value = true
  }
  catch (e) {
    const first = e?.data?.errors && Object.values(e.data.errors).flat()[0]
    saveError.value = first || e?.data?.message || t('editClinicPage.errorSaveFailed')
  }
  finally {
    saving.value = false
  }
}

onMounted(async () => {
  await ensureUserLoaded()
  await loadProfile()
})

onUnmounted(() => {
  if (newMemberImagePreviewUrl.value) {
    URL.revokeObjectURL(newMemberImagePreviewUrl.value)
  }
})

useSeoMeta({
  title: () => t('editClinicPage.seoTitle'),
})
</script>
