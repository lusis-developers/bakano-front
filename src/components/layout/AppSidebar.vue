<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

import logoImage from '@/assets/brand/bakano-blanco.png'

import type { Navigation } from '@/interfaces/components/Layout/LinkTypes.interface'

defineProps({
  sidebarItems: {
    type: Array as () => Navigation[],
    required: true
  }
})

const activeItemIndex = ref(0)
const isSidebarExpanded = ref(false)

function getItemClasses(index: number): { [key: string]: boolean } {
  return {
    'text-white': activeItemIndex.value === index,
    'bg-primary': activeItemIndex.value === index
  }
}

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
    class="bg-dark vh-100 d-flex flex-column p-3 border-end"
    :class="isSidebarExpanded ? 'col-3' : 'col-1'"
  >
    <div class="d-flex align-items-center mb-3">
      <img :src="logoImage" alt="Logo" class="img-fluid" style="max-height: 50px" />
    </div>
    <ul class="mt-4 nav nav-pills flex-column">
      <li v-for="(item, index) in sidebarItems" :key="index" class="nav-item fs-6">
        <router-link
          :to="item.link"
          :class="[
            'd-flex',
            'align-items-center',
            'text-white',
            isSidebarExpanded ? '' : 'justify-content-center',
            getItemClasses(index)
          ]"
          @click.prevent="activeItemIndex = index"
          class="nav-link"
        >
          <i :class="item.icon" />
          <span v-if="isSidebarExpanded" class="ms-2">
            {{ item.name }}
          </span>
        </router-link>
      </li>
    </ul>
  </aside>
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
