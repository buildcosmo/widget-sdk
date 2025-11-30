<script setup>
import Widget from './Widget.vue'

const props = defineProps({
  preferences: {
    type: Object,
    required: true
  },
  widgetData: {
    type: [Object, String],
    default: null
  }
})
</script>

<template>
  <Widget :preferences="preferences" :widgetData="widgetData" />
</template>
