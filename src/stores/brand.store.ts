import { ResponseMessage } from '@/enum/store/ResponseMessage.enum'

import type { IBrand } from '@/interfaces/Brand/brand.interface'
import APIBrand from '@/services/brand/brand'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'

interface RootState {
  isLoading: boolean
  brands: IBrand[]
  selectedBrand: IBrand | null
  successMessage: string | null
  error: string | null
}

const brandService = new APIBrand()

export const useBrandStore = defineStore('brandStore', {
  state: (): RootState => ({
    brands: [],
    isLoading: false,
    selectedBrand: null,
    successMessage: null,
    error: null
  }),
  actions: {
    setSelectedBrand(brand: IBrand) {
      this.selectedBrand = brand
    },

    async getBrands(userId: string): Promise<void> {
      this.isLoading = true
      try {
        const { data } = await brandService.getBrands(userId)
        this.brands = data.brands
        this.selectedBrand = this.brands[0]
      } catch (error) {
        console.error('error: ', error)
        this.error =
          error instanceof AxiosError ? error.message : ResponseMessage.ERROR
      } finally {
        this.isLoading = false
      }
    },

    async createBrand(brand: IBrand, userId: string): Promise<void> {
      this.isLoading = true
      try {
        await brandService.createBrand(brand, userId)
        this.getBrands(userId)
        this.successMessage = 'Se ha creado exitosamente tu marca'
      } catch (error: unknown) {
        console.error('error: ', error)
        this.error =
          error instanceof AxiosError ? error.message : ResponseMessage.ERROR
      } finally {
        this.isLoading = false
      }
    },

    async removeBrand(brandId: string, userId: string): Promise<void> {
      this.isLoading = true
      try {
        const brandRemoved = await brandService.removeBrand(brandId, userId)
        this.successMessage = `Se he eliminado con éxito la marca: ${brandRemoved.data.brandRemoved.name}`
      } catch (error) {
        console.error('error: ', error)
      } finally {
        this.isLoading = false
      }
    },

    async updateBrand(
      brandUpdated: Partial<IBrand>,
      brandId: string
    ): Promise<void> {
      this.isLoading = true
      try {
        const brandEdited = await brandService.editBrand(brandUpdated, brandId)
        this.successMessage = `Se ha actualizado exitosamente tu marca: ${brandEdited.data.brandUpdated.name}`
        this.selectedBrand = brandEdited.data.brandUpdated
      } catch (error: unknown) {
        console.error('error: ', error)
        this.error =
          error instanceof AxiosError ? error.message : ResponseMessage.ERROR
      } finally {
        this.isLoading = false
      }
    },

    async getUserBrand(brandId: string): Promise<void> {
      this.isLoading = true
      try {
        const { data } = await brandService.getBrand(brandId)
        this.selectedBrand = data.brand
        this.successMessage = 'Se ha cargado tu marca'
      } catch (error: unknown) {
        console.error({ error })
        this.error =
          error instanceof AxiosError ? error.message : ResponseMessage.ERROR
      } finally {
        this.isLoading = false
      }
    },

    async updateBrandLogo(file: File, brandId: string): Promise<void> {
      this.isLoading = true
      try {
        await brandService.uploadBrandLogo(file, brandId)
        this.successMessage = 'Tu imagen ha sido cargada'
      } catch (error: unknown) {
        console.error({ error })
        this.error =
          error instanceof AxiosError ? error.message : ResponseMessage.ERROR
      } finally {
        this.isLoading = false
      }
    }
  }
})

export default useBrandStore
