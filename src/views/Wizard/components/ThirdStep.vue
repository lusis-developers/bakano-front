<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useRouter } from 'vue-router'

import SelectInput from '@/components/input/SelectInput.vue'

import { genderOptions } from '@/utils/wizardSelections.utils'

const emit = defineEmits(['next', 'prev'])

const props = defineProps({
  gender: String
})

const router = useRouter()
const gender = ref(props.gender || '')
const isSubmitting = ref(false)

const isFormValid = computed(() => {
  return gender.value !== ''
})

function submitForm(): void {
  if (isFormValid.value) {
    isSubmitting.value = true
    setTimeout(() => {
      emit('next', { gender: gender.value })
      router.push('/app')
    }, 2000)
  }
}
function goBack(): void {
  emit('prev')
}

watch(
  () => props.gender,
  (newVal) => (gender.value = newVal!)
)
</script>

<template>
  <transition name="fade">
    <div v-if="!isSubmitting" class="container">
      <h2>Tercer Paso</h2>
      <div class="mb-3">
        <SelectInput
          icon="bi bi-gender-ambiguous"
          label="Preferencias"
          :options="genderOptions"
          v-model="gender"
        />
      </div>
      <div class="d-flex justify-content-between">
        <button class="btn btn-secondary" @click="goBack">Atrás</button>
        <button
          class="btn btn-primary"
          @click="submitForm"
          :disabled="!isFormValid"
        >
          Enviar
        </button>
      </div>
    </div>
  </transition>
  <transition name="fade">
    <div v-if="isSubmitting" class="container">
      <h2>Enviando...</h2>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>
