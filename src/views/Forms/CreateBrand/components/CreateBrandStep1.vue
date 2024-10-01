<script setup lang="ts">
import { reactive } from 'vue';

import FloatInput from '@/components/input/FloatInput.vue';
import type { IBrand } from '@/interfaces/Brand/brand.interface';
import { TargetBrandGender } from '@/enum/brand.enum';
import UploadFileInput from '@/components/input/uploadFileInput.vue';

const formData = reactive<Partial<IBrand>>({
  name: '',
  targetAudience: {
    gender: [TargetBrandGender.EMPTY],
    ageRange: '',
    preferences: ''
  },

});

const nameValidation = [
  { rule: (value: string) => !!value.trim(), message: 'El nombre es requerido' },
];

async function handleFile (file: File) {
  console.log('file: ', file)
}
</script>

<template>
  <div>
    <form @submit.prevent="">
      <div class="mb-3">
        <FloatInput
          label="Nombre de la marca" 
          inputId="brandName" 
          v-model:modelValue="formData.name" 
          :validations="nameValidation"
        />
        <div>
          <p>
            Agrega un logo
          </p>
          <UploadFileInput
            @fileSelected="handleFile"/>
        </div>
      </div>
    </form>
  </div>
</template>
