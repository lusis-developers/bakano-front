<script setup lang="ts">
import { computed, onBeforeMount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import useAuthStore from '@/stores/auth.store'
import logo from '@/assets/brand/bakano-negro.png'
import ContainerWrapper from '@/components/layout/ContainerWrapper.vue'
import SpinnerLoader from '@/components/shared/SpinnerLoader.vue'
import { SpinnerSize } from '@/enum/components/shared/SpinnerLoader.enum'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()

const token = computed(() => route.query.token)

onMounted(async () => {
  if (token.value) {
    await authStore.login(token.value as string)
    router.push({ name: 'Dashboard' })
  }
})

onBeforeMount(() => {
  authStore.error = null
  authStore.successMessage = null
})
</script>

<template>
  <ContainerWrapper>
    <template #content>
      <div class="auth mt-5 pt-5">
        <div v-if="authStore.isLoading" class="auth-loading">
          <SpinnerLoader :size="SpinnerSize.LARGE" />
        </div>
        <div v-else class="auth-no-auth d-flex flex-column justify-content-center gap-4 mt-5 pt-5">
          <img :src="logo" alt="bakano logo" />
          <h1 class="text-center">No estás autenticado...</h1>
          <router-link class="text-center text-success text-decoration-underline fs-5" to="/login">
            Ir a Inicio de sesión</router-link
          >
        </div>
      </div>
    </template>
  </ContainerWrapper>
</template>

<style lang="scss" scoped>
.auth {
  &-no-auth {
    width: 100%;
    max-width: 380px;
    img {
      width: 100px;
      margin: auto;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>
