<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'

import logoImage from '@/assets/brand/bakano-blanco.png'

import type { Navigation } from '@/interfaces/Layout/LinkTypes.interface'

defineProps({
  sidebarItems: {
    type: Array as () => Navigation[],
    required: true
  }
})

const route = useRoute()

const isSidebarExpanded = ref(false)
const activeItemLink = ref('')

function getItemClasses(link: string): { [key: string]: boolean } {
  return {
    'text-white': activeItemLink.value === link,
    'bg-primary': activeItemLink.value === link
  }
}

function updateSidebarState(): void {
  isSidebarExpanded.value = window.innerWidth >= 768
}
function updateActiveItemLink(): void {
  const currentRoute = route.path.replace('/app/', '')
  activeItemLink.value = currentRoute
}

onMounted(() => {
  updateSidebarState()
  updateActiveItemLink()
  window.addEventListener('resize', updateSidebarState)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSidebarState)
})

watch(() => route.path, updateActiveItemLink)
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
            getItemClasses(item.link)
          ]"
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
