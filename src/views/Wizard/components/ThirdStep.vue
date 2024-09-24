<script setup lang="ts">
import { ref } from 'vue'
import { UserGender } from '@/enum/user.enum'
const emit = defineEmits(['next'])

const gender = ref<UserGender | ''>('')

function submitForm(): void {
  emit('next', { gender: gender.value })
}
</script>

<template>
  <div class="container">
    <h2>Tercer Paso</h2>
    <div class="mb-3">
      <label for="gender" class="form-label">Género</label>
      <select id="gender" v-model="gender" class="form-select">
        <option :value="UserGender.MALE">Masculino</option>
        <option :value="UserGender.FEMALE">Femenino</option>
        <option :value="UserGender.PREFER_NOT_SAY">Prefiero no decir</option>
      </select>
    </div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary" @click="submitForm">Adelante</button>
    </div>
  </div>
</template>
