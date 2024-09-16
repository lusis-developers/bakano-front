import { ref, computed } from 'vue'

export function useAuthForm() {
  const email = ref<string>('')
  const password = ref<string>('')
  const name = ref<string>('')
  const lastname = ref<string>('')
  const alertMessage = ref<string>('')
  const emailErrors = ref<string[]>([])
  const passwordErrors = ref<string[]>([])
  const nameErrors = ref<string[]>([])
  const lastnameErrors = ref<string[]>([])

  const displayAlert = computed(() => alertMessage.value.length > 0)
  const isDisabled = computed(() => {
    return (
      emailErrors.value.length > 0 ||
      passwordErrors.value.length > 0 ||
      email.value.length === 0 ||
      password.value.length === 0 ||
      name.value.length === 0 ||
      lastname.value.length === 0
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

  function closeAlert(): void {
    alertMessage.value = ''
  }

  function submitForm(): void {
    if (emailErrors.value.length === 0 && passwordErrors.value.length === 0) {
      console.log('Email:', email.value)
      console.log('Password:', password.value)
      console.log('Name:', name.value)
    }
    alertMessage.value = 'Corrige los errores antes de continuar'
  }

  return {
    email,
    password,
    name,
    lastname,
    alertMessage,
    emailErrors,
    passwordErrors,
    displayAlert,
    isDisabled,
    handleEmailValidation,
    handlePasswordValidation,
    handleName,
    handleLastname,
    closeAlert,
    submitForm
  }
}
