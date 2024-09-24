<script setup lang="ts">
const emit = defineEmits(['next', 'prev'])

function submitForm(): void {
  emit('next')
}
</script>

<template>
  <div class="container">
    primer paso
    <button @click="submitForm" class="btn">adelante</button>
  </div>
</template>
