<script setup>
import { watch, onMounted } from 'vue'

const props = defineProps({
  preferences: {
    type: Object,
    required: true
  },
  widgetData: {
    type: Object,
    default: undefined
  }
})

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
      <h2>Preferences</h2>
      <pre>{{ JSON.stringify(preferences, null, 2) }}</pre>
      <h2>Widget Data</h2>
      <pre>{{ JSON.stringify(widgetData, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.widget {
  width: 100%;
  height: 100%;
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

pre {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  overflow: auto;
  font-size: 12px;
}
</style>
