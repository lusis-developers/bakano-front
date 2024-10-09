<script setup lang="ts">
import { useBrandForm } from '@/composables/forms/EditBrand'

import useBrandStore from '@/stores/brand.store'

import GeneralNotification from '@/components/shared/GeneralNotification.vue'
import SpinnerLoader from '@/components/shared/SpinnerLoader.vue'

import CardStep1 from './components/CardStep1.vue'
import CardStep2 from './components/CardStep2.vue'
import CardStep3 from './components/CardStep3.vue'

const {
  activeStep,
  brandModified,
  notificationMessage,
  notificationType,
  steps,
  setStep,
  handleDataStep1,
  handleDataStep2,
  handleDataStep3,
  updateBrand
} = useBrandForm()

const brandStore = useBrandStore()
</script>

<template>
  <SpinnerLoader class="w-100" v-if="brandStore.isLoading" />
  <div v-else>
    <div class="w-100 d-flex flex-column align-items-center gap-3 flex-grow-1">
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
      <div v-if="activeStep === 1" class="w-100 flex-grow-1">
        <h4>Llena los primeros datos ⭐</h4>
        <CardStep1
          @update:brand-data="handleDataStep1"
          class="w-100 flex-grow-1"
        />
      </div>
      <div v-if="activeStep === 2" class="w-100 flex-grow-1">
        <h4>Actualiza la configuración de tu audiencia</h4>
        <CardStep2
          @update:brand-data="handleDataStep2"
          class="w-100 flex-grow-1"
        />
      </div>
      <div v-if="activeStep === 3" class="w-100 flex-grow-1">
        <h4>Actualiza la industria de tu marca</h4>
        <CardStep3
          @update:brand-data="handleDataStep3"
          class="w-100 flex-grow-1"
        />
      </div>
    </div>
    <button
      @click="updateBrand"
      :disabled="!brandModified || brandStore.isLoading"
      class="btn btn-primary mt-3"
    >
      guardar
    </button>
    <GeneralNotification
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType!"
    />
  </div>
</template>
