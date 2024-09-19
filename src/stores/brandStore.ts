import { defineStore } from 'pinia'

import type { Brand, socialMedia } from '@/interfaces/Layout/BrandsTypes.interface'

interface RootState {
  brands: Brand[]
  selectedBrand: Brand | null
}

export const useBrandStore = defineStore('brandStore', {
  state: (): RootState => ({
    brands: [
      {
        id: 1,
        name: 'boxitrip',
        logo: 'https://i.pinimg.com/236x/22/09/02/220902e0b406bbd28afccd44a3551b1e.jpg',
        socialMedia: [] as socialMedia[],
        isLoading: false,
        error: null
      },
      {
        id: 2,
        name: 'yeyo tienda',
        logo: 'https://i.pinimg.com/236x/22/09/02/220902e0b406bbd28afccd44a3551b1e.jpg',
        socialMedia: [] as socialMedia[],
        isLoading: false,
        error: null
      }
    ],
    selectedBrand: null
  }),
  actions: {
    setSelectedBrand(brand: Brand) {
      this.selectedBrand = brand
    }
  }
})

export default useBrandStore
