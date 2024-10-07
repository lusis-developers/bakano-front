<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">{{ title }}</h5>
    </div>
    <div class="card-body">
      <slot name="content"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
