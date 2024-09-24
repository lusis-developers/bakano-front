<script setup lang="ts">
const emit = defineEmits(['next', 'prev'])

function submitForm(): void {
  emit('next')
}
function goBack(): void {
  emit('prev')
}
</script>

<template>
  <div class="container">
    segundo paso
    <button class="btn" @click="submitForm">adelante</button>
    <button class="btn" @click="goBack">atras</button>
  </div>
</template>
