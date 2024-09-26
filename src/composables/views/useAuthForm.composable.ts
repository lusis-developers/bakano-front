import { ref, computed } from 'vue'

import useAuthStore from '@/stores/auth.store'
import { AlertType } from '@/enum/components/base/baseAlert.interface'
import type { IUser } from '@/interfaces/services/userRequest.interface'

export function useAuthForm() {
  const authStore = useAuthStore()

  const email = ref<string>('')
  const alertMessage = ref<string>('')
  const emailErrors = ref<string[]>([])

  const displayAlert = computed(() => alertMessage.value.length > 0)
  const alertType = computed(() => {
    if (authStore.error) {
      return AlertType.DANGER
    } else if (authStore.successMessage) {
      return AlertType.SUCCESS
    }
    return AlertType.DANGER
  })
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

  async function submitForm(user?: IUser): Promise<void> {
    const noEmailErrors = emailErrors.value.length === 0

    if (noEmailErrors) {
      if (user) {
        await authStore.signUp(user)
      } else {
        const user = {
          body: {
            email: email.value.toLowerCase()
          }
        }
        await authStore.signUp(user)
      }
      const isThereMessage = authStore.error || authStore.successMessage
      alertMessage.value = isThereMessage ?? ''
    }
  }

  return {
    email,
    alertMessage,
    emailErrors,
    alertType,
    displayAlert,
    isDisabled,
    handleEmailValidation,
    closeAlert,
    submitForm
  }
}
