import { ref, computed } from 'vue'

export function useAuthForm() {
  const email = ref<string>('')
  const password = ref<string>('')
  const alertMessage = ref<string>('')
  const emailErrors = ref<string[]>([])
  const passwordErrors = ref<string[]>([])

  const displayAlert = computed(() => alertMessage.value.length > 0)
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

  function closeAlert(): void {
    alertMessage.value = ''
  }

  function submitForm(): void {
    if (emailErrors.value.length === 0 && passwordErrors.value.length === 0) {
      console.log('Email:', email.value)
      console.log('Password:', password.value)
    }
    alertMessage.value = 'Corrige los errores antes de continuar'
  }

  return {
    email,
    password,
    alertMessage,
    emailErrors,
    passwordErrors,
    displayAlert,
    isDisabled,
    handleEmailValidation,
    handlePasswordValidation,
    closeAlert,
    submitForm
  }
}
