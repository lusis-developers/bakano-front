<script setup lang="ts">
function loginWithLinkedIn() {
  // TODO: connection
}
</script>

<template>
  <div>
    <button class="btn btn-linkedin social-button" @click="loginWithLinkedIn">
      Conecta con LinkedIn
      <i class="bi bi-linkedin"></i>
    </button>
  </div>
</template>

<style lang="scss">
.social-button {
  width: 100%;
  max-width: 320px;
}
</style>
