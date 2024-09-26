<script setup lang="ts"></script>

<template>
  <div class="container-fluid m-0 p-0 min-vh-100 text-bg-gray-100">
    <div
      class="container-xxl m-auto d-flex flex-column justify-content-center align-items-center overflow-auto p-4"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-xxl {
  max-height: 100vh;
}
</style>
