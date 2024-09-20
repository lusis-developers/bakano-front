<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

import { menuOptions, sidebarItems, menuUserOptions } from '@/utils/menuItems.utils'
import { useBrandStore } from '@/stores/brandStore'
import DropdownMenu from './DropdownMenu.vue'

import type { Brand } from '@/interfaces/Layout/BrandsTypes.interface'
import type { MenuDropdownItem } from '@/interfaces/Layout/MenuDropdownItems.interface'

const isSidebarExpanded = ref(false)
const activeItemIndex = ref(0)

const brandStore = useBrandStore()

function getItemClasses(index: number): { [key: string]: boolean } {
  return {
    'text-white': activeItemIndex.value === index,
    'bg-primary': activeItemIndex.value === index
  }
}
function updateSidebarState(): void {
  isSidebarExpanded.value = window.innerWidth >= 768
}
function handleBrandSelection(brand: Brand): void {
  brandStore.setSelectedBrand(brand)
}
function getMenuItems(brands: Brand[]): MenuDropdownItem[] {
  return brands.map((brand) => ({
    ...brand,
    link: '#'
  }))
}

onMounted(() => {
  updateSidebarState()
  window.addEventListener('resize', updateSidebarState)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSidebarState)
})
</script>

<template>
  <div class="d-flex">
    <aside
      class="bg-light vh-100 d-flex flex-column p-3 border-end"
      :class="isSidebarExpanded ? 'col-3' : 'col-1'"
    >
      <div class="d-flex align-items-center mb-3">
        <img
          src="../assets/brand/bakano-negro.png"
          alt="Logo"
          class="img-fluid"
          style="max-height: 50px"
        />
      </div>
      <ul class="mt-4 nav nav-pills flex-column">
        <li v-for="(item, index) in sidebarItems" :key="index" class="nav-item fs-5">
          <router-link
            :to="item.link"
            class="nav-link"
            :class="[
              'd-flex',
              'align-items-center',
              'text-dark',
              isSidebarExpanded ? '' : 'justify-content-center',
              getItemClasses(index)
            ]"
            @click.prevent="activeItemIndex = index"
          >
            <i :class="item.icon" />
            <span v-if="isSidebarExpanded" class="ms-2">
              {{ item.name }}
            </span>
          </router-link>
        </li>
      </ul>
    </aside>
    <div class="d-flex flex-column flex-grow-1 min-vh-100 col">
      <header class="bg-light border-bottom">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid d-flex justify-content-between align-items-center p-3">
            <div>
              <slot name="header"></slot>
            </div>
            <div class="d-flex align-items-center gap-3">
              <DropdownMenu
                :menuOptions="menuOptions"
                :menuItems="getMenuItems(brandStore.brands)"
                @item-click="handleBrandSelection"
              >
                <template #button-content>
                  <img
                    :src="
                      brandStore.selectedBrand?.logo ||
                      'https://i.pinimg.com/236x/22/09/02/220902e0b406bbd28afccd44a3551b1e.jpg'
                    "
                    :alt="
                      brandStore.selectedBrand?.name ||
                      'https://i.pinimg.com/236x/22/09/02/220902e0b406bbd28afccd44a3551b1e.jpg'
                    "
                    class="rounded-2"
                    style="width: 40px; height: 40px"
                  />
                  <p class="m-0 d-none d-md-inline">
                    {{ brandStore.selectedBrand?.name || 'Seleccionar marca' }}
                  </p>
                </template>
                <template #button-icon>
                  <i class="bi bi-chevron-compact-down"></i>
                </template>
              </DropdownMenu>
              <DropdownMenu :menuOptions="menuUserOptions" />
            </div>
          </div>
        </nav>
      </header>
      <main class="flex-grow-1">
        <div class="container py-4">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.col-1 {
  transition: width 0.3s;
  width: 80px;
}
.col-3 {
  transition: width 0.3s;
  width: 250px;
}
</style>
