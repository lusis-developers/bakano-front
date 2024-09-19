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

function handleItemClick(item: MenuDropdownItem): void {
  if (item.action) {
    item.action()
  } else {
    emits('item-click', item)
  }
}
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
      <slot name="button-content">
        <i class="bi bi-list" />
      </slot>
      <slot name="button-icon"> </slot>
    </button>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
      <li v-for="(item, index) in props.menuOptions" :key="index">
        <router-link
          :to="item.link"
          @click="handleItemClick(item)"
          class="dropdown-item d-flex align-items-center"
        >
          <i :class="item.icon" class="me-2" />
          {{ item.name }}
        </router-link>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li v-for="(item, index) in props.menuItems" :key="index">
        <router-link
          :to="item.link"
          @click.prevent="handleItemClick(item)"
          class="dropdown-item d-flex align-items-center"
        >
          <img :src="item.logo" alt="Logo" class="me-2" style="width: 30px; height: 30px" />
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
