<script setup lang="ts">
const emit = defineEmits(['next']);

function emitNext(): void {
  emit('next');
}
</script>

<template>
  <div>
    <h1>Step 2</h1>
    <p>Step 2 content</p>
    <button @click="emitNext">Next</button>
  </div>
</template>
