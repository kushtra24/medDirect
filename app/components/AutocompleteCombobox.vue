<template>
  <div ref="rootRef" class="relative">
    <div class="relative">
      <input
        :id="inputId"
        ref="inputRef"
        v-model="query"
        type="text"
        role="combobox"
        :aria-expanded="open"
        aria-autocomplete="list"
        :aria-controls="listId"
        :aria-activedescendant="activeOptionId"
        :aria-label="ariaLabel"
        autocomplete="off"
        class="w-full border border-outline-variant dark:border-slate-600 focus:border-tertiary focus:ring-1 focus:ring-tertiary rounded-lg font-body-md p-3 pe-10 bg-white dark:bg-slate-950 dark:text-slate-100 outline-none"
        :placeholder="placeholder"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
        @input="onInput"
      >
    </div>
    <ul
      v-show="open && (filtered.length > 0 || showNoResults)"
      :id="listId"
      role="listbox"
      class="absolute z-30 mt-1 w-full rounded-lg border border-outline-variant dark:border-slate-600 bg-white dark:bg-slate-900 shadow-lg max-h-48 overflow-y-auto py-1"
    >
      <template v-if="showNoResults">
        <li
          role="presentation"
          class="px-3 py-2 text-sm text-on-surface-variant"
        >
          {{ noResultsText }}
        </li>
      </template>
      <template v-else>
        <li
          v-for="(opt, i) in filtered"
          :id="`${listId}-opt-${i}`"
          :key="`${opt}-${i}`"
          role="option"
          :aria-selected="i === highlightIndex"
          class="px-3 py-2 cursor-pointer text-sm text-on-surface"
          :class="i === highlightIndex ? 'bg-tertiary/15 text-tertiary' : 'hover:bg-surface-container dark:hover:bg-slate-800'"
          @mousedown.prevent="select(opt)"
        >
          {{ opt }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, useId, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  noResultsText: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const inputId = useId()
const listId = useId()

const query = ref(props.modelValue ?? '')
const open = ref(false)
const highlightIndex = ref(-1)
const inputRef = ref(null)
const rootRef = ref(null)

watch(
  () => props.modelValue,
  (v) => {
    if (v !== query.value) {
      query.value = v ?? ''
    }
  },
)

const normalizedOptions = computed(() =>
  props.options.filter((o) => typeof o === 'string' && o.length > 0),
)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  const opts = normalizedOptions.value
  if (!q) {
    return opts
  }
  const matches = opts.filter((o) => o.toLowerCase().includes(q))
  return matches.length ? matches : []
})

const showNoResults = computed(() => open.value && query.value.trim() !== '' && filtered.value.length === 0)

const activeOptionId = computed(() => {
  if (!open.value || highlightIndex.value < 0 || showNoResults.value) {
    return undefined
  }
  return `${listId}-opt-${highlightIndex.value}`
})

function syncEmit() {
  emit('update:modelValue', query.value)
}

function onInput() {
  open.value = true
  highlightIndex.value = filtered.value.length ? 0 : -1
  syncEmit()
}

function onFocus() {
  open.value = true
  highlightIndex.value = filtered.value.length ? 0 : -1
}

function onBlur() {
  window.setTimeout(() => {
    open.value = false
    highlightIndex.value = -1
  }, 120)
}

function select(option) {
  query.value = option
  syncEmit()
  open.value = false
  highlightIndex.value = -1
  inputRef.value?.focus()
}

function onKeydown(e) {
  if (!open.value && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
    open.value = true
    highlightIndex.value = filtered.value.length ? 0 : -1
    e.preventDefault()
    return
  }

  if (!open.value) {
    return
  }

  if (e.key === 'Escape') {
    open.value = false
    highlightIndex.value = -1
    e.preventDefault()
    return
  }

  if (showNoResults.value) {
    return
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (!filtered.value.length) {
      return
    }
    highlightIndex.value = Math.min(highlightIndex.value + 1, filtered.value.length - 1)
    scrollHighlightIntoView()
  }
  else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (!filtered.value.length) {
      return
    }
    highlightIndex.value = Math.max(highlightIndex.value - 1, 0)
    scrollHighlightIntoView()
  }
  else if (e.key === 'Enter') {
    if (highlightIndex.value >= 0 && filtered.value[highlightIndex.value]) {
      e.preventDefault()
      select(filtered.value[highlightIndex.value])
    }
  }
}

function scrollHighlightIntoView() {
  nextTick(() => {
    const el = document.getElementById(`${listId}-opt-${highlightIndex.value}`)
    el?.scrollIntoView({ block: 'nearest' })
  })
}
</script>
