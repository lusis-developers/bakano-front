<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

import type { Navigation } from '@/interfaces/Layout/LinkTypes.interface'

const props = defineProps({
  items: {
    type: Array as () => Navigation[],
    required: true
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
      <li v-for="(item, index) in props.items" :key="index">
        <router-link
          :to="item.link"
          @click="emits('item-click', item)"
          class="dropdown-item d-flex align-items-center"
        >
          <i :class="item.icon" class="me-2" />
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
