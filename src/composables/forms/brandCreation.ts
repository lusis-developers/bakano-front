import { reactive, ref } from 'vue'

import { TargetBrandGender } from '@/enum/brand.enum'

import type { IBrand } from '@/interfaces/Brand/brand.interface'

export function useBrandCreationService() {
  const isCreated = ref(false)
  const isStep1DataValid = ref(false)
  const isStep2DataValid = ref(false)
  const isStep3DataValid = ref(false)
  const isStep4DataValid = ref(false)
  const currentStep = ref(1)
  const formData: IBrand = reactive({
    name: '',
    description: '',
    logo: '',
    industry: '',
    operationCountry: '',
    mainAddress: '',
    targetAudience: {
      ageRange: [''],
      gender: [TargetBrandGender.NOT_SURE],
      preferences: ''
    },
    user: '',
    _id: ''
  })

  function handleDataStep1(
    data: Pick<IBrand, 'name' | 'operationCountry' | 'mainAddress'>
  ): void {
    formData.name = data.name
    formData.operationCountry = data.operationCountry
    formData.mainAddress = data.mainAddress
    isStep1DataValid.value =
      data.name.length > 0 &&
      data.operationCountry.length > 0 &&
      data.mainAddress.length > 0
  }

  function handleDataStep2(data: Pick<IBrand, 'targetAudience'>): void {
    formData.targetAudience.ageRange = data.targetAudience.ageRange

    formData.targetAudience.gender = data.targetAudience.gender.map(
      (gender) => {
        switch (gender.toLowerCase()) {
          case 'masculino':
            return TargetBrandGender.MALE
          case 'femenino':
            return TargetBrandGender.FEMALE
          case 'no estoy seguro':
            return TargetBrandGender.NOT_SURE
          default:
            return TargetBrandGender.NOT_SURE
        }
      }
    )

    formData.targetAudience.preferences = data.targetAudience.preferences

    isStep2DataValid.value =
      data.targetAudience.ageRange.length > 0 &&
      data.targetAudience.gender.length > 0 &&
      data.targetAudience.preferences.length > 0 &&
      data.targetAudience.preferences.length <= 500
  }

  function handleDataStep3(data: Pick<IBrand, 'industry'>): void {
    formData.industry = data.industry
    isStep3DataValid.value = data.industry.length > 0
  }

  function handleDataStep4(data: Pick<IBrand, 'description'>): void {
    formData.description = data.description
    isStep4DataValid.value = data.description.length > 0
  }

  function resetForm() {
    Object.assign(formData, {
      name: '',
      description: '',
      logo: '',
      industry: '',
      operationCountry: '',
      mainAddress: '',
      targetAudience: {
        ageRange: [''],
        gender: [TargetBrandGender.NOT_SURE],
        preferences: ''
      },
      user: '',
      id: ''
    })
    isCreated.value = false
    isStep1DataValid.value = false
    isStep2DataValid.value = false
    isStep3DataValid.value = false
    isStep4DataValid.value = false
    currentStep.value = 1
  }

  function nextStep(): void {
    if (currentStep.value < 4) {
      currentStep.value++
    }
  }

  function prevStep(): void {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  return {
    isCreated,
    isStep1DataValid,
    isStep2DataValid,
    isStep3DataValid,
    isStep4DataValid,
    currentStep,
    formData,
    handleDataStep1,
    handleDataStep2,
    handleDataStep3,
    handleDataStep4,
    resetForm,
    nextStep,
    prevStep
  }
}
