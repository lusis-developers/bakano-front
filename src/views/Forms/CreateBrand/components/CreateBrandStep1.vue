<script setup lang="ts">
import { ref } from 'vue';

import FloatInput from '@/components/input/FloatInput.vue';
import type { IBrand } from '@/interfaces/Brand/brand.interface';
import type { TargetBrandGender } from '@/enum/brand.enum';

const formData: Partial<IBrand> = ref({
  name: '',
  targetAudience: {
    gender: [] as TargetBrandGender[]
  }
});

const nameValidation = [
  { rule: (value: string) => !!value.trim(), message: 'El nombre es requerido' },
];
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
      </div>
    </form>
  </div>
</template>
