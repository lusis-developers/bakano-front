<script setup lang="ts">
import { useAuthForm } from '@/composables/views/LoginView.composable'
import { AlertType } from '@/enum/components/base/BaseAlert.interface'
import { emailValidations, passwordValidations } from '@/validation/components/EmailAndPassword'
import logo from '@/assets/brand/bakano-negro.png'
import BaseAlert from '@/components/base/BaseAlert.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import ContainerWrapper from '@/components/layout/ContainerWrapper.vue'
import EmailAndPasswordInput from '@/components/input/EmailAndPasswordInput.vue'

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
