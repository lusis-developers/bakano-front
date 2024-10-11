<script setup lang="ts">
import { ref } from 'vue'

import { useEditBrand } from '@/composables/forms/EditBrand'

import useBrandStore from '@/stores/brand.store'

import BrandPicture from '@/components/shared/BrandPicture.vue'
import GlobalCard from '@/components/shared/GlobalCard.vue'

import BasicInfoModal from './BasicInfoModal.vue'

const brandStore = useBrandStore()

// const { resetValues } = useEditBrand()

const isModalOpen = ref(false)

function openCloseModal(): void {
  isModalOpen.value = !isModalOpen.value
}
</script>

<template>
  <GlobalCard v-if="brandStore.selectedBrand" class="edit-wrapper mx-auto">
    <template #content>
      <div class="d-flex flex-column">
        <div class="w-100 d-flex justify-content-between mb-4">
          <BrandPicture
            v-if="brandStore.selectedBrand"
            :image="brandStore.selectedBrand?.logo"
            :name="brandStore.selectedBrand?.name"
          />
          <button class="btn btn-light" @click="openCloseModal">
            Editar
            <i class="bi bi-pen"></i>
          </button>
        </div>
        <h5>Nombre de marca</h5>
        <p class="text-muted">
          {{ brandStore.selectedBrand?.name }}
        </p>

        <h5>País de marca</h5>
        <p class="text-muted">
          {{ brandStore.selectedBrand?.operationCountry }}
        </p>

        <h5>Dirección de marca</h5>
        <p class="text-muted">
          {{ brandStore.selectedBrand?.mainAddress }}
        </p>
      </div>
    </template>
  </GlobalCard>
  <BasicInfoModal :isOpen="isModalOpen" @close-modal="openCloseModal" />
</template>

<style lang="scss" scoped>
.edit-wrapper {
  width: 100%;
  max-width: 520px;
}
</style>
