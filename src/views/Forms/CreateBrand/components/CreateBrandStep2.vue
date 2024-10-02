<script setup>
import { ref } from 'vue'
import MultipleSelectInput from '@/components/input/multipleSelectInput.vue'

const selectedAgeRanges = ref([])

const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75 o más']

const handleSubmit = () => {
  console.log('Rangos de edad seleccionados:', selectedAgeRanges.value)
}
</script>

<template>
  <div>
    <h5>Audiencia objetivo</h5>
    <div class="mb-3">
      <MultipleSelectInput
        v-model="selectedAgeRanges"
        :options="ageRanges"
        label="Rangos de Edad"
        id="ageRangeSelector"
      />
    </div>
  </div>
</template>
