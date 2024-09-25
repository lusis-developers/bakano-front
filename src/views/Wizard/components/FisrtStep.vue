<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import { BakanoUsageCount, BakanoUsageType, FoundUsBy } from '@/enum/user.enum'

const emit = defineEmits(['next', 'prev'])

const props = defineProps({
  usageCount: String,
  usageType: String,
  foundUsBy: String
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
      <label for="usageCount" class="form-label">
        <i class="bi bi-people-fill" /> Uso de Bakano
      </label>
      <select v-model="usageCount" id="usageCount" class="form-select">
        <option :value="BakanoUsageCount.INDIVIDUAL">Individual</option>
        <option :value="BakanoUsageCount.GROUP">Grupo</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="usageType" class="form-label">
        <i class="bi bi-gear-fill" /> Tipo de Uso
      </label>
      <select v-model="usageType" id="usageType" class="form-select">
        <option :value="BakanoUsageType.SCHEDULE_POSTS">Programar Publicaciones</option>
        <option :value="BakanoUsageType.CONTENT_CREATION">Creación de Contenido</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="foundUsBy" class="form-label">
        <i class="bi bi-search" /> ¿Cómo nos encontraste?
      </label>
      <select v-model="foundUsBy" id="foundUsBy" class="form-select">
        <option :value="FoundUsBy.TIK_TOK">TikTok</option>
        <option :value="FoundUsBy.FACEBOOK">Facebook</option>
        <option :value="FoundUsBy.INSTAGRAM">Instagram</option>
        <option :value="FoundUsBy.GOOGLE">Google</option>
        <option :value="FoundUsBy.WORD_OF_MOUTH">WOM (Amigo, compañero, hijo)</option>
      </select>
    </div>
    <div class="d-flex justify-content-end">
      <button @click="submitForm" :disabled="!isFormValid" class="btn btn-primary">Adelante</button>
    </div>
  </div>
</template>
