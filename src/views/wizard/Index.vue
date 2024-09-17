<script setup lang="ts">
import { ref } from 'vue'

import Step1 from './components/FirstStep.vue'

const currentStep = ref(1)

function nextStep(): void {
  if (currentStep.value < 4 ) {
    currentStep.value++
  }
}
function prevStep(): void {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}


</script>

<template>
  <div class="container">
    <div class="wizard-wrap">
      <div class="wizard-wrap-header">
        <h2>Estamos a punto de comenzar</h2>
      </div>
      <div class="wizard-content">
        <Step1 
          v-if="currentStep === 1"
          @next="nextStep" />
      </div>
    </div>
  </div>
</template>
