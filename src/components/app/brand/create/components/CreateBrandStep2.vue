<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import { TargetAudience, TargetBrandGender } from '@/enum/brand.enum'

import FloatInputArea from '@/components/input/FloatInputArea.vue'
import MultipleSelectInput from '@/components/input/MultipleSelectInput.vue'

import { descriptionValidations } from '@/validation/components/forms/brand.validation'

import type { IBrand } from '@/interfaces/Brand/brand.interface'

const emit = defineEmits(['update:brand-data'])

const audienceOptions = Object.values(TargetAudience)

const selectedAgeRanges = ref<string[]>([])
const selectedGenders = ref<TargetBrandGender[]>([])

const formData = reactive<Partial<IBrand>>({
  targetAudience: {
    ageRange: [''],
    gender: [TargetBrandGender.NOT_SURE],
    preferences: ''
  }
})

const genders: { value: TargetBrandGender; label: string }[] = [
  { value: TargetBrandGender.MALE, label: 'Masculino' },
  { value: TargetBrandGender.FEMALE, label: 'Femenino' },
  { value: TargetBrandGender.NOT_SURE, label: 'No estoy seguro' }
]

const isFormDataValid = computed(() => {
  const preferencesValid =
    formData.targetAudience!.preferences.length > 0 &&
    formData.targetAudience!.preferences.length <= 500
  const ageRangeValid = selectedAgeRanges.value.length > 0
  const genderValid = selectedGenders.value.length > 0
  return preferencesValid && ageRangeValid && genderValid
})

function updateFormData(
  field: keyof IBrand['targetAudience'],
  value: any
): void {
  if (formData.targetAudience) {
    formData.targetAudience[field] = value
  }
}

watch(
  [
    selectedAgeRanges,
    selectedGenders,
    () => formData.targetAudience?.preferences
  ],
  () => {
    if (isFormDataValid.value) {
      updateFormData('ageRange', [...selectedAgeRanges.value])
      updateFormData('gender', [...selectedGenders.value])
      emit('update:brand-data', formData)
    }
  }
)
</script>

<template>
  <div>
    <h5>Configuración de audiencia</h5>
    <hr class="my-4" />

    <h6>Escribe lo que consideres le guste a tu público objetivo</h6>
    <FloatInputArea
      label="Preferencias de tu público"
      inputId="preferences"
      placeholder="Escribe lo que consideres le gusta a tu público"
      v-model:modelValue="formData.targetAudience!.preferences"
      :validations="descriptionValidations"
      @input="updateFormData('preferences', $event.target.value)"
    />
    <hr class="my-4" />

    <div class="mb-3">
      <MultipleSelectInput
        v-model="selectedAgeRanges"
        :options="audienceOptions"
        label="Selecciona tu público objetivo"
        id="ageRangeSelector"
      />
      <hr class="my-4" />
      <MultipleSelectInput
        v-model="selectedGenders"
        :options="genders.map((gender) => gender.label)"
        label="Selecciona los géneros objetivo que crees que les puede interesar tu producto"
        id="genderSelector"
      />
    </div>
  </div>
</template>
