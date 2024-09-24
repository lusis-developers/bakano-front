<script setup lang="ts">
import { ref } from 'vue'

import FisrtStep from './components/FisrtStep.vue'
import SecondStep from './components/SecondStep.vue'
import ThirdStep from './components/ThirdStep.vue'

const currentStep = ref(1)

function nextStep(): void {
  if (currentStep.value < 3) {
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
  <div class="d-flex justify-content-center align-items-center vh-100 p-4">
    <div class="w-100 custom-width">
      <FisrtStep v-if="currentStep === 1" @next="nextStep" />
      <SecondStep v-if="currentStep === 2" @next="nextStep" @prev="prevStep" />
      <ThirdStep v-if="currentStep === 3" @next="nextStep" @prev="prevStep" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-width {
  @media (min-width: 767px) {
    max-width: 50%;
  }
}
</style>
