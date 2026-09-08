<template>
  <div
    class="w-full rounded-lg border border-outline-variant focus-within:border-tertiary focus-within:ring-1 focus-within:ring-tertiary transition-all overflow-hidden bg-white dark:bg-slate-950 dark:border-slate-700"
  >
    <div class="flex items-center gap-1 p-2 border-b border-outline-variant bg-surface-container-low dark:bg-slate-800 flex-wrap">
      <button
        type="button"
        class="p-1 rounded transition-colors"
        :class="toolbarButtonClass('bold')"
        :disabled="!editor"
        :title="t('editClinicPage.editor.bold')"
        @mousedown.prevent
        @click="editor?.chain().focus().toggleBold().run()"
      >
        <FontAwesomeIcon icon="bold" class="text-[18px]" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="p-1 rounded transition-colors"
        :class="toolbarButtonClass('italic')"
        :disabled="!editor"
        :title="t('editClinicPage.editor.italic')"
        @mousedown.prevent
        @click="editor?.chain().focus().toggleItalic().run()"
      >
        <FontAwesomeIcon icon="italic" class="text-[18px]" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="p-1 rounded transition-colors"
        :class="toolbarButtonClass('underline')"
        :disabled="!editor"
        :title="t('editClinicPage.editor.underline')"
        @mousedown.prevent
        @click="editor?.chain().focus().toggleUnderline().run()"
      >
        <FontAwesomeIcon icon="underline" class="text-[18px]" aria-hidden="true" />
      </button>
      <div class="w-px h-4 bg-outline-variant mx-1" aria-hidden="true" />
      <button
        type="button"
        class="p-1 rounded transition-colors"
        :class="toolbarButtonClass('bulletList')"
        :disabled="!editor"
        :title="t('editClinicPage.editor.bulletList')"
        @mousedown.prevent
        @click="editor?.chain().focus().toggleBulletList().run()"
      >
        <FontAwesomeIcon icon="list-ul" class="text-[18px]" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="p-1 rounded transition-colors"
        :class="toolbarButtonClass('orderedList')"
        :disabled="!editor"
        :title="t('editClinicPage.editor.numberedList')"
        @mousedown.prevent
        @click="editor?.chain().focus().toggleOrderedList().run()"
      >
        <FontAwesomeIcon icon="list-ol" class="text-[18px]" aria-hidden="true" />
      </button>
    </div>

    <ClientOnly>
      <EditorContent :editor="editor" class="rich-text-input" />
      <template #fallback>
        <div class="px-md py-sm min-h-[160px] text-on-surface-variant text-body-sm">…</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  id: { type: String, default: undefined },
})

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()

const editor = ref(null)
// Tiptap's Editor instance mutates its own internal state outside Vue's reactivity system, so
// reading `editor.value.isActive(...)` alone would never re-run after the initial render. This
// tick is bumped on every transaction (content or selection change) purely to give the toolbar's
// active-state classes a reactive dependency to re-evaluate against.
const editorStateTick = ref(0)

function toolbarButtonClass(mark) {
  void editorStateTick.value
  const active = editor.value?.isActive(mark)
  return active
    ? 'bg-secondary-container text-on-secondary-container'
    : 'text-on-surface-variant hover:bg-surface-variant dark:hover:bg-slate-700'
}

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue || '',
    extensions: [
      StarterKit.configure({ heading: false }),
      Underline,
      Placeholder.configure({ placeholder: props.placeholder }),
    ],
    editorProps: {
      attributes: {
        ...(props.id ? { id: props.id } : {}),
        class: 'rich-text-content focus:outline-none px-md py-sm min-h-[160px] max-h-[360px] overflow-y-auto text-on-surface bg-transparent',
      },
    },
    onUpdate: ({ editor: instance }) => {
      emit('update:modelValue', instance.isEmpty ? '' : instance.getHTML())
    },
    onTransaction: () => {
      editorStateTick.value += 1
    },
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

watch(() => props.modelValue, (value) => {
  if (!editor.value) {
    return
  }
  const incoming = value || ''
  const current = editor.value.isEmpty ? '' : editor.value.getHTML()
  if (incoming !== current) {
    editor.value.commands.setContent(incoming, false)
  }
})
</script>

<style>
.rich-text-content p {
  margin: 0 0 0.5em;
}

.rich-text-content p:last-child {
  margin-bottom: 0;
}

.rich-text-content ul,
.rich-text-content ol {
  padding-inline-start: 1.25em;
  margin: 0 0 0.5em;
}

.rich-text-content ul {
  list-style: disc;
}

.rich-text-content ol {
  list-style: decimal;
}

.rich-text-content p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: inline-start;
  height: 0;
  pointer-events: none;
  color: #747878;
}
</style>
