<script setup lang="ts">
import { sidebarItems } from '@/utils/menuItems.utils'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import ContainerWrapper from '@/components/layout/ContainerWrapper.vue'
</script>

<template>
  <div class="d-flex">
    <AppSidebar :sidebarItems="sidebarItems" />
    <div class="d-flex flex-column flex-grow-1 min-vh-100 col">
      <AppHeader>
        <template #header>
          <button class="btn">
            <i class="bi bi-bar-chart-line d-block"></i>
            <span>Tendencias</span>
          </button>
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
