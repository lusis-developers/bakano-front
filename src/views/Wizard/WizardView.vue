<script setup lang="ts">
import { ref } from 'vue'

import FisrtStep from './components/FisrtStep.vue'
import SecondStep from './components/SecondStep.vue'
import ThirdStep from './components/ThirdStep.vue'

const currentStep = ref(1)

const usageCount = ref('')
const usageType = ref('')
const foundUsBy = ref('')
const jobDescription = ref('')
const gender = ref('')

function nextStep(data: any): void {
  if (data) {
    usageCount.value = data.usageCount || usageCount.value
    usageType.value = data.usageType || usageType.value
    foundUsBy.value = data.foundUsBy || foundUsBy.value
    jobDescription.value = data.jobDescription || jobDescription.value
    gender.value = data.gender || gender.value
  }

  if (currentStep.value < 3) {
    currentStep.value++
  } else {
    sendData()
  }
}
function prevStep(): void {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function sendData(): void {
  const data = {
    usageCount: usageCount.value,
    usageType: usageType.value,
    foundUsBy: foundUsBy.value,
    jobDescription: jobDescription.value,
    gender: gender.value
  }
  console.log(data)
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 p-4">
    <div class="w-100 custom-width">
      <FisrtStep
        v-if="currentStep === 1"
        @next="nextStep"
        :usageCount="usageCount"
        :usageType="usageType"
        :foundUsBy="foundUsBy"
      />
      <SecondStep
        v-if="currentStep === 2"
        @next="nextStep"
        @prev="prevStep"
        :jobDescription="jobDescription"
      />
      <ThirdStep
        v-if="currentStep === 3"
        @next="nextStep"
        @prev="prevStep"
        :gender="gender"
      />
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
