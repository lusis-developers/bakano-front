<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import {
  foundUsByOptions,
  usageCountOptions,
  usageTypeOptions
} from '@/utils/wizardSelections.utils'

import SelectInput from '@/components/input/SelectInput.vue'

const emit = defineEmits(['next', 'prev'])

const props = defineProps({
  usageCount: {
    type: String,
    required: false
  },
  usageType: {
    type: String,
    required: false
  },
  foundUsBy: {
    type: String,
    required: false
  }
})

const usageCount = ref(props.usageCount || '')
const usageType = ref(props.usageType || '')
const foundUsBy = ref(props.foundUsBy || '')

const isFormValid = computed(() => {
  return usageCount.value !== '' && usageType.value !== '' && foundUsBy.value !== ''
})

function submitForm(): void {
  if (isFormValid.value) {
    emit('next', {
      usageCount: usageCount.value,
      usageType: usageType.value,
      foundUsBy: foundUsBy.value
    })
  }
}

watch(
  () => props.usageCount,
  (newVal) => (usageCount.value = newVal!)
)
watch(
  () => props.usageType,
  (newVal) => (usageType.value = newVal!)
)
watch(
  () => props.foundUsBy,
  (newVal) => (foundUsBy.value = newVal!)
)
</script>

<template>
  <div class="container">
    <h2>Primer Paso</h2>
    <div class="mb-3">
      <SelectInput
        label="Uso de Bakano"
        icon="bi bi-people-fill"
        inputId="usageCount"
        :options="usageCountOptions"
        :validationErrors="[]"
        v-model="usageCount"
      />
    </div>
    <div class="mb-3">
      <SelectInput
        label="Tipo de Uso"
        icon="bi bi-gear-fill"
        inputId="usageType"
        :options="usageTypeOptions"
        :validationErrors="[]"
        v-model="usageType"
      />
    </div>
    <div class="mb-3">
      <SelectInput
        label="¿Cómo nos encontraste?"
        icon="bi bi-search"
        inputId="foundUsBy"
        :options="foundUsByOptions"
        :validationErrors="[]"
        v-model="foundUsBy"
      />
    </div>
    <div class="d-flex justify-content-end">
      <button @click="submitForm" :disabled="!isFormValid" class="btn btn-primary">Adelante</button>
    </div>
  </div>
</template>
