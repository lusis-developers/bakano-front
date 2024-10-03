<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import { industriesOptions } from '@/utils/industriesOptions.utils'
import FloatInput from '@/components/input/FloatInput.vue'
import SelectInput from '@/components/input/SelectInput.vue'
import UploadFileInput from '@/components/input/uploadFileInput.vue'
import type { IBrand } from '@/interfaces/Brand/brand.interface'

const emit = defineEmits(['update:brand-data'])

const otherIndustry = ref('')

const formData = reactive<Partial<IBrand>>({
  industry: '',
  logo: '',
})

const showOtherIndustryInput = computed(() => {
  return formData.industry === 'Otros'
})

function handleFileSelected(file: File) {
  console.log({ file })
}

function handleIndustryChange(value: string) {
  formData.industry = value
}

watch(formData, () => {
  emit('update:brand-data', formData)
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
      v-model:modelValue="otherIndustry"
    />
    <hr class="my-4" />
    <h5>Sube el logo de tu marca aquí</h5>
    <UploadFileInput @file-selected="handleFileSelected" />
  </div>
</template>
