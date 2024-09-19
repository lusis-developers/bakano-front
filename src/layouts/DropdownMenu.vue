<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface MenuItem {
  name: string
  icon: string
  link: string
}

const props = defineProps({
  items: {
    type: Array as () => MenuItem[],
    required: true
  }
})

const emits = defineEmits(['item-click'])
</script>

<template>
  <div class="dropdown">
    <button
      class="btn btn-light d-flex align-items-center gap-2"
      type="button"
      id="dropdownMenuButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <!-- Slot para el contenido del botón -->
      <slot name="button-content">Menú</slot>
      <i class="bi bi-chevron-down ms-2"></i>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li v-for="(item, index) in props.items" :key="index">
        <router-link
          @click="emits('item-click', item)"
          class="dropdown-item d-flex align-items-center"
          :to="item.link"
        >
          <i :class="item.icon" class="me-2"></i>{{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
