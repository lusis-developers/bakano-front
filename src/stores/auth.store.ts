import { defineStore } from 'pinia'
import { AxiosError } from 'axios'

import APIAuth from '@/services/auth/auth'
import { ResponseMessage } from '@/enum/store/ResponseMessage.enum'
import type { IUser } from '@/interfaces/user.interface'

interface RootState {
  isLoading: boolean
  error: string | null
  successMessage: string | null
}

const authService = new APIAuth()

export const useAuthStore = defineStore('authStore', {
  state: (): RootState => ({
    isLoading: false,
    error: null,
    successMessage: null
  }),
  actions: {
    async signUp(user: Partial<IUser>): Promise<void> {
      this.isLoading = true
      try {
        await authService.signUp(user)
        this.successMessage = 'Un link fue enviado tu bandeja, revisa en spam si no lo encuentras'
      } catch (error: unknown) {
        this.error = error instanceof AxiosError ? error.message : ResponseMessage.ERROR
      } finally {
        this.isLoading = false
      }
    }
  }
})

export default useAuthStore
