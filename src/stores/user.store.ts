import { ResponseMessage } from '@/enum/store/ResponseMessage.enum'

import type { IUser } from '@/interfaces/user.interface'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'

interface RootState {
  isLoading: boolean
  error: string | null
  successMessage: string | null
  user: IUser | null
}

const useUserStore = defineStore('userStore', {
  state: (): RootState => ({
    isLoading: false,
    error: null,
    user: null,
    successMessage: null
  }),
  actions: {
    async setUser(user: IUser | null): Promise<void> {
      this.isLoading = true
      try {
        this.user = user
      } catch (error: unknown) {
        this.error =
          error instanceof AxiosError ? error.message : ResponseMessage.ERROR
      } finally {
        this.isLoading = false
      }
    }
  }
})

export default useUserStore
