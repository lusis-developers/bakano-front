<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

import type { ProfileForm } from '@/interfaces/components/Profile/UserProfile.interface'

const emit = defineEmits(['update:form'])
const props = defineProps<{ form: ProfileForm }>()

const localGender = ref(props.form.gender)

watch(localGender, (newGender) => {
  emit('update:form', { ...props.form, gender: newGender })
})
</script>

<template>
  <div class="accordion-body">
    <div class="mb-3">
      <label for="gender" class="form-label">Género</label>
      <select class="form-select" id="gender" v-model="localGender">
        <option value="">Seleccione</option>
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
        <option value="other">Otro</option>
      </select>
    </div>
  </div>
</template>
