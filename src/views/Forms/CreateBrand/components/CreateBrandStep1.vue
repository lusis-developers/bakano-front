<script setup lang="ts">
import { reactive, watch } from 'vue'

import FloatInput from '@/components/input/FloatInput.vue'
import type { IBrand } from '@/interfaces/Brand/brand.interface'

const emit = defineEmits(['update:brand-data'])

const formData = reactive<Partial<IBrand>>({
  name: '',
  operationCountry: ''
})

function updateFormData (field: keyof IBrand, value: string):void {
  formData[field] = value
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
