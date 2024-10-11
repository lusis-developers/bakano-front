<script setup lang="ts">
import { useEditBrand } from '@/composables/components/brand/editBrand'

import useBrandStore from '@/stores/brand.store'

import SpinnerLoader from '@/components/shared/SpinnerLoader.vue'

import EditBasicInfo from './components/EditBasicInfo.vue'

const {
  activeStep,

  steps,
  setStep
} = useEditBrand()

const brandStore = useBrandStore()
</script>

<template>
  <div>
    <div class="d-flex flex-column align-items-center gap-3 flex-grow-1">
      <div class="btn-group" role="group" aria-label="Steps navigation">
        <button
          v-for="(step, index) in steps"
          :key="index"
          class="btn btn-outline-primary"
          :class="{ active: activeStep === index + 1 }"
          @click="setStep(index + 1)"
        >
          <i :class="`bi ${step.icon}`" /> {{ step.label }}
        </button>
      </div>
      <SpinnerLoader v-if="brandStore.isLoading" />
      <template v-else>
        <div v-if="activeStep === 1" class="w-100 flex-grow-1">
          <EditBasicInfo />
        </div>
        <div v-if="activeStep === 2" class="w-100 flex-grow-1">
          <h4>Actualiza la configuración de tu audiencia</h4>
        </div>
        <div v-if="activeStep === 3" class="w-100 flex-grow-1">
          <h4>Actualiza la industria de tu marca</h4>
        </div>
      </template>
    </div>
  </div>
</template>
