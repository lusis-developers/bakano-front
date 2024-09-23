<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

import { listCountryCodes } from '@/utils/listPhoneCodeArea'
import BaseFileUpload from '@/components/base/BaseFileUpload.vue'

import type { ProfileForm } from '@/interfaces/components/Profile/UserProfile.interface'

const props = defineProps<{ form: ProfileForm }>()
const emit = defineEmits(['update:form'])

const localForm = ref({ ...props.form })
const countryCodes = ref(listCountryCodes())

function onFileSelected(file: File) {
  const reader = new FileReader()
  reader.onload = function (e) {
    localForm.value.profilePictureUrl = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

watch(
  localForm,
  (newForm) => {
    emit('update:form', newForm)
  },
  { deep: true }
)
</script>

<template>
  <div class="accordion-body">
    <div class="mb-3">
      <label for="email" class="form-label">Correo Electrónico</label>
      <input type="email" class="form-control" id="email" v-model="localForm.email" />
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Nombre</label>
      <input type="text" class="form-control" id="name" v-model="localForm.name" />
    </div>
    <div class="mb-3">
      <label for="lastname" class="form-label">Apellido</label>
      <input type="text" class="form-control" id="lastname" v-model="localForm.lastname" />
    </div>
    <div class="mb-3">
      <label for="phoneNumber" class="form-label">Número de Teléfono</label>
      <div class="input-group">
        <select class="form-select" v-model="localForm.phoneCode">
          <option v-for="code in countryCodes" :key="code.country" :value="code.callingCode">
            {{ code.country }} (+{{ code.callingCode }})
          </option>
        </select>
        <input type="text" class="form-control" id="phoneNumber" v-model="localForm.phoneNumber" />
      </div>
    </div>
    <div class="mb-3">
      <label for="profilePictureUrl" class="form-label">Subir una foto de perfil</label>
      <BaseFileUpload @file-selected="onFileSelected" />
    </div>
    <div class="mb-3">
      <label for="dateOfBirth" class="form-label">Fecha de Nacimiento</label>
      <input type="date" class="form-control" id="dateOfBirth" v-model="localForm.dateOfBirth" />
    </div>
  </div>
</template>
