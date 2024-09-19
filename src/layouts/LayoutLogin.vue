<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isSidebarExpanded = ref(false)
const activeItemIndex = ref(0)
const itemClasses = (index: number) => ({
  'text-dark': activeItemIndex.value !== index,
  'text-white': activeItemIndex.value === index,
  'text-bg-primary': activeItemIndex.value === index
})

function updateSidebarState(): void {
  isSidebarExpanded.value = window.innerWidth >= 750
}
const navItems = [
  { name: 'Resumen', icon: 'bi bi-card-checklist', link: '#' },
  { name: 'Generar planificación', icon: 'bi bi-journal-richtext', link: '#' },
  { name: 'Generar post específico', icon: 'bi bi-file-post', link: '#' },
]

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
      class="bg-light vh-100 d-flex flex-column p-3"
      :class="isSidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'"
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
        <li v-for="(item, index) in navItems" :key="index" class="nav-item fs-5">
          <router-link
            :to="item.link"
            :class="[
              'nav-link',
              'd-flex',
              'align-items-center',
              isSidebarExpanded ? 'justify-content-start' : 'justify-content-center',
              itemClasses(index)
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
    <div class="d-flex flex-column flex-grow-1 min-vh-100">
      <header class="bg-light">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid d-flex justify-content-between align-items-center p-3">
            <div>
              <slot name="header"></slot>
            </div>
            <div class="d-flex align-items-center">
              <img
                src="https://i.pinimg.com/236x/22/09/02/220902e0b406bbd28afccd44a3551b1e.jpg"
                alt="Profile picture"
                class="rounded-circle"
                style="width: 40px; height: 40px"
              />
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

<style scoped lang="scss">
.sidebar-collapsed {
  width: 80px;
  transition: width 0.3s;
}

.sidebar-expanded {
  width: 250px;
  transition: width 0.3s;
}
</style>