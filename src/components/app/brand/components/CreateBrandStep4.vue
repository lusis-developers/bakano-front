<script setup lang="ts">
import { computed, reactive } from 'vue'

import FloatInput from '@/components/input/FloatInput.vue'

import { descriptionValidations } from '@/validation/components/forms/brand.validation'

import type { IBrand } from '@/interfaces/Brand/brand.interface'

const emit = defineEmits(['update:brand-data'])

const formData = reactive<Partial<IBrand>>({
  description: ''
})
const isDescriptionValid = computed(() =>
  descriptionValidations.every((validation) =>
    validation.rule(formData.description!)
  )
)

function updateDescription(value: string) {
  formData.description = value
  if (isDescriptionValid.value) {
    emit('update:brand-data', formData)
  }
}
</script>

<template>
  <div>
    <h5>Una última cosa...</h5>
    <FloatInput
      label="Describe un poco lo que hace tu marca"
      inputId="brandDescription"
      placeholder="Describe un poco lo que hace tu marca"
      :validations="descriptionValidations"
      @input="updateDescription($event.target.value)"
    />
  </div>
</template>
