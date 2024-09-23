<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from 'vue'

import { listCountryCodes } from '@/utils/listPhoneCodeArea'
import {
  validateField,
  emailValidation,
  wordValidation,
  phoneNumberValidation
} from '@/validation/components/ProfileSettings'
import BaseFileUpload from '@/components/base/BaseFileUpload.vue'

import type { ProfileForm } from '@/interfaces/components/Profile/UserProfile.interface'

const emit = defineEmits(['update:form'])
const props = defineProps<{ form: ProfileForm }>()

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

const validationErrors = computed(() => {
  return {
    email: validateField(localForm.value.email, emailValidation),
    name: validateField(localForm.value.name, wordValidation),
    lastname: validateField(localForm.value.lastname, wordValidation),
    phoneNumber: validateField(localForm.value.phoneNumber, phoneNumberValidation)
  }
})
</script>

<template>
  <div class="accordion-body">
    <div class="mb-3">
      <label for="email" class="form-label">Correo Electrónico</label>
      <input
        v-model="localForm.email"
        :class="{
          'is-invalid': localForm.email && validationErrors.email.length > 0
        }"
        type="email"
        id="email"
        placeholder="Ingresa tu correo"
        class="form-control"
      />
      <span v-if="localForm.email && validationErrors.email.length > 0" class="text-danger">
        {{ validationErrors.email[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Nombre</label>
      <input
        v-model="localForm.name"
        :class="{
          'is-invalid': localForm.name && validationErrors.name.length > 0
        }"
        type="text"
        id="name"
        placeholder="Ingresa tu nombre"
        class="form-control"
      />
      <span v-if="localForm.name && validationErrors.name.length > 0" class="text-danger">
        {{ validationErrors.name[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="lastname" class="form-label">Apellido</label>
      <input
        v-model="localForm.lastname"
        :class="{
          'is-invalid': localForm.lastname && validationErrors.lastname.length > 0
        }"
        type="text"
        id="lastname"
        class="form-control"
        placeholder="Ingresa tu apellido"
      />
      <span v-if="localForm.lastname && validationErrors.lastname.length > 0" class="text-danger">
        {{ validationErrors.lastname[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="phoneNumber" class="form-label">Número de Teléfono</label>
      <div class="input-group">
        <select class="form-select w-25" v-model="localForm.phoneCode">
          <option v-for="code in countryCodes" :key="code.country" :value="code.callingCode">
            {{ code.country }} (+{{ code.callingCode }})
          </option>
        </select>
        <input
          v-model="localForm.phoneNumber"
          :class="{
            'is-invalid': localForm.phoneNumber && validationErrors.phoneNumber.length > 0
          }"
          type="text"
          id="phoneNumber"
          class="form-control w-75"
          placeholder="Ingresa tu número telefónico"
        />
      </div>
      <span
        v-if="localForm.phoneNumber && validationErrors.phoneNumber.length > 0"
        class="text-danger"
      >
        {{ validationErrors.phoneNumber[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="profilePictureUrl" class="form-label">Subir una foto de perfil</label>
      <BaseFileUpload @file-selected="onFileSelected" />
    </div>
    <div class="mb-3">
      <label for="dateOfBirth" class="form-label">Fecha de Nacimiento</label>
      <input v-model="localForm.dateOfBirth" type="date" id="dateOfBirth" class="form-control" />
    </div>
  </div>
</template>
