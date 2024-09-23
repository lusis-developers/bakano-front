<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from 'vue'

import { validateUrl } from '@/validation/components/ProfileSettings'

import type { ProfileForm } from '@/interfaces/components/Profile/UserProfile.interface'

const emit = defineEmits(['update:form'])
const props = defineProps<{ form: ProfileForm }>()

const localSocialMediaLinks = ref({ ...props.form.socialMediaLinks })

watch(
  localSocialMediaLinks,
  (newLinks) => {
    emit('update:form', { ...props.form, socialMediaLinks: newLinks })
  },
  { deep: true }
)

const validationErrors = computed(() => {
  return {
    linkedin: validateUrl(localSocialMediaLinks.value.linkedin),
    twitter: validateUrl(localSocialMediaLinks.value.twitter),
    instagram: validateUrl(localSocialMediaLinks.value.instagram),
    website: validateUrl(localSocialMediaLinks.value.website)
  }
})
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
        :class="{
          'is-invalid': localSocialMediaLinks.linkedin && validationErrors.linkedin.length > 0
        }"
      />
      <span
        v-if="localSocialMediaLinks.linkedin && validationErrors.linkedin.length > 0"
        class="text-danger"
      >
        {{ validationErrors.linkedin[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="twitter" class="form-label">Twitter</label>
      <input
        type="text"
        class="form-control"
        id="twitter"
        v-model="localSocialMediaLinks.twitter"
        :class="{
          'is-invalid': localSocialMediaLinks.twitter && validationErrors.twitter.length > 0
        }"
      />
      <span
        v-if="localSocialMediaLinks.twitter && validationErrors.twitter.length > 0"
        class="text-danger"
      >
        {{ validationErrors.twitter[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="instagram" class="form-label">Instagram</label>
      <input
        type="text"
        class="form-control"
        id="instagram"
        v-model="localSocialMediaLinks.instagram"
        :class="{
          'is-invalid': localSocialMediaLinks.instagram && validationErrors.instagram.length > 0
        }"
      />
      <span
        v-if="localSocialMediaLinks.instagram && validationErrors.instagram.length > 0"
        class="text-danger"
      >
        {{ validationErrors.instagram[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="website" class="form-label">Sitio Web</label>
      <input
        type="text"
        class="form-control"
        id="website"
        v-model="localSocialMediaLinks.website"
        :class="{
          'is-invalid': localSocialMediaLinks.website && validationErrors.website.length > 0
        }"
      />
      <span
        v-if="localSocialMediaLinks.website && validationErrors.website.length > 0"
        class="text-danger"
      >
        {{ validationErrors.website[0] }}
      </span>
    </div>
  </div>
</template>
