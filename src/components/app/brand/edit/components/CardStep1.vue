<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

import { PrincipalCountries } from '@/enum/brand.enum'

import useBrandStore from '@/stores/brand.store'

import FloatInput from '@/components/input/FloatInput.vue'
import SelectInput from '@/components/input/SelectInput.vue'
import GeneralCard from '@/components/shared/GeneralCard.vue'

import {
  mainAddressValidations,
  nameBrandValidations
} from '@/validation/components/forms/brand.validation'

import type { IBrand } from '@/interfaces/Brand/brand.interface'

const brandStore = useBrandStore()

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
  const nameValid = nameBrandValidations.every((validation) =>
    validation.rule(formData.name || '')
  )
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
  <GeneralCard title="Primeros">
    <template #content>
      <h5>Actual nombre</h5>
      <p class="text-muted">
        {{ brandStore.selectedBrand?.name }}
      </p>
      <FloatInput
        label="Actualiza el nombre de la marca"
        inputId="brandName"
        v-model:modelValue="formData.name"
        :validations="nameBrandValidations"
        @input="updateField('name', $event.target.value)"
      />
      <hr class="my-4" />
      <h5>Actual de operaciones</h5>
      <p class="text-muted">
        {{ brandStore.selectedBrand?.operationCountry }}
      </p>
      <SelectInput
        label="País de operaciones"
        icon="bi bi-globe-americas"
        inputId="countryOperation"
        :options="countryOptions"
        @update:modelValue="
          (value: string) => updateField('operationCountry', value)
        "
      />
      <hr class="my-4" />
      <h5>Dirección principal actual</h5>
      <p class="text-muted">
        {{ brandStore.selectedBrand?.mainAddress }}
      </p>
      <FloatInput
        label="Dirección principal actual"
        inputId="mainAddress"
        v-model:modelValue="formData.mainAddress"
        :validations="mainAddressValidations"
        @input="updateField('mainAddress', $event.target.value)"
      />
    </template>
  </GeneralCard>
</template>
