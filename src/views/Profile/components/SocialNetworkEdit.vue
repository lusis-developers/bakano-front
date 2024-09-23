<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

import type { ProfileForm } from '@/interfaces/components/Profile/UserProfile.interface'

const props = defineProps<{ form: ProfileForm }>()
const emit = defineEmits(['update:form'])

const localSocialMediaLinks = ref({ ...props.form.socialMediaLinks })

watch(localSocialMediaLinks, (newLinks) => {
  emit('update:form', { ...props.form, socialMediaLinks: newLinks })
}, { deep: true })
</script>

<template>
  <div class="accordion-body">
    <div class="mb-3">
      <label for="linkedin" class="form-label">LinkedIn</label>
      <input
        type="text"
        class="form-control"
        id="linkedin"
        v-model="localSocialMediaLinks.linkedin"
      />
    </div>
    <div class="mb-3">
      <label for="twitter" class="form-label">Twitter</label>
      <input
        type="text"
        class="form-control"
        id="twitter"
        v-model="localSocialMediaLinks.twitter"
      />
    </div>
    <div class="mb-3">
      <label for="instagram" class="form-label">Instagram</label>
      <input
        type="text"
        class="form-control"
        id="instagram"
        v-model="localSocialMediaLinks.instagram"
      />
    </div>
    <div class="mb-3">
      <label for="website" class="form-label">Sitio Web</label>
      <input
        type="text"
        class="form-control"
        id="website"
        v-model="localSocialMediaLinks.website"
      />
    </div>
  </div>
</template>