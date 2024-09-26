import { ref, computed } from 'vue'

export function useAuthForm() {
  const email = ref<string>('')
  const alertMessage = ref<string>('')
  const emailErrors = ref<string[]>([])

  const displayAlert = computed(() => alertMessage.value.length > 0)
  const isDisabled = computed(() => {
    return emailErrors.value.length > 0 || email.value.length === 0
  })

  function handleEmailValidation({ value, isValid }: { value: string; isValid: boolean }) {
    email.value = value
    if (!isValid) {
      emailErrors.value = ['El email ingresado no es válido']
    } else {
      emailErrors.value = []
    }
  }

  function closeAlert(): void {
    alertMessage.value = ''
  }

  function submitForm(): void {
    if (emailErrors.value.length === 0) {
      console.log('Email:', email.value)
    }
    alertMessage.value = 'Corrige los errores antes de continuar'
  }

  return {
    email,
    alertMessage,
    emailErrors,
    displayAlert,
    isDisabled,
    handleEmailValidation,
    closeAlert,
    submitForm
  }
}
