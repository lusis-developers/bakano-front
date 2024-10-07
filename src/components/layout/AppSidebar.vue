<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import useBrandStore from '@/stores/brand.store'

import { menuUserOptions } from '@/utils/menuItems.utils'

import CreateBrand from '../app/brand/create/CreateBrand.vue'
import DropdownMenu from './DropdownMenu.vue'
import logoImage from '@/assets/brand/bakano-blanco.png'
import type { Navigation } from '@/interfaces/components/Layout/LinkTypes.interface'

const brandStore = useBrandStore()

defineProps({
  sidebarItems: {
    type: Array as () => Navigation[],
    required: true
  }
})

const isSidebarExpanded = ref(false)
const isCreateBrandModalVisible = ref(false)

function updateSidebarState(): void {
  isSidebarExpanded.value = window.innerWidth >= 768
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
  <aside
    class="bg-dark vh-100 d-flex flex-column p-3 border-end justify-content-between"
    :class="isSidebarExpanded ? 'col-3' : 'col-1'"
  >
    <div class="d-flex flex-column align-items-start h-100">
      <div class="d-flex align-items-center mb-4">
        <img
          :src="logoImage"
          alt="Logo"
          class="img-fluid"
          style="max-height: 50px"
        />
      </div>

      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item" v-if="!brandStore.selectedBrand">
          <button
            class="nav-link text-white d-flex align-items-center bg-transparent border-0"
            @click="isCreateBrandModalVisible = true"
          >
            <i class="bi bi-plus-square"></i>
            <span v-if="isSidebarExpanded" class="ms-2">Agregar marca</span>
          </button>
        </li>
        <li v-for="(item, index) in sidebarItems" :key="index" class="nav-item">
          <router-link
            :to="item.link"
            class="nav-link text-white d-flex align-items-center"
            :class="isSidebarExpanded ? '' : 'justify-content-center'"
            active-class="bg-primary"
          >
            <i :class="item.icon"></i>
            <span v-if="isSidebarExpanded" class="ms-2">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>

      <DropdownMenu :menuOptions="menuUserOptions" :isDarkMode="true" />
      <CreateBrand
        :isVisible="isCreateBrandModalVisible"
        @update:isVisible="isCreateBrandModalVisible = $event"
      />
    </div>
  </aside>
</template>

<style scoped>
.col-1 {
  transition: width 0.3s ease;
  width: 80px;
}
.col-3 {
  transition: width 0.3s ease;
  width: 250px;
}
</style>
