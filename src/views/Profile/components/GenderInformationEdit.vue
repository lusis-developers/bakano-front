<script setup lang="ts">
import { ref, watch } from 'vue'

import type { IUser } from '@/interfaces/user.interface'

const emit = defineEmits(['update:form'])
const props = defineProps<{ form: IUser }>()

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
