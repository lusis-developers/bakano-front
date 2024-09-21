<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  form: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="accordion-body">
    <div class="mb-3">
      <label for="email" class="form-label">Correo Electrónico</label>
      <input type="email" class="form-control" id="email" v-model="form.email" />
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Nombre</label>
      <input type="text" class="form-control" id="name" v-model="form.name" />
    </div>
    <div class="mb-3">
      <label for="lastname" class="form-label">Apellido</label>
      <input type="text" class="form-control" id="lastname" v-model="form.lastname" />
    </div>
    <div class="mb-3">
      <label for="phoneNumber" class="form-label">Número de Teléfono</label>
      <input type="text" class="form-control" id="phoneNumber" v-model="form.phoneNumber" />
    </div>
    <div class="mb-3">
      <label for="profilePictureUrl" class="form-label">URL de la Foto de Perfil</label>
      <input
        type="text"
        class="form-control"
        id="profilePictureUrl"
        v-model="form.profilePictureUrl"
      />
    </div>
    <div class="mb-3">
      <label for="dateOfBirth" class="form-label">Fecha de Nacimiento</label>
      <input type="date" class="form-control" id="dateOfBirth" v-model="form.dateOfBirth" />
    </div>
  </div>
</template>
