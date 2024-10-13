import APIBase from '../BaseHttp'
import type {
  BrandCreatedResponse,
  BrandLogoUpdateResponse,
  BrandRemovedResponse,
  BrandResponse,
  BrandUpdatedResponse,
  GetBrandsResponse,
  IBrand
} from '@/interfaces/Brand/brand.interface'
import type { AxiosResponse } from 'axios'

class APIBrand extends APIBase {
  async createBrand(
    brand: Partial<IBrand>,
    userId: string
  ): Promise<AxiosResponse<BrandCreatedResponse>> {
    return await this.post(`brand/${userId}`, brand)
  }

  async removeBrand(
    brandId: string,
    userId: string
  ): Promise<AxiosResponse<BrandRemovedResponse>> {
    return await this.delete(`brand/${userId}/${brandId}`)
  }

  async editBrand(
    brandUpdated: Partial<IBrand>,
    brandId: string
  ): Promise<AxiosResponse<BrandUpdatedResponse>> {
    return await this.put(`brand/${brandId}`, brandUpdated)
  }

  async getBrands(userId: string): Promise<AxiosResponse<GetBrandsResponse>> {
    return await this.get(`brands/${userId}`)
  }

  async getBrand(brandId: string): Promise<AxiosResponse<BrandResponse>> {
    return await this.get(`/brand/${brandId}`)
  }

  async uploadBrandLogo(
    file: File,
    brandId: string
  ): Promise<AxiosResponse<BrandLogoUpdateResponse>> {
    return await this.uploadFile(`brand-picture/${brandId}`, file)
  }
}

export default APIBrand
