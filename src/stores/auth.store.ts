import { defineStore } from 'pinia'
import { AxiosError } from 'axios'

import APIAuth from '@/services/auth/auth'
import { ResponseMessage } from '@/enum/store/ResponseMessage.enum'
import type { IUser } from '@/interfaces/user.interface'
import APIFacebookAuth from '@/services/auth/facebook'

interface RootState {
  isLoading: boolean
  error: string | null
  successMessage: string | null
  facebookToken: string | null
}

const authService = new APIAuth()
const authFBService = new APIFacebookAuth()

export const useAuthStore = defineStore('authStore', {
  state: (): RootState => ({
    isLoading: false,
    error: null,
    successMessage: null,
    facebookToken: null
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
    },
    async sendMagicLink(user: Partial<IUser>): Promise<void> {
      this.isLoading = true
      try {
        await authService.sendMagicLink(user)
        this.successMessage = 'Un link fue enviado tu bandeja'
      } catch (error: unknown) {
        console.log(error)
        this.error = error instanceof AxiosError ? error.message : ResponseMessage.ERROR
      } finally {
        this.isLoading = false
      }
    },
    async login(token: string): Promise<IUser | null> {
      this.isLoading = true
      try {
        const response = await authService.login(token)
        const longTermToken = response.data.longTermToken
        localStorage.setItem('app-client-secret', longTermToken)
        console.log('response', response.data.longTermToken)
        return response.data.user
      } catch (error: unknown) {
        this.error = error instanceof AxiosError ? error.message : ResponseMessage.ERROR
        return null
      } finally {
        this.isLoading = false
      }
    },
    async sendFacebookTokenToBackend(facebookToken: string, brandId: string): Promise<void> {
      this.isLoading = true
      try {
        await authFBService.saveTokenSecret(facebookToken, brandId)
        this.facebookToken = facebookToken
      } catch (error: unknown) {
        this.error = error instanceof AxiosError ? error.message : ResponseMessage.ERROR
      } finally {
        this.isLoading = false
      }
    }
  }
})

export default useAuthStore
