<script setup lang="ts">
import FacebookLogin from '@/components/auth/FacebookLogin.vue'
import LinkedInLogin from '@/components/auth/LinkedInLogin.vue'
</script>

<template>
  <div>
    <FacebookLogin :brandId="'brandId'" />
    <LinkedInLogin />
  </div>
</template>
