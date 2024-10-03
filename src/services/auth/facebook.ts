import APIBase from '../BaseHttp'
import type { AxiosResponse } from 'axios'

class APIFacebookAuth extends APIBase {
  async saveTokenSecret(token: string, brandId: string): Promise<AxiosResponse> {
    return await this.post(`integrations/${brandId}/facebook`, { accessToken: token })
  }
}

export default APIFacebookAuth
