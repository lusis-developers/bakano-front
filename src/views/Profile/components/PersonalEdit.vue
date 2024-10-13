<script setup lang="ts">
import { type PropType, computed, ref, watch } from 'vue'

import FloatInput from '@/components/input/FloatInput.vue'
import SelectInput from '@/components/input/SelectInput.vue'
import UploadFileInput from '@/components/input/uploadFileInput.vue'

import {
  emailValidation,
  phoneNumberValidation,
  wordValidation
} from '@/validation/components/ProfileSettings'

import { listCountryCodes } from '@/utils/listPhoneCodeArea'

import type { IUser } from '@/interfaces/user.interface'

const emit = defineEmits(['update:form'])

const props = defineProps({
  form: {
    type: Object as PropType<IUser>,
    required: true
  }
})

const localForm = ref({ ...props.form })
const countryCodes = ref(listCountryCodes())
const selectedCountryCode = ref<string>('')

const countryOptions = computed(() =>
  countryCodes.value.map((code) => ({
    value: code.callingCode,
    label: `${code.country} (+${code.callingCode})`
  }))
)

function handleUpdate(value: string) {
  selectedCountryCode.value = value
}

function onFileSelected(file: File) {
  const reader = new FileReader()
  reader.onload = function (e) {
    localForm.value.profilePictureUrl = e.target?.result as string
  }
  reader.readAsDataURL(file)
}
function handleValidation(
  field: keyof IUser,
  payload: { value: string; isValid: boolean }
) {
  localForm.value[field] = payload.value
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
    <FloatInput
      label="Correo Electrónico"
      inputId="email"
      inputType="email"
      placeholder="Ingresa tu correo"
      :validations="emailValidation"
      @validation="(payload) => handleValidation('email', payload)"
    />
    <FloatInput
      label="Nombre"
      inputId="name"
      placeholder="Ingresa tu nombre"
      :validations="wordValidation"
      @validation="(payload) => handleValidation('name', payload)"
    />
    <FloatInput
      label="Apellido"
      inputId="lastname"
      placeholder="Ingresa tu apellido"
      :validations="wordValidation"
      @validation="(payload) => handleValidation('lastname', payload)"
    />
    <div class="mb-3 d-flex gap-2 flex-wrap">
      <SelectInput
        label="Código de País"
        inputId="countryCode"
        :options="countryOptions"
        @update:modelValue="handleUpdate"
        class="w-25"
      />
      <FloatInput
        label="Número celular"
        inputId="userNumber"
        placeholder="Ingresa tu celular..."
        :validations="phoneNumberValidation"
        @validation="(payload) => handleValidation('phoneNumber', payload)"
        class="w-75"
      />
    </div>
    <div class="mb-3">
      <label for="profilePictureUrl" class="form-label"
        >Subir una foto de perfil</label
      >
      <UploadFileInput @file-selected="onFileSelected" />
    </div>
    <div class="mb-3">
      <label for="dateOfBirth" class="form-label">Fecha de Nacimiento</label>
      <input
        v-model="localForm.dateOfBirth"
        type="date"
        id="dateOfBirth"
        class="form-control"
      />
    </div>
  </div>
</template>
