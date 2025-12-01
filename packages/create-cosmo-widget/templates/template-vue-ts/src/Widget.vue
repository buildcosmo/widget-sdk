<script setup lang="ts">
import { watch, onMounted } from 'vue'

const props = defineProps<{
  preferences: Record<string, any>;
  widgetData?: Record<string, any>;  // undefined on first load, object after saving
}>()

function updateBackgroundClass() {
  const root = document.getElementById('widget-root');
  if (root) {
    if (props.preferences?.hideBackground) {
      root.classList.add('hide-background');
    } else {
      root.classList.remove('hide-background');
    }
  }
}

onMounted(() => {
  updateBackgroundClass();
})

watch(() => props.preferences?.hideBackground, () => {
  updateBackgroundClass();
})
</script>

<template>
  <div class="widget">
    <div class="header"></div>
    <div class="content">
      <div class="label">preferences:</div>
      <pre>{{ JSON.stringify(preferences, null, 2) }}</pre>
      <div class="label">widgetData:</div>
      <pre>{{ JSON.stringify(widgetData, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.widget {
  width: 100%;
  height: 100%;
  user-select: none;
}

.header {
  width: 100%;
  height: 20px;
}

.content {
  width: 100%;
  height: calc(100% - 20px);
  box-sizing: border-box;
  padding: 1rem;
}

.label {
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 4px;
  color: rgba(0, 0, 0, 0.6);
}

pre {
  background: rgba(0, 0, 0, 0.05);
  padding: 0.75rem;
  border-radius: 6px;
  overflow: auto;
  font-size: 11px;
  margin: 0 0 1rem 0;
}
</style>
