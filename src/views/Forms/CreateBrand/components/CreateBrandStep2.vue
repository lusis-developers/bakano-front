<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import MultipleSelectInput from '@/components/input/multipleSelectInput.vue'
import { TargetAudience, TargetBrandGender } from '@/enum/brand.enum'
import FloatInput from '@/components/input/FloatInput.vue'
import type { IBrand } from '@/interfaces/Brand/brand.interface';

const emit = defineEmits(['update:brand-data'])

const selectedAgeRanges = ref<string[]>([])
const selectedGenders = ref<TargetBrandGender[]>([])
const publicPreferences = ref<string>('')

const formData = reactive<Partial<IBrand>>({
  targetAudience: {
    ageRange: [''],
    gender: [TargetBrandGender.NOT_SURE],
    preferences: ''
  }
})

const genders = [
  { value: TargetBrandGender.MALE, label: 'Masculino' },
  { value: TargetBrandGender.FEMALE, label: 'Femenino' },
  { value: TargetBrandGender.NOT_SURE, label: 'No estoy seguro' }
]

function updateFormData (field: keyof IBrand['targetAudience'], value: any): void {
  if (formData.targetAudience) {
    formData.targetAudience[field] = value
  }
}

watch([selectedAgeRanges, selectedGenders, publicPreferences], () => {
  updateFormData('ageRange', [...selectedAgeRanges.value]) 
  updateFormData('gender', [...selectedGenders.value]) 
  updateFormData('preferences', publicPreferences.value)
  emit('update:brand-data', formData)
})
</script>

<template>
  <div>
    <h5>Configuración de audiencia</h5>
    <div class="mb-3">
      <MultipleSelectInput
        v-model="selectedAgeRanges"
        :options="TargetAudience"
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
      <hr class="my-4" />
      <h6>Escribe lo que consideres le guste a tu público objetivo</h6>
      <FloatInput
        label="Preferencias de tu público"
        inputId="preferences"
        placeholder="Escribe lo que consideres le gusta a tu público"
        v-model:modelValue="publicPreferences"
        :validations="[]"
        @input="updateFormData('preferences', $event.target.value)"
      />
    </div>
  </div>
</template>
