<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { linkedInScopes } from '@/config/components/auth/linkedInPermissions.config'
import useAuthStore from '@/stores/auth.store'

const route = useRoute()

const props = defineProps({
  brandId: {
    type: String,
    required: true
  }
})

const authStore = useAuthStore()

const linkedInClientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID
const redirectUri = 'https://bakano-app-front.netlify.app '

function loginWithLinkedIn() {
  const state = Math.random().toString(36).substring(2)
  const scope = linkedInScopes.join(' ')
  const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedInClientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`

  window.location.href = linkedInAuthUrl
}

function sendAccessToken(code: string) {
  authStore.sendLinkedInTokenToBackend(code, props.brandId)
}

onMounted(() => {
  const code = route.query.code as string
  if (code) {
    sendAccessToken(code)
  }
})
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
