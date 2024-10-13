<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        {{ title }}
      </h5>
      <hr v-if="title?.length" class="hr" />
      <slot name="content"></slot>
    </div>
  </div>
</template>
