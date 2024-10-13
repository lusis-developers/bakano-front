<script setup lang="ts">
import { computed, ref } from 'vue'

import { TargetBrandGender } from '@/enum/brand.enum'

import { useEditBrand } from '@/composables/components/brand/editBrand'

import useBrandStore from '@/stores/brand.store'

import GlobalCard from '@/components/shared/GlobalCard.vue'

import AudienceModal from './AudienceModal.vue'

const brandStore = useBrandStore()

const { brandUpdated } = useEditBrand()

const isModalOpen = ref(false)

const genderTranslationMap: Record<TargetBrandGender, string> = {
  [TargetBrandGender.MALE]: 'masculino',
  [TargetBrandGender.FEMALE]: 'femenino',
  [TargetBrandGender.NOT_SURE]: 'no estoy seguro'
}

const genderSelected = computed(
  () =>
    brandUpdated.targetAudience?.gender.map(
      (gender) => genderTranslationMap[gender]
    ) || []
)

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

        <h5>Preferencias de tu público</h5>
        <p class="text-muted">
          {{ brandStore.selectedBrand?.targetAudience.preferences }}
        </p>

        <h5>Publicos objetivos</h5>
        <p class="text-muted">
          {{ brandStore.selectedBrand?.targetAudience.ageRange.join(', ') }}
        </p>

        <h5>Géneros objetivos</h5>
        <p class="text-muted">
          {{ genderSelected.join(', ') }}
        </p>
      </div>
    </template>
  </GlobalCard>
  <AudienceModal :isOpen="isModalOpen" @close-modal="openCloseModal" />
</template>
