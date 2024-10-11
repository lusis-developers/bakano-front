<script setup lang="ts">
import { ref } from 'vue'

import useBrandStore from '@/stores/brand.store'

import GlobalCard from '@/components/shared/GlobalCard.vue'

const brandStore = useBrandStore()

const isModalOpen = ref(false)

function openCloseModal(): void {
  isModalOpen.value = !isModalOpen.value
}
</script>

<template>
  <GlobalCard v-if="brandStore.selectedBrand" class="edit-wrapper mx-auto">
    <template #content>
      <div class="d-flex flex-column">
        <div class="w-100 d-flex justify-content-end mb-4">
          <button class="btn btn-light" @click="openCloseModal">
            Editar
            <i class="bi bi-pen"></i>
          </button>
        </div>
        <h5>Industria de tu marca actual</h5>
        <p class="text-muted">
          {{ brandStore.selectedBrand?.industry }}
        </p>
      </div>
    </template>
  </GlobalCard>
</template>
