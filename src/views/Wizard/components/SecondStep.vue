<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import SelectInput from '@/components/input/SelectInput.vue'

import { jobDescriptionOptions } from '@/utils/wizardSelections.utils'

const emit = defineEmits(['next', 'prev'])

const props = defineProps({
  jobDescription: {
    type: String,
    required: false
  }
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
      <SelectInput
        label="Descripción de tu industria"
        icon="bi bi-briefcase-fill"
        :options="jobDescriptionOptions"
        v-model="jobDescription"
      />
    </div>
    <div class="d-flex justify-content-between">
      <button class="btn btn-secondary" @click="goBack">Atrás</button>
      <button
        class="btn btn-primary"
        @click="submitForm"
        :disabled="!isFormValid"
      >
        Adelante
      </button>
    </div>
  </div>
</template>
