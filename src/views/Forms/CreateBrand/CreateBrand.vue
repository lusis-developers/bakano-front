<script setup lang="ts">
import { reactive, ref } from 'vue'

import GlobalModal from '@/components/shared/GlobalModal.vue'
import CreateBrandStep1 from './components/CreateBrandStep1.vue'
import CreateBrandStep2 from './components/CreateBrandStep2.vue'
import CreateBrandStep3 from './components/CreateBrandStep3.vue'
import type { IBrand } from '@/interfaces/Brand/brand.interface'
import { TargetBrandGender } from '@/enum/brand.enum'

const currentStep = ref(1)

defineProps({
  isVisible: {
    type: Boolean,
    required: true,
    default: true
  }
})

const formData: IBrand = reactive({
  name: '',
  description: '',
  logo: '',
  industry: '',
  operationCountry: '',
  targetAudience: {
    ageRange: '',
    gender: [TargetBrandGender.EMPTY],
    preferences: ''
  },
  user: '',
  id: ''
})

function handleClose(): void {
  console.log('Se ha cerrado el modal')
}

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
  <div class="create-brand">
    <GlobalModal :modelValue="isVisible" @close="handleClose">
      <template #header>
        <h2>Crear marca 📌</h2>
      </template>
      <template #content>
        <CreateBrandStep1 v-if="currentStep === 1" @next="nextStep" />
        <CreateBrandStep2 v-if="currentStep === 2" @next="nextStep" @prev="prevStep" />
        <CreateBrandStep3 v-if="currentStep === 3" @prev="prevStep" />
      </template>
      <template #footer>
        <div class="d-flex justify-content-between">
          <button @click="prevStep" :disabled="currentStep === 1" class="btn bg-primary text-white">
            Anterior
          </button>
          <button @click="nextStep" :disabled="currentStep === 3" class="btn bg-primary text-white">
            Siguiente
          </button>
        </div>
      </template>
    </GlobalModal>
  </div>
</template>
