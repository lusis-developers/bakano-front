import { reactive, ref } from 'vue'

import { TargetBrandGender } from '@/enum/brand.enum'

import useBrandStore from '@/stores/brand.store'

import type { IBrand } from '@/interfaces/Brand/brand.interface'

export function useEditBrand() {
  const brandStore = useBrandStore()
  const logoFile = ref<File | null>(null)

  const steps = [
    { icon: 'bi-person-circle', label: 'Información Básica' },
    { icon: 'bi-people', label: 'Audiencia' },
    { icon: 'bi-briefcase', label: 'Industria' }
  ]

  const activeStep = ref(1)
  const brandUpdated = reactive<Partial<IBrand>>(
    JSON.parse(JSON.stringify(brandStore.selectedBrand))
  )

  function setStep(step: number): void {
    activeStep.value = step
  }

  function handleData(
    field: string,
    value: string | string[] | TargetBrandGender[]
  ): void {
    if (field === 'name') {
      brandUpdated.name = value as string
    }
    if (field === 'mainAddress') {
      brandUpdated.mainAddress = value as string
    }
    if (field === 'operationCountry') {
      brandUpdated.operationCountry = value as string
    }
    if (field === 'preferences') {
      if (!brandUpdated.targetAudience) {
        brandUpdated.targetAudience = {
          ageRange: [''],
          gender: [],
          preferences: ''
        }
      }
      brandUpdated.targetAudience.preferences = value as string
    }
    if (field === 'ageRange') {
      if (!brandUpdated.targetAudience) {
        brandUpdated.targetAudience = {
          ageRange: [''],
          gender: [],
          preferences: ''
        }
      }
      brandUpdated.targetAudience.ageRange = value as string[]
    }
    if (field === 'gender') {
      if (!brandUpdated.targetAudience) {
        brandUpdated.targetAudience = {
          ageRange: [''],
          gender: [],
          preferences: ''
        }
      }
      brandUpdated.targetAudience.gender = value as TargetBrandGender[]
    }
    if (field === 'industry') {
      brandUpdated.industry = value as string
    }
  }

  async function updateBrand(): Promise<void> {
    if (brandStore.selectedBrand) {
      await brandStore.updateBrand(brandUpdated, brandStore.selectedBrand?._id)
    }
  }

  async function updateLogo(): Promise<void> {
    if (logoFile.value && brandStore.selectedBrand) {
      await brandStore.updateBrandLogo(
        logoFile.value,
        brandStore.selectedBrand._id
      )
    }
  }

  return {
    activeStep,
    brandUpdated,
    steps,
    setStep,
    handleData,
    updateBrand,
    updateLogo,
    logoFile
  }
}
