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
  <div class="d-flex vh-100 overflow-y-hidden">
    <AppSidebar />
    <div class="d-flex flex-column col vh-100">
      <AppHeader></AppHeader>
      <main class="overflow-y-auto p-4">
        <ContainerWrapper>
          <template #content>
            <RouterView />
          </template>
        </ContainerWrapper>
      </main>
    </div>
  </div>
</template>
