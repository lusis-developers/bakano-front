<script setup lang="ts">
import { reactive } from 'vue'

import FloatInput from '@/components/input/FloatInput.vue'
import type { IBrand } from '@/interfaces/Brand/brand.interface'
import { TargetBrandGender } from '@/enum/brand.enum'
import { wordValidation } from '@/validation/components/ProfileSettings'
// import UploadFileInput from '@/components/input/uploadFileInput.vue';

const formData = reactive<Partial<IBrand>>({
  name: '',
  targetAudience: {
    gender: [TargetBrandGender.NOT_SURE],
    ageRange: '',
    preferences: ''
  }
})

// async function handleFile (file: File) {
//   console.log('file: ', file)
// }
</script>

<template>
  <div>
    <form @submit.prevent="">
      <p>Llena los primeros datos ⭐</p>
      <div class="mb-3">
        <FloatInput
          label="Nombre de la marca"
          inputId="brandName"
          v-model:modelValue="formData.name"
          :validations="wordValidation"
        />
        <FloatInput
          label="País de operaciones"
          inputId="operationCountries"
          v-model:modelValue="formData.operationCountry"
          :validations="wordValidation"
        />
      </div>
    </form>
  </div>
</template>
