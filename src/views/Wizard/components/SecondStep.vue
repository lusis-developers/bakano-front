<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { JobDescription } from '@/enum/user.enum'
const emit = defineEmits(['next', 'prev'])
const props = defineProps({
  jobDescription: String
})

const jobDescription = ref(props.jobDescription || '')

const isFormValid = computed(() => {
  return jobDescription.value !== ''
})

function submitForm(): void {
  if (isFormValid.value) {
    emit('next', { jobDescription: jobDescription.value })
  }
}
function goBack(): void {
  emit('prev')
}

watch(
  () => props.jobDescription,
  (newVal) => (jobDescription.value = newVal!)
)
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
      <button class="btn btn-primary" @click="submitForm" :disabled="!isFormValid">Adelante</button>
    </div>
  </div>
</template>
