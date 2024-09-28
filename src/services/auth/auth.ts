import APIBase from '../BaseHttp'

import type { AxiosResponse } from 'axios'
import type { IUser } from '@/interfaces/user.interface'

class APIAuth extends APIBase {
  async signUp(user: Partial<IUser>): Promise<AxiosResponse> {
    return await this.post('sign-up', user)
  }

  async sendMagicLink(user: Partial<IUser>): Promise<AxiosResponse> {
    return await this.post('send-magic-link', user)
  }

  async login(user: Partial<IUser>): Promise<AxiosResponse<IUser>> {
    return await this.post('login', user)
  }
}

export default APIAuth
