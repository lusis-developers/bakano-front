<script setup>
import { ref } from 'vue'
import MultipleSelectInput from '@/components/input/multipleSelectInput.vue'
import { TargetBrandGender } from '@/enum/brand.enum'
import FloatInput from '@/components/input/FloatInput.vue'

const selectedAgeRanges = ref([])
const selectedGenders = ref([])
const publicPreferences = ref('')

const ageRanges = [
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65-74',
  '75 o más',
  'No estoy seguro'
]

const genders = [
  { value: TargetBrandGender.MALE, label: 'Masculino' },
  { value: TargetBrandGender.FEMALE, label: 'Femenino' },
  { value: TargetBrandGender.BOTH, label: 'Ambos' },
  { value: TargetBrandGender.NOT_SURE, label: 'No estoy seguro' }
]

function handleSubmit () {
  console.log('Rangos de edad seleccionados:', selectedAgeRanges.value)
}
</script>

<template>
  <div>
    <h5>Configuración de audiencia</h5>
    <div class="mb-3">
      <MultipleSelectInput
        v-model="selectedAgeRanges"
        :options="ageRanges"
        label="Selecciona tu público objetivo"
        id="ageRangeSelector"
      />
      <hr class="my-4" />
      <MultipleSelectInput
        v-model="selectedGenders"
        :options="genders.map((gender) => gender.label)"
        label="Selecciona los generes objetivo que crees que les puede interesar tu producto"
        id="ageRangeSelector"
      />
      <hr class="my-4" />
      <h6>
        Escribe lo que consideres le guste a tu público objetivo
      </h6>
      <FloatInput
        label="Preferencias de tu público"
        inputId="brandName"
        placeholder="Escribe lo que consideres le gusta a tu público"
        v-model:modelValue="publicPreferences"
        :validations="[]"
      />
    </div>
  </div>
</template>
