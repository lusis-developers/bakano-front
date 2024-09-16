<script setup lang="ts">
import { computed, ref } from 'vue'

import { emailValidations, passwordValidations } from '@/validation/components/EmailAndPassword'

import logo from '@/assets/brand/bakano-negro.png'
import BaseButton from '@/components/base/BaseButton.vue'
import ContainerWrapper from '@/components/layout/ContainerWrapper.vue'
import EmailAndPasswordInput from '@/components/input/EmailAndPasswordInput.vue'

const email = ref<string>('')
const password = ref<string>('')
const emailErrors = ref<string[]>([])
const passwordErrors = ref<string[]>([])

const isDisabled = computed(() => {
  return (
    emailErrors.value.length > 0 ||
    passwordErrors.value.length > 0 ||
    email.value.length === 0 ||
    password.value.length === 0
  )
})

function handleEmailValidation({ value, isValid }: { value: string; isValid: boolean }) {
  email.value = value
  if (!isValid) {
    emailErrors.value = ['El email ingresado no es válido']
  } else {
    emailErrors.value = []
  }
}

function handlePasswordValidation({ value, isValid }: { value: string; isValid: boolean }) {
  password.value = value
  if (!isValid) {
    passwordErrors.value = ['La contraseña ingresada no es válida']
  } else {
    passwordErrors.value = []
  }
}

function login(): void {
  if (emailErrors.value.length === 0 && passwordErrors.value.length === 0) {
    console.log('Email:', email.value)
    console.log('Password:', password.value)
    // Aquí se procede con la lógica de inicio de sesión, como enviar los datos al servidor
  } else {
    console.log('Corrige los errores antes de continuar')
  }
}
</script>

<template>
  <ContainerWrapper>
    <template #content>
      <div class="form-wraper w-100">
        <form>
          <img :src="logo" alt="bakano-logo" class="logo rounded mx-auto d-block mb-4" />
          <EmailAndPasswordInput
            :validations="emailValidations"
            label="Correo electrónico"
            inputId="email"
            placeholder="Ingresa tu correo"
            inputType="email"
            @validation="handleEmailValidation"
          />
          <EmailAndPasswordInput
            :validations="passwordValidations"
            label="Contraseña"
            inputId="password"
            placeholder="Ingresa tu contraseña"
            inputType="password"
            @validation="handlePasswordValidation"
          />
        </form>
        <BaseButton
          label="Inicia Sesión"
          :isDisabled="isDisabled"
          :fullWidth="true"
          btnClass="btn-primary"
          @click="login"
        />
      </div>
    </template>
  </ContainerWrapper>
</template>

<style lang="scss" scoped>
.form-wraper {
  max-width: 420px;

  .logo {
    width: 80px;
  }
}
</style>
