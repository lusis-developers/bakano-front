<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

import type { Navigation } from '@/interfaces/Layout/LinkTypes.interface'
import type { MenuDropdownItem } from '@/interfaces/Layout/MenuDropdownItems.interface'

const props = defineProps({
  menuOptions: {
    type: Array as () => Navigation[],
    required: true
  },
  menuItems: {
    type: Array as () => MenuDropdownItem[],
    required: false
  }
})

const emits = defineEmits(['item-click'])
</script>

<template>
  <div class="dropdown">
    <button
      type="button"
      id="dropdownMenuButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      class="btn btn-light d-flex align-items-center gap-2"
    >
      <slot name="button-content">Menú</slot>
      <i class="bi bi-chevron-down ms-2"></i>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <!-- Menu options generales -->
      <li v-for="(item, index) in props.menuOptions" :key="index">
        <router-link
          :to="item.link"
          @click="emits('item-click', item)"
          class="dropdown-item d-flex align-items-center"
        >
          <i :class="item.icon" class="me-2" />
          {{ item.name }}
        </router-link>
      </li>

      <!-- Separador visual -->
      <li><hr class="dropdown-divider" /></li>

      <!-- Items de marcas (menuItems) -->
      <li v-for="(item, index) in props.menuItems" :key="index">
        <router-link
          :to="item.link"
          @click="emits('item-click', item)"
          class="dropdown-item d-flex align-items-center"
        >
          <img :src="item.logo" alt="Logo" class="me-2" style="width: 30px; height: 30px" />
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
