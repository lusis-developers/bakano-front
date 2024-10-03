<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { allCountries } from 'country-region-data'

import FloatInput from '@/components/input/FloatInput.vue'
import type { IBrand, UserTargetAudience } from '@/interfaces/Brand/brand.interface'
import SelectInput from '@/components/input/SelectInput.vue'

const emit = defineEmits(['update:brand-data'])

const formData = reactive<Partial<IBrand>>({
  name: '',
  operationCountry: '',
  mainAddress: ''
})

const countryOptions = computed(() => {
  return allCountries.map((c) => ({ value: c[0], label: c[0] }))
})

function isTargetAudienceField(field: keyof IBrand | keyof UserTargetAudience): boolean {
  return ['ageRange', 'gender', 'preferences'].includes(field as string)
}

function updateTargetAudienceField(field: keyof UserTargetAudience, value: any): void {
  if (!formData.targetAudience) {
    console.error('La audiencia objetivo no está definida en formData.')
    return
  }

  formData.targetAudience[field] = value
  console.log(`Campo ${field} de targetAudience actualizado:`, value)
}

function updateBrandField(field: keyof IBrand, value: any): void {
  formData[field] = value
  console.log(`Campo ${field} de la marca actualizado:`, value)
}

function updateFormData(field: keyof IBrand | keyof UserTargetAudience, value: any): void {
  if (isTargetAudienceField(field)) {
    updateTargetAudienceField(field as keyof UserTargetAudience, value)
  } else {
    updateBrandField(field as keyof IBrand, value)
  }
}

function handleCountrySelected(countrySelected: string): void {
  formData.operationCountry = countrySelected
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
        <hr class="my-4" />
        <SelectInput
          label="País de operaciones"
          icon="bi bi-globe-americas"
          inputId="countryOperation"
          :options="countryOptions"
          @update:modelValue="handleCountrySelected"
        />
        <hr class="my-4" />
        <FloatInput
          label="Dirección principal"
          inputId="mainAddress"
          v-model:modelValue="formData.mainAddress"
          @input="updateFormData('mainAddress', $event.target.value)"
        />
      </div>
    </form>
  </div>
</template>
