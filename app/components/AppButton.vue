<template>
  <NuxtLink v-if="to" :to="to" v-bind="$attrs">
    <slot />
  </NuxtLink>
  <button v-else :type="type" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  /** When set, renders `NuxtLink` instead of `button`. */
  to: {
    type: [String, Object],
    default: undefined,
  },
  /** Native `button` `type` (ignored when `to` is set). */
  type: {
    type: String,
    default: 'button',
  },
})
</script>
