import type { AxiosResponse } from 'axios'

import APIBase from '../BaseHttp'
import type {
  BrandCreatedResponse,
  BrandRemovedResponse,
  BrandUpdatedResponse,
  GetBrandsResponse,
  IBrand
} from '@/interfaces/Brand/brand.interface'

class APIBrand extends APIBase {
  async createBrand(
    brand: Partial<IBrand>,
    userId: string
  ): Promise<AxiosResponse<BrandCreatedResponse>> {
    return await this.post(`add-brand/${userId}`, brand)
  }

  async removeBrand(brandId: string, userId: string): Promise<AxiosResponse<BrandRemovedResponse>> {
    return await this.delete(`remove-brand/${userId}/${brandId}`)
  }

  async editBrand(
    brandUpdated: Partial<IBrand>,
    brandId: string
  ): Promise<AxiosResponse<BrandUpdatedResponse>> {
    return await this.put(`edit-brand/${brandId}`, brandUpdated)
  }

  async getBrands(userId: string): Promise<AxiosResponse<GetBrandsResponse>> {
    return await this.get(`get-brands/${userId}`)
  }
}

export default APIBrand
