<script setup lang="ts">
import { ref } from 'vue'
import { BakanoUsageCount, BakanoUsageType, FoundUsBy } from '@/enum/user.enum'
const emit = defineEmits(['next', 'prev'])

const usageCount = ref<BakanoUsageCount | ''>('')
const usageType = ref<BakanoUsageType | ''>('')
const foundUsBy = ref<FoundUsBy | ''>('')

function submitForm(): void {
  emit('next', {
    usageCount: usageCount.value,
    usageType: usageType.value,
    foundUsBy: foundUsBy.value
  })
}
function goBack(): void {
  emit('prev')
}
</script>

<template>
  <div class="container">
    <h2>Primer Paso</h2>
    <div class="mb-3">
      <label for="usageCount" class="form-label">Uso de Bakano</label>
      <select id="usageCount" v-model="usageCount" class="form-select">
        <option :value="BakanoUsageCount.INDIVIDUAL">Individual</option>
        <option :value="BakanoUsageCount.GROUP">Grupo</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="usageType" class="form-label">Tipo de Uso</label>
      <select id="usageType" v-model="usageType" class="form-select">
        <option :value="BakanoUsageType.SCHEDULE_POSTS">Programar Publicaciones</option>
        <option :value="BakanoUsageType.CONTENT_CREATION">Creación de Contenido</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="foundUsBy" class="form-label">¿Cómo nos encontraste?</label>
      <select id="foundUsBy" v-model="foundUsBy" class="form-select">
        <option :value="FoundUsBy.TIK_TOK">TikTok</option>
        <option :value="FoundUsBy.FACEBOOK">Facebook</option>
        <option :value="FoundUsBy.INSTAGRAM">Instagram</option>
        <option :value="FoundUsBy.GOOGLE">Google</option>
        <option :value="FoundUsBy.WORD_OF_MOUTH">WOM (Amigo, compañero, hijo)</option>
      </select>
    </div>
    <div class="d-flex justify-content-between">
      <button class="btn btn-secondary" @click="goBack">Atrás</button>
      <button class="btn btn-primary" @click="submitForm">Adelante</button>
    </div>
  </div>
</template>
