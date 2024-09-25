<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { UserGender } from '@/enum/user.enum'

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
        <label for="gender" class="form-label">Género</label>
        <select id="gender" v-model="gender" class="form-select">
          <option :value="UserGender.MALE">Masculino</option>
          <option :value="UserGender.FEMALE">Femenino</option>
          <option :value="UserGender.PREFER_NOT_SAY">Prefiero no decir</option>
        </select>
      </div>
      <div class="d-flex justify-content-between">
        <button class="btn btn-secondary" @click="goBack">Atrás</button>
        <button class="btn btn-primary" @click="submitForm" :disabled="!isFormValid">Enviar</button>
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
