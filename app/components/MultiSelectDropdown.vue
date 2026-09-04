<template>
  <div ref="rootRef" class="relative">
    <div
      class="flex flex-wrap gap-xs p-xs border border-outline-variant rounded-lg min-h-[42px] items-center bg-white dark:bg-slate-950 dark:border-slate-700 cursor-pointer"
      role="button"
      tabindex="0"
      :aria-expanded="open"
      @click="toggleOpen"
      @keydown.enter.prevent="toggleOpen"
      @keydown.space.prevent="toggleOpen"
    >
      <span
        v-for="value in modelValue"
        :key="value"
        class="bg-tertiary/10 text-tertiary px-sm py-1 rounded-full text-xs font-bold flex items-center gap-1"
      >
        {{ labelFor(value) }}
        <AppButton
          type="button"
          class="inline-flex"
          :aria-label="removeAria"
          @click.stop="remove(value)"
        >
          <FontAwesomeIcon icon="xmark" class="text-[14px] cursor-pointer" aria-hidden="true" />
        </AppButton>
      </span>
      <span v-if="!modelValue.length" class="text-xs text-on-surface-variant px-1">{{ placeholder }}</span>
      <FontAwesomeIcon icon="chevron-down" class="ms-auto text-outline text-xs shrink-0 px-1" aria-hidden="true" />
    </div>
    <ul
      v-show="open"
      role="listbox"
      aria-multiselectable="true"
      class="absolute z-30 mt-1 w-full rounded-lg border border-outline-variant dark:border-slate-600 bg-white dark:bg-slate-900 shadow-lg max-h-56 overflow-y-auto py-1"
    >
      <li
        v-for="option in options"
        :key="option.value"
        role="option"
        :aria-selected="isSelected(option.value)"
        class="px-3 py-2 cursor-pointer text-sm flex items-center gap-2 hover:bg-surface-container dark:hover:bg-slate-800"
        @mousedown.prevent="toggle(option.value)"
      >
        <FontAwesomeIcon
          :icon="isSelected(option.value) ? 'square-check' : 'square'"
          class="text-tertiary shrink-0"
          aria-hidden="true"
        />
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  removeAria: {
    type: String,
    default: 'Remove',
  },
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const rootRef = ref(null)

function labelFor(value) {
  return props.options.find((o) => o.value === value)?.label ?? value
}

function isSelected(value) {
  return props.modelValue.includes(value)
}

function toggleOpen() {
  open.value = !open.value
}

function toggle(value) {
  const next = isSelected(value)
    ? props.modelValue.filter((v) => v !== value)
    : [...props.modelValue, value]
  emit('update:modelValue', next)
}

function remove(value) {
  emit('update:modelValue', props.modelValue.filter((v) => v !== value))
}

function onDocumentClick(e) {
  if (rootRef.value && !rootRef.value.contains(e.target)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>
