<script setup lang="ts">
import { AlertType } from '@/enum/components/base/caseAlert.interface'
import { useAuthForm } from '@/composables/views/useAuthForm.composable'
import { emailValidations, passwordValidations } from '@/validation/components/emailAndPassword'
import logo from '@/assets/brand/bakano-negro.png'
import BaseAlert from '@/components/base/BaseAlert.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import FloatInput from '@/components/input/FloatInput.vue'
import ContainerWrapper from '@/components/layout/ContainerWrapper.vue'

const {
  alertMessage,
  displayAlert,
  isDisabled,
  handleEmailValidation,
  handlePasswordValidation,
  closeAlert,
  submitForm
} = useAuthForm()
</script>

<template>
  <ContainerWrapper>
    <template #content>
      <div
        class="form-wraper w-100 min-vh-100 d-flex flex-column justify-content-center align-items-center"
      >
        <form class="w-100">
          <BaseAlert
            :isVisible="displayAlert"
            :message="alertMessage"
            :isDismissable="true"
            :type="AlertType.DANGER"
            @close="closeAlert"
          />
          <img :src="logo" alt="bakano-logo" class="logo rounded mx-auto d-block mb-4" />
          <p class="fs-3 text-center">Inicia Sesión</p>
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
          <p class="text-center">
            ¿Primera vez que usas Bakano?
            <router-link to="/sign-up"> Regístrate </router-link>
          </p>
        </form>
        <BaseButton
          label="Inicia Sesión"
          :isDisabled="isDisabled"
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
}
</style>
