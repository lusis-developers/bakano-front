<script setup lang="ts">
import { reactive, watch } from 'vue'

import FloatInput from '@/components/input/FloatInput.vue'
import type { IBrand, UserTargetAudience } from '@/interfaces/Brand/brand.interface'

const emit = defineEmits(['update:brand-data'])

const formData = reactive<Partial<IBrand>>({
  name: '',
  operationCountry: ''
})

function isTargetAudienceField(field: keyof IBrand | keyof UserTargetAudience): boolean {
  return ['ageRange', 'gender', 'preferences'].includes(field as string);
}

function updateTargetAudienceField(field: keyof UserTargetAudience, value: any): void {
  if (!formData.targetAudience) {
    console.error("La audiencia objetivo no está definida en formData.");
    return;
  }

  formData.targetAudience[field] = value;
  console.log(`Campo ${field} de targetAudience actualizado:`, value);
}

function updateBrandField(field: keyof IBrand, value: any): void {
  formData[field] = value;
  console.log(`Campo ${field} de la marca actualizado:`, value);
}

function updateFormData(field: keyof IBrand | keyof UserTargetAudience, value: any): void {
  if (isTargetAudienceField(field)) {
    updateTargetAudienceField(field as keyof UserTargetAudience, value);
  } else {
    updateBrandField(field as keyof IBrand, value);
  }
}


watch(formData, () => {
  emit('update:brand-data', formData)
})
</script>

<template>
  <div>
    <form @submit.prevent="">
      <p>Llena los primeros datos ⭐</p>
      <div class="mb-3">
        <FloatInput
          label="Nombre de la marca"
          inputId="brandName"
          v-model:modelValue="formData.name"
          @input="updateFormData('name', $event.target.value)"
        />
        <FloatInput
          label="País de operaciones"
          inputId="operationCountries"
          v-model:modelValue="formData.operationCountry"
          @input="updateFormData('operationCountry', $event.target.value)"
        />
      </div>
    </form>
  </div>
</template>
