<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isSidebarExpanded = ref(false);
const activeItemIndex = ref(0);


function updateSidebarState(): void {
  isSidebarExpanded.value = window.innerWidth >= 750; 
};
const navItems = [
  { name: 'Resumen', icon: 'bi bi-journal-richtext', link: '/' },
  { name: 'Web', icon: 'bi bi-globe', link: '/' },
  { name: 'Facebook', icon: 'bi bi-facebook', link: '/' },
];

onMounted(() => {
  updateSidebarState();
  window.addEventListener('resize', updateSidebarState);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSidebarState);
});
</script>

<template>
  <div class="d-flex">
    <aside
      class="bg-light vh-100 d-flex flex-column p-3 sidebar"
      :class="{ 'sidebar-expanded': isSidebarExpanded }">
      <div class="d-flex align-items-center mb-3">
        <img
          src="../assets/brand/bakano-negro.png"
          alt="Logo"
          class="img-fluid"
          style="max-height: 50px;"
        >
      </div>
      <ul class="mt-4 nav nav-pills flex-column">
        <li 
          v-for="(item, index) in navItems" 
          :key="index"
          class="nav-item fs-5">
          <router-link
            :to="item.link"
            :class="['nav-link', 'd-flex', 'align-items-center', { 'active': activeItemIndex === index }]" 
            @click.prevent="activeItemIndex = index">
            <i :class="item.icon" />
            <span 
              v-if="isSidebarExpanded"  
              class="ms-2"> 
              {{ item.name }} 
            </span>
          </router-link>
        </li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="d-flex flex-column flex-grow-1 min-vh-100">
      <!-- Header -->
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
                style="width: 40px; height: 40px;"
              >
            </div>
          </div>
        </nav>
      </header>

      <!-- Main -->
      <main class="flex-grow-1">
        <div class="container py-4">
          <!-- Main content -->
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  width: 80px;
  transition: width 0.3s;

  &-expanded {
    width: 250px;

    .nav-link {
      justify-content: flex-start;
    }
  }

  .nav-link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem;

    span {
      display: none;
    }
  }
}

.sidebar-expanded .nav-link span {
  display: inline;
}

.nav-link.active {
  background-color: #007bff;
  color: white;
}
</style>
