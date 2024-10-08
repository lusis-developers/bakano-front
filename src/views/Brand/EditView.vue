<script setup lang="ts">
import { ref, watch } from 'vue'

import useBrandStore from '@/stores/brand.store'

import EditBrand from '@/components/app/brand/edit/EditBrand.vue'

const brandStore = useBrandStore()
const colorClass = ref<'text-primary' | 'text-secondary' | 'text-info'>(
  'text-primary'
)
watch(
  () => brandStore.selectedBrand?.name,
  (newName, oldName) => {
    if (newName !== oldName) {
      colorClass.value =
        colorClass.value === 'text-primary'
          ? 'text-secondary'
          : colorClass.value === 'text-secondary'
            ? 'text-info'
            : 'text-primary'
    }
  }
)
</script>

<template>
  <div class="w-100">
    <h2>Editar marca</h2>
    <div
      class="d-flex justify-content-between align-items-center flex-wrap gap-3"
    >
      <h3>
        Marca seleccionada:
        <span :class="[colorClass]">{{
          brandStore.selectedBrand?.name.toLocaleUpperCase()
        }}</span>
      </h3>
      <img
        :src="brandStore.selectedBrand?.logo"
        :alt="brandStore.selectedBrand?.name"
      />
    </div>
    <EditBrand />
  </div>
</template>
