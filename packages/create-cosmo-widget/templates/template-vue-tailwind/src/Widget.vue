<script setup>
defineProps({
  preferences: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="widget">
    <h1>Hello from Vue!</h1>
    <p>Edit <code>src/Widget.vue</code> to get started.</p>
    <div class="preferences">
      <h2>Preferences</h2>
      <pre>{{ JSON.stringify(preferences, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.widget {
  font-family: sans-serif;
  text-align: center;
  padding: 2rem;
}

.preferences {
  margin-top: 2rem;
  text-align: left;
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
}
</style>
