<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import ContainerWrapper from '@/components/layout/ContainerWrapper.vue'

const isScreenSmall = ref(window.innerWidth < 1023)

function handleResize() {
  isScreenSmall.value = window.innerWidth > 1023
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="d-flex">
    <AppSidebar />
    <div class="d-flex flex-column flex-grow-1 min-vh-100 col">
      <AppHeader></AppHeader>
      <main class="flex-grow-1">
        <ContainerWrapper>
          <template #content>
            <RouterView />
          </template>
        </ContainerWrapper>
      </main>
    </div>
  </div>
</template>
