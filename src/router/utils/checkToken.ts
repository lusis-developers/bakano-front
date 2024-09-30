import useAuthStore from '@/stores/auth.store'

export async function checkTokenValidity(): Promise<boolean> {
  const authStore = useAuthStore()
  const token = localStorage.getItem('app-client-secret')
  if (token) {
    const user = await authStore.login(token)
    const isValid = user !== null
    return isValid
  }
  return false
}
