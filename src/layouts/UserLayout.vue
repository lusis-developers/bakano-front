<script setup lang="ts">
import { headerOptions, sidebarItems } from '@/utils/menuItems.utils'
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
          <router-link
            v-for="(item, index) in headerOptions"
            :key="index"
            :to="item.link"
            class="btn text-decoration-none text-dark"
            active-class="bg-primary text-white"
          >
            <i :class="[item.icon, 'd-block']" />
            <span> {{ item.name }}</span>
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
