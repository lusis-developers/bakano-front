<script setup lang="ts">
import { ref } from 'vue'
import { JobDescription } from '@/enum/user.enum'
const emit = defineEmits(['next', 'prev'])

const jobDescription = ref<JobDescription | ''>('')

function submitForm(): void {
  emit('next', { jobDescription: jobDescription.value })
}
function goBack(): void {
  emit('prev')
}
</script>

<template>
  <div class="container">
    <h2>Segundo Paso</h2>
    <div class="mb-3">
      <label for="jobDescription" class="form-label">Descripción del Trabajo</label>
      <select id="jobDescription" v-model="jobDescription" class="form-select">
        <option :value="JobDescription.FREELANCER">Freelancer</option>
        <option :value="JobDescription.MARKETING_AGENCY">Agencia de Marketing</option>
        <option :value="JobDescription.COMPANY">Empresa</option>
        <option :value="JobDescription.CONTENT_CREATOR">Creador de Contenido</option>
      </select>
    </div>
    <div class="d-flex justify-content-between">
      <button class="btn btn-secondary" @click="goBack">Atrás</button>
      <button class="btn btn-primary" @click="submitForm">Adelante</button>
    </div>
  </div>
</template>
