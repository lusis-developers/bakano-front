<script setup lang="ts">
import { useAuthForm } from '@/composables/views/useAuthForm.composable'

import useAuthStore from '@/stores/auth.store'

import BaseAlert from '@/components/base/BaseAlert.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import FloatInput from '@/components/input/FloatInput.vue'
import ContainerWrapper from '@/components/layout/ContainerWrapper.vue'

import { emailValidations } from '@/validation/components/EmailAndPassword.validation'

import logo from '@/assets/brand/bakano-negro.png'

const {
  alertMessage,
  displayAlert,
  isDisabled,
  handleEmailValidation,
  closeAlert,
  submitForm,
  alertType
} = useAuthForm()

const authStore = useAuthStore()
</script>

<template>
  <ContainerWrapper>
    <template #content>
      <div
        class="form-wraper w-100 mt-5 d-flex flex-column justify-content-center align-items-center"
      >
        <form class="w-100">
          <BaseAlert
            :isVisible="displayAlert"
            :message="alertMessage"
            :isDismissable="true"
            :type="alertType"
            @close="closeAlert"
          />
          <img
            :src="logo"
            alt="bakano-logo"
            class="logo rounded mx-auto d-block mb-4 mt-5"
          />
          <p class="fs-3 text-center">Inicia Sesión</p>
          <FloatInput
            :validations="emailValidations"
            label="Correo electrónico"
            inputId="email"
            placeholder="Ingresa tu correo"
            inputType="email"
            @validation="handleEmailValidation"
          />
          <p class="text-center">
            ¿Primera vez que usas Bakano?
            <router-link to="/sign-up"> Regístrate </router-link>
          </p>
        </form>
        <BaseButton
          label="Inicia Sesión"
          :isLoading="authStore.isLoading"
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
