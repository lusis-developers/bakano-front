<script setup lang="ts">
const emit = defineEmits(['next']);

function emitNext(): void {
  emit('next');
}
</script>

<template>
  <div>
    <h1>Step 1</h1>
    <p>Step 1 content</p>
    <button @click="emitNext">Next</button>
  </div>
</template>
