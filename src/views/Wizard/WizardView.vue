<script setup lang="ts">
import { ref } from 'vue'

import FisrtStep from './components/FisrtStep.vue'
import SecondStep from './components/SecondStep.vue'

const currentStep = ref(1)

function nextStep(): void {
  if (currentStep.value < 2) {
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
    <FisrtStep v-if="currentStep === 1" @next="nextStep" />
    <SecondStep v-if="currentStep === 2" @next="nextStep" @prev="prevStep" />
  </div>
</template>
