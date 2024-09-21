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
      <label for="gender" class="form-label">Género</label>
      <select class="form-select" id="gender" v-model="form.gender">
        <option value="">Seleccione</option>
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
        <option value="other">Otro</option>
      </select>
    </div>
  </div>
</template>
