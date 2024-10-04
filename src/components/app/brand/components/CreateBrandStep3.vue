<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

import { industriesOptions } from '@/utils/industriesOptions.utils'
import FloatInput from '@/components/input/FloatInput.vue'
import SelectInput from '@/components/input/SelectInput.vue'
import type { IBrand } from '@/interfaces/Brand/brand.interface'
import { industryValidations } from '@/validation/components/forms/brand.validation'

const emit = defineEmits(['update:brand-data'])

const formData = reactive<Partial<IBrand>>({
  industry: ''
})

const showOtherIndustryInput = computed(() => {
  return formData.industry === 'Otros'
})
const isFormDataValid = computed(() => {
  return formData.industry!.length > 0
})

function handleIndustryChange(selectedIndustry: string) {
  formData.industry = selectedIndustry
}
function updateIndustryField(value: string): void {
  formData.industry = value
}

watch(formData, () => {
  if (isFormDataValid.value) {
    emit('update:brand-data', formData)
  }
})
</script>

<template>
  <div>
    <h5>Detalles de industria</h5>
    <SelectInput
      label="Industria de tu marca"
      icon="bi bi-building-fill"
      inputId="industryBrand"
      :options="industriesOptions"
      @update:modelValue="handleIndustryChange"
    />
    <hr v-if="showOtherIndustryInput" class="my-4" />
    <FloatInput
      v-if="showOtherIndustryInput"
      placeholder="Especifica la industria"
      label="Especifica la industria"
      inputId="industrySpecified"
      v-model:modelValue="formData.industry"
      :validations="industryValidations"
      @input="updateIndustryField($event.target.value)"
    />
  </div>
</template>
