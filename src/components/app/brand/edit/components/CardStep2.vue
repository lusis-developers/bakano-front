<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import { TargetAudience, TargetBrandGender } from '@/enum/brand.enum'

import useBrandStore from '@/stores/brand.store'

import FloatInputArea from '@/components/input/FloatInputArea.vue'
import MultipleSelectInput from '@/components/input/multipleSelectInput.vue'
import GeneralCard from '@/components/shared/GeneralCard.vue'

import { descriptionValidations } from '@/validation/components/forms/brand.validation'

import type { IBrand } from '@/interfaces/Brand/brand.interface'

const emit = defineEmits(['update:brand-data'])

const brandStore = useBrandStore()

const formData = reactive<Partial<IBrand>>({
  targetAudience: {
    ageRange: [''],
    gender: [TargetBrandGender.NOT_SURE],
    preferences: ''
  }
})
const selectedAgeRanges = ref<string[]>([])
const selectedGenders = ref<TargetBrandGender[]>([])

const genders: { value: TargetBrandGender; label: string }[] = [
  { value: TargetBrandGender.MALE, label: 'Masculino' },
  { value: TargetBrandGender.FEMALE, label: 'Femenino' },
  { value: TargetBrandGender.NOT_SURE, label: 'No estoy seguro' }
]

const audienceOptions = Object.values(TargetAudience)

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
  <GeneralCard title="Configuración de audiencia">
    <template #content>
      <h5>Preferencias de tu público</h5>
      <p class="text-muted">
        {{ brandStore.selectedBrand?.targetAudience.preferences }}
      </p>
      <FloatInputArea
        label="Preferencias de tu público"
        inputId="preferences"
        placeholder="Escribe lo que consideres le gusta a tu público"
        v-model:modelValue="formData.targetAudience!.preferences"
        :validations="descriptionValidations"
        @input="updateFormData('preferences', $event.target.value)"
      />
      <hr class="my-4" />

      <h5>Publicos objetivos</h5>
      <p class="text-muted">
        {{ brandStore.selectedBrand?.targetAudience.ageRange.join(', ') }}
      </p>
      <MultipleSelectInput
        v-model="selectedAgeRanges"
        :options="audienceOptions"
        label="Selecciona tu público objetivo"
        id="ageRangeSelector"
      />
      <hr class="my-4" />
      <h5>Géneros objetivos</h5>
      <p class="text-muted">
        {{ brandStore.selectedBrand?.targetAudience.gender.join(', ') }}
      </p>
      <MultipleSelectInput
        v-model="selectedGenders"
        :options="genders.map((gender) => gender.label)"
        label="Selecciona los géneros objetivo que crees que les puede interesar tu producto"
        id="genderSelector"
      />
    </template>
  </GeneralCard>
</template>
