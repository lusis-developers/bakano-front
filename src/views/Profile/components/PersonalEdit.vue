<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from 'vue'

import { listCountryCodes } from '@/utils/listPhoneCodeArea'
import BaseFileUpload from '@/components/base/BaseFileUpload.vue'
import {
  validateField,
  emailValidation,
  wordValidation,
  phoneNumberValidation
} from '@/validation/components/ProfileSettings'

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
        type="email"
        class="form-control"
        id="email"
        v-model="localForm.email"
        :class="{
          'is-invalid': localForm.email && validationErrors.email.length > 0
        }"
      />
      <span v-if="localForm.email && validationErrors.email.length > 0" class="text-danger">
        {{ validationErrors.email[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Nombre</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="localForm.name"
        :class="{
          'is-invalid': localForm.name && validationErrors.name.length > 0
        }"
      />
      <span v-if="localForm.name && validationErrors.name.length > 0" class="text-danger">
        {{ validationErrors.name[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="lastname" class="form-label">Apellido</label>
      <input
        type="text"
        class="form-control"
        id="lastname"
        v-model="localForm.lastname"
        :class="{
          'is-invalid': localForm.lastname && validationErrors.lastname.length > 0
        }"
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
          type="text"
          class="form-control w-75"
          id="phoneNumber"
          v-model="localForm.phoneNumber"
          :class="{
            'is-invalid': localForm.phoneNumber && validationErrors.phoneNumber.length > 0
          }"
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
      <input type="date" class="form-control" id="dateOfBirth" v-model="localForm.dateOfBirth" />
    </div>
  </div>
</template>
