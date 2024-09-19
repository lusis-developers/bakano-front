<script setup lang="ts">
import { ref } from 'vue'

interface MenuItem {
  name: string
  icon: string
  link: string
}

// Puedes definir tus items aquí o recibirlos como una prop
const items = ref<MenuItem[]>([
  { name: 'Perfil', icon: 'bi bi-person', link: '#' },
  { name: 'Ajustes', icon: 'bi bi-gear', link: '#' },
  { name: 'Cerrar sesión', icon: 'bi bi-box-arrow-right', link: '#' },
])
</script>

<template>
  <div class="dropdown">
    <button class="btn btn-light d-flex align-items-center gap-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
      <!-- Slot para el contenido del botón -->
      <slot name="button-content">Menú</slot>
      <i class="bi bi-chevron-down ms-2"></i>

    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li v-for="item in items" :key="item.name">
        <router-link class="dropdown-item d-flex align-items-center" :to="item.link">
          <i :class="item.icon" class="me-2"></i>{{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
