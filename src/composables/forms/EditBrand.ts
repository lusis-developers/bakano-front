import { reactive, ref } from 'vue'

import { TargetBrandGender } from '@/enum/brand.enum'

import useBrandStore from '@/stores/brand.store'
import useUserStore from '@/stores/user.store'

import type { IBrand } from '@/interfaces/Brand/brand.interface'

export function useEditBrand() {
  const userStore = useUserStore()
  const brandStore = useBrandStore()

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

  function handleDataStep1(field: string, value: string): void {
    if (field === 'name') {
      brandUpdated.name = value
    }
    if (field === 'mainAddress') {
      brandUpdated.mainAddress = value
    }
    if (field === 'operationCountry') {
      brandUpdated.operationCountry = value
    }
    console.log(brandUpdated)
  }

  function handleDataStep2(data: Pick<IBrand, 'targetAudience'>): void {
    const genderMap: Record<string, TargetBrandGender> = {
      Masculino: TargetBrandGender.MALE,
      Femenino: TargetBrandGender.FEMALE,
      'No estoy seguro': TargetBrandGender.NOT_SURE
    }

    const convertedTargetAudience = {
      ...data.targetAudience,
      gender: data.targetAudience.gender
        ? data.targetAudience.gender.map((g: string) => genderMap[g] || g)
        : []
    }

    if (data.targetAudience && convertedTargetAudience.gender.length > 0) {
      brandUpdated.targetAudience = convertedTargetAudience
    }

    // brandModified.value = true
  }

  function handleDataStep3(industry: string): void {
    if (industry) {
      brandUpdated.industry = industry
      // brandModified.value = true
    }
  }

  // function resetValues(): void {
  //   brandUpdated = JSON.parse(JSON.stringify(brandStore.selectedBrand))
  // }

  async function updateBrand(): Promise<void> {
    if (brandStore.selectedBrand) {
      await brandStore.updateBrand(brandUpdated, brandStore.selectedBrand?._id)
    }
  }

  return {
    activeStep,
    brandUpdated,
    steps,
    setStep,
    handleDataStep1,
    handleDataStep2,
    handleDataStep3,
    updateBrand
    // resetValues,
  }
}
