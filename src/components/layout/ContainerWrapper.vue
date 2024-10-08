<script setup lang="ts"></script>

<template>
  <div class="container-fluid m-0 p-0 text-bg-gray-100">
    <div
      class="container-xxl m-auto d-flex flex-column justify-content-start align-items-center h-100 overflow-auto p-4"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-xxl {
  max-height: 100vh;
  overflow-y: auto;
}
</style>
