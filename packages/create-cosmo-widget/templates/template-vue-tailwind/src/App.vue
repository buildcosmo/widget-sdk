<script setup>
import Widget from './Widget.vue'

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
</script>

<template>
  <Widget :preferences="preferences" :widgetData="widgetData" />
</template>
