<script setup lang="ts">
import { ref } from 'vue'

import CardStep1 from './components/CardStep1.vue'
import CardStep2 from './components/CardStep2.vue'
import CardStep3 from './components/CardStep3.vue'

const activeStep = ref(1)

const steps = [
  { icon: 'bi-person-circle', label: 'Información Básica' },
  { icon: 'bi-people', label: 'Audiencia' },
  { icon: 'bi-briefcase', label: 'Industria' }
]

function setStep(step: number) {
  activeStep.value = step
}
</script>

<template>
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
      <CardStep1 class="w-100 flex-grow-1" />
    </div>
    <div v-if="activeStep === 2" class="w-100 flex-grow-1">
      <h4>Actualiza la configuración de tu audiencia</h4>
      <CardStep2 class="w-100 flex-grow-1" />
    </div>
    <div v-if="activeStep === 3" class="w-100 flex-grow-1">
      <h4>Actualiza la industria de tu marca</h4>
      <CardStep3 class="w-100 flex-grow-1" />
    </div>
  </div>
</template>