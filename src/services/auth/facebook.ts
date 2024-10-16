import APIBase from '../BaseHttp'
import type { AxiosResponse } from 'axios'

class APIFacebookAuth extends APIBase {
  async saveTokenSecret(
    brandId: string,
    token: string,
    pageId: string
  ): Promise<AxiosResponse> {
    return await this.post(`integrations/${brandId}/facebook`, {
      accessToken: token,
      pageId: pageId
    })
  }
}

export default APIFacebookAuth
