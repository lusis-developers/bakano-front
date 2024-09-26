import APIBase from '../BaseHttp'

import type { AxiosResponse } from 'axios'
import type { IUser } from '@/interfaces/services/userRequest.interface'

class APIAuth extends APIBase {
  async signUp(user: Partial<IUser>): Promise<AxiosResponse<IUser>> {
    return await this.post('/sign-up', user)
  }
}

export default APIAuth
