<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from 'vue'

import { validateUrl } from '@/validation/components/ProfileSettings'

import type { IUser } from '@/interfaces/user.interface'

const emit = defineEmits(['update:form'])
const props = defineProps<{ form: IUser }>()

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
    linkedin: validateUrl(localSocialMediaLinks.value.linkedin!),
    twitter: validateUrl(localSocialMediaLinks.value.twitter!),
    instagram: validateUrl(localSocialMediaLinks.value.instagram!),
    website: validateUrl(localSocialMediaLinks.value.website!)
  }
})
</script>

<template>
  <div class="accordion-body">
    <div class="mb-3">
      <label for="linkedin" class="form-label">LinkedIn</label>
      <input
        v-model="localSocialMediaLinks.linkedin"
        :class="{
          'is-invalid': localSocialMediaLinks.linkedin && validationErrors.linkedin.length > 0
        }"
        type="text"
        class="form-control"
        id="linkedin"
        placeholder="Link de tu perfil"
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
        v-model="localSocialMediaLinks.twitter"
        :class="{
          'is-invalid': localSocialMediaLinks.twitter && validationErrors.twitter.length > 0
        }"
        type="text"
        id="twitter"
        placeholder="Link de tu perfil"
        class="form-control"
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
        v-model="localSocialMediaLinks.instagram"
        :class="{
          'is-invalid': localSocialMediaLinks.instagram && validationErrors.instagram.length > 0
        }"
        type="text"
        id="instagram"
        placeholder="Link de tu perfil"
        class="form-control"
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
        v-model="localSocialMediaLinks.website"
        :class="{
          'is-invalid': localSocialMediaLinks.website && validationErrors.website.length > 0
        }"
        type="text"
        id="website"
        placeholder="Link de tu website"
        class="form-control"
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
