<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

import { useRoute } from 'vue-router'

import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import ContainerWrapper from '@/components/layout/ContainerWrapper.vue'

import { sidebarItems } from '@/utils/menuItems.utils'

const route = useRoute()

const showHeader = computed(() => {
  return route.path !== '/app/trends' && route.path !== '/app/profile'
})

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
    <AppSidebar :sidebarItems="sidebarItems" />
    <div class="d-flex flex-column flex-grow-1 min-vh-100 col">
      <AppHeader v-if="showHeader">
        <template #header>
          <router-link to="brand/edit" class="btn">
            <i class="bi bi-gear-wide-connected" />
          </router-link>
        </template>
      </AppHeader>
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
