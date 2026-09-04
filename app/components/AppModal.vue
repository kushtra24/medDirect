<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-blue-900/40 dark:bg-slate-950/70 backdrop-blur-sm p-4"
      role="presentation"
      @click.self="close"
    >
      <div
        class="bg-white dark:bg-slate-900 w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col max-h-[90vh]"
        :class="maxWidthClass"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        @click.stop
        @keydown.esc="close"
      >
        <div class="flex items-center justify-between gap-4 px-lg py-md border-b border-outline-variant dark:border-slate-800 shrink-0">
          <h2 :id="titleId" class="font-h3 text-h3 text-blue-900 dark:text-blue-100 truncate">
            {{ title }}
          </h2>
          <AppButton
            type="button"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
            :aria-label="closeAria"
            @click="close"
          >
            <FontAwesomeIcon icon="xmark" class="text-lg" aria-hidden="true" />
          </AppButton>
        </div>

        <div class="px-lg py-lg overflow-y-auto">
          <slot />
        </div>

        <div v-if="$slots.footer" class="px-lg py-md border-t border-outline-variant dark:border-slate-800 shrink-0 flex justify-end gap-sm">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onUnmounted, useId, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  closeAria: {
    type: String,
    default: 'Close dialog',
  },
  maxWidthClass: {
    type: String,
    default: 'max-w-md',
  },
})

const emit = defineEmits(['update:open'])

const titleId = useId()

function close() {
  emit('update:open', false)
}

watch(
  () => props.open,
  (isOpen) => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('overflow-hidden', isOpen)
    }
  },
)

onUnmounted(() => {
  if (import.meta.client) {
    document.documentElement.classList.remove('overflow-hidden')
  }
})
</script>
