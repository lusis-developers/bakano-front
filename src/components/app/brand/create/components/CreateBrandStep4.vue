<script setup lang="ts">
import { computed, reactive } from 'vue'

import FloatInputArea from '@/components/input/FloatInputArea.vue'

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
    <FloatInputArea
      label="Describe un poco lo que hace tu marca"
      inputId="brandDescription"
      placeholder="Describe un poco lo que hace tu marca"
      :validations="descriptionValidations"
      @input="updateDescription($event.target.value)"
    />
  </div>
</template>
