<script setup lang="ts">
import { defineProps } from 'vue'

import type { ProfileForm } from '@/interfaces/components/Profile/UserProfile.interface'

defineProps<{ form: ProfileForm }>()
</script>

<template>
  <div class="accordion-body">
    <div class="mb-3">
      <label for="city" class="form-label">Ciudad</label>
      <input type="text" class="form-control" id="city" v-model="form.location.city" />
    </div>
    <div class="mb-3">
      <label for="country" class="form-label">País</label>
      <input type="text" class="form-control" id="country" v-model="form.location.country" />
    </div>
  </div>
</template>
