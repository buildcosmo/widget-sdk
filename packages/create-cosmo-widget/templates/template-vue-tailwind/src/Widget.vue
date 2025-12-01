<script setup>
import { watch } from 'vue'

const props = defineProps({
  preferences: { type: Object, required: true },
  widgetData: { type: Object, default: undefined }
})

watch(
  () => props.preferences?.hideBackground,
  (hide) => {
    document.getElementById('widget-root')?.classList.toggle('hide-background', !!hide)
  },
  { immediate: true }
)
</script>

<template>
  <div class="w-full h-full">
    <div class="w-full h-5" />
    <div class="w-full h-[calc(100%-20px)] box-border p-4">
      <div class="text-xs font-medium mb-1 text-black/60">preferences:</div>
      <pre
        class="bg-black/5 p-3 rounded-md overflow-auto text-[11px] mb-4">{{ JSON.stringify(preferences, null, 2) }}</pre>
      <div class="text-xs font-medium mb-1 text-black/60">widgetData:</div>
      <pre
        class="bg-black/5 p-3 rounded-md overflow-auto text-[11px] mb-4">{{ JSON.stringify(widgetData, null, 2) }}</pre>
    </div>
  </div>
</template>
