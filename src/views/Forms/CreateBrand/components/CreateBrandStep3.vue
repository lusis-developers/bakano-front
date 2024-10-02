<script setup lang="ts">
import { computed, ref } from 'vue'

import { industriesOptions } from '@/utils/industriesOptions.utils'
import FloatInput from '@/components/input/FloatInput.vue'
import SelectInput from '@/components/input/SelectInput.vue'
import UploadFileInput from '@/components/input/uploadFileInput.vue'

const selectedIndustry = ref('')

const otherIndustry = ref('')

const showOtherIndustryInput = computed(() => {
  return selectedIndustry.value === 'Otros'
})

function handleFileSelected(file: File) {
  console.log({ file })
}

// Funcion para actualizar selectedIndustry
function handleIndustryChange(value: string) {
  selectedIndustry.value = value
}
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
      v-model="otherIndustry"
    />
    <hr class="my-4" />
    <h5>Sube el logo de tu marca aquí</h5>
    <UploadFileInput @file-selected="handleFileSelected" />
  </div>
</template>
