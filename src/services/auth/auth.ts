import APIBase from '../BaseHttp'
import type { IUser, LoginResponse } from '@/interfaces/user.interface'
import type { AxiosResponse } from 'axios'

class APIAuth extends APIBase {
  async signUp(user: Partial<IUser>): Promise<AxiosResponse> {
    return await this.post('sign-up', user)
  }

  async sendMagicLink(user: Partial<IUser>): Promise<AxiosResponse> {
    return await this.post('send-magic-link', user)
  }

  async login(token: string): Promise<AxiosResponse<LoginResponse>> {
    return await this.post('login', { token })
  }
}

export default APIAuth
