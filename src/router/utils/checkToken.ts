import useAuthStore from '@/stores/auth.store'
import useUserStore from '@/stores/user.store'

export async function checkTokenValidity(): Promise<boolean> {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const token = localStorage.getItem('app-client-secret')
  if (token) {
    const user = await authStore.login(token)
    await userStore.setUser(user)
    const isValid = user !== null
    return isValid
  }
  return false
}
