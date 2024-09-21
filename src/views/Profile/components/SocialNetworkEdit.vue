<script setup lang="ts">
import { defineProps } from 'vue'

import type { ProfileForm } from '@/interfaces/components/Profile/UserProfile.interface'

defineProps<{ form: ProfileForm }>()
</script>

<template>
  <div class="accordion-body">
    <div class="mb-3">
      <label for="linkedin" class="form-label">LinkedIn</label>
      <input
        type="text"
        class="form-control"
        id="linkedin"
        v-model="form.socialMediaLinks.linkedin"
      />
    </div>
    <div class="mb-3">
      <label for="twitter" class="form-label">Twitter</label>
      <input
        type="text"
        class="form-control"
        id="twitter"
        v-model="form.socialMediaLinks.twitter"
      />
    </div>
    <div class="mb-3">
      <label for="instagram" class="form-label">Instagram</label>
      <input
        type="text"
        class="form-control"
        id="instagram"
        v-model="form.socialMediaLinks.instagram"
      />
    </div>
    <div class="mb-3">
      <label for="website" class="form-label">Sitio Web</label>
      <input
        type="text"
        class="form-control"
        id="website"
        v-model="form.socialMediaLinks.website"
      />
    </div>
  </div>
</template>
