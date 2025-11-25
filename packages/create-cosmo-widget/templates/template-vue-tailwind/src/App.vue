<script setup>
import Widget from './Widget.vue'

defineProps({
  preferences: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <Widget :preferences="preferences" />
</template>
