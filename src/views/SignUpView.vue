<script setup lang="ts">
import { ref, computed } from 'vue'

import { useAuthForm } from '@/composables/views/useAuthForm.composable'
import { AlertType } from '@/enum/components/base/BaseAlert.interface'
import { emailValidations, passwordValidations } from '@/validation/components/EmailAndPassword'
import logo from '@/assets/brand/bakano-negro.png'
import BaseAlert from '@/components/base/BaseAlert.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import ContainerWrapper from '@/components/layout/ContainerWrapper.vue'
import FloatInput from '@/components/input/FloatInput.vue'

const {
  alertMessage,
  displayAlert,
  isDisabled,
  handleEmailValidation,
  handlePasswordValidation,
  closeAlert,
  submitForm
} = useAuthForm()
const name = ref<string>('')
const lastname = ref<string>('')
const nameErrors = ref<string[]>([])
const lastnameErrors = ref<string[]>([])
const termAndPolicyAccepted = ref(false)

const isRegistrationDisabled = computed(() => {
  return (
    isDisabled.value ||
    name.value.length === 0 ||
    lastname.value.length === 0 ||
    !termAndPolicyAccepted.value
  )
})

function handleName({ value, isValid }: { value: string; isValid: boolean }): void {
  name.value = value
  if (!isValid) {
    nameErrors.value = ['Campo obligatorio']
  } else {
    nameErrors.value = []
  }
}

function handleLastname({ value, isValid }: { value: string; isValid: boolean }): void {
  lastname.value = value
  if (!isValid) {
    lastnameErrors.value = ['Campo obligatorio']
  } else {
    lastnameErrors.value = []
  }
}
</script>

<template>
  <ContainerWrapper>
    <template #content>
      <div class="form-wraper w-100">
        <form>
          <BaseAlert
            :isVisible="displayAlert"
            :message="alertMessage"
            :isDismissable="true"
            :type="AlertType.DANGER"
            @close="closeAlert"
          />
          <img :src="logo" alt="bakano-logo" class="logo rounded mx-auto d-block mb-4" />
          <p class="fs-3 text-center">Regístrate</p>
          <FloatInput
            label="Nombre"
            inputId="name"
            placeholder="Luis"
            inputType="text"
            @validation="handleName"
          />
          <FloatInput
            label="Apellido"
            inputId="lastname"
            placeholder="Reyes"
            inputType="text"
            @validation="handleLastname"
          />
          <FloatInput
            :validations="emailValidations"
            label="Correo electrónico"
            inputId="email"
            placeholder="Ingresa tu correo"
            inputType="email"
            @validation="handleEmailValidation"
          />
          <FloatInput
            :validations="passwordValidations"
            label="Contraseña"
            inputId="password"
            placeholder="Ingresa tu contraseña"
            inputType="password"
            @validation="handlePasswordValidation"
          />
          <div class="form-check mb-3">
            <input
              v-model="termAndPolicyAccepted"
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label class="form-check-label fs-8" for="flexCheckDefault">
              Acepta nuestros
              <a href="https://bakano.ec/terminos-y-condiciones-de-uso" about="_blank"
                >Términos y condiciones</a
              >
              y
              <a href="https://bakano.ec/politica-de-privacidad" about="_blank">
                Políticas de privacidad
              </a>
            </label>
          </div>
        </form>
        <BaseButton
          label="Inicia Sesión"
          :isDisabled="isRegistrationDisabled"
          :fullWidth="true"
          btnClass="btn-primary"
          @click="submitForm"
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
  .fs-8 {
    font-size: 0.75rem;
  }
}
</style>
