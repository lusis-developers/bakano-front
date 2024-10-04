<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    validator: (value: string) => ['success', 'error'].includes(value)
  }
})
</script>

<template>
  <div :class="['alert', type === 'success' ? 'alert-success' : 'alert-danger']" role="alert">
    {{ message }}
  </div>
</template>

<style>
.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
}
</style>
