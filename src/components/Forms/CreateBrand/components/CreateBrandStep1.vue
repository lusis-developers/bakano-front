<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

import FloatInput from '@/components/input/FloatInput.vue'
import SelectInput from '@/components/input/SelectInput.vue'
import {
  mainAddressValidations,
  nameBrandValidations
} from '@/validation/components/forms/brand.validation'
import type { IBrand } from '@/interfaces/Brand/brand.interface'
import { PrincipalCountries } from '@/enum/brand.enum'

const emit = defineEmits(['update:brand-data'])

const formData = reactive<Partial<IBrand>>({
  name: '',
  operationCountry: '',
  mainAddress: ''
})

const countryOptions = computed(() => {
  return Object.values(PrincipalCountries).map((country) => ({
    value: country,
    label: country
  }))
})

const isFormDataValid = computed(() => {
  const nameValid = nameBrandValidations.every((validation) => validation.rule(formData.name || ''))
  const addressValid = mainAddressValidations.every((validation) =>
    validation.rule(formData.mainAddress || '')
  )

  return nameValid && addressValid
})

function updateField(field: keyof IBrand, value: any): void {
  formData[field] = value
  if (isFormDataValid.value) {
    emit('update:brand-data', formData)
  }
}

watch(formData, () => {
  if (isFormDataValid.value) {
    emit('update:brand-data', formData)
  }
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
          :validations="nameBrandValidations"
          @input="updateField('name', $event.target.value)"
        />
        <hr class="my-4" />
        <SelectInput
          label="País de operaciones"
          icon="bi bi-globe-americas"
          inputId="countryOperation"
          :options="countryOptions"
          @update:modelValue="(value) => updateField('operationCountry', value)"
        />
        <hr class="my-4" />
        <FloatInput
          label="Dirección principal"
          inputId="mainAddress"
          v-model:modelValue="formData.mainAddress"
          :validations="mainAddressValidations"
          @input="updateField('mainAddress', $event.target.value)"
        />
      </div>
    </form>
  </div>
</template>
