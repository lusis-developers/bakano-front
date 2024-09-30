<script setup lang="ts">
const emit = defineEmits(['next'])

function goToNextStep(): void {
  // Lógica para validar y enviar datos del paso 1
  emit('next')
}
</script>

<template>
  <div>
    <h3>Paso 1</h3>
    <p>Contenido del paso 1</p>
  </div>
</template>
