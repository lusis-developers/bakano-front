import { reactive, ref, watchEffect } from 'vue'

import { TargetBrandGender } from '@/enum/brand.enum'

import useBrandStore from '@/stores/brand.store'
import useUserStore from '@/stores/user.store'

import type { IBrand } from '@/interfaces/Brand/brand.interface'

export function useBrandForm() {
  const brandStore = useBrandStore()
  const userStore = useUserStore()

  const activeStep = ref(1)
  const brandModified = ref<boolean>(false)
  const notificationMessage = ref<string | null>(null)
  const notificationType = ref<'success' | 'error' | null>(null)

  const brandUpdated = reactive<Partial<IBrand>>({})

  const steps = [
    { icon: 'bi-person-circle', label: 'Información Básica' },
    { icon: 'bi-people', label: 'Audiencia' },
    { icon: 'bi-briefcase', label: 'Industria' }
  ]

  function setStep(step: number): void {
    activeStep.value = step
  }

  function handleDataStep1(
    data: Pick<IBrand, 'name' | 'mainAddress' | 'operationCountry'>
  ) {
    if (data.name) brandUpdated.name = data.name
    if (data.mainAddress) brandUpdated.mainAddress = data.mainAddress
    if (data.operationCountry)
      brandUpdated.operationCountry = data.operationCountry

    brandModified.value = true
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

    brandModified.value = true
  }

  function handleDataStep3(industry: string): void {
    if (industry) {
      brandUpdated.industry = industry
      brandModified.value = true
    }
  }

  function showNotification(message: string, type: 'success' | 'error'): void {
    notificationMessage.value = message
    notificationType.value = type

    setTimeout(() => {
      notificationMessage.value = null
      notificationType.value = null
    }, 3000)
  }

  async function updateBrand(): Promise<void> {
    try {
      const updatedBrand = brandUpdated as IBrand

      if (Object.keys(brandUpdated).length === 0) {
        showNotification('No hay cambios para guardar', 'error')
        return
      }

      brandModified.value = false
      await brandStore.editBrand(updatedBrand, brandStore.selectedBrand!._id)
      showNotification('Marca guardada exitosamente', 'success')
    } catch (error) {
      console.error('Error al guardar la marca', error)
      brandModified.value = true
      showNotification('Error al guardar la marca', 'error')
    }
  }

  watchEffect(async () => {
    const selectedBrand = brandStore.selectedBrand

    if (!selectedBrand) {
      await brandStore.getBrands(userStore.user?._id!)
    } else {
      brandUpdated.name = selectedBrand.name
      brandUpdated.description = selectedBrand.description
      brandUpdated.industry = selectedBrand.industry
      brandUpdated.mainAddress = selectedBrand.mainAddress
      brandUpdated.operationCountry = selectedBrand.operationCountry
      brandUpdated.targetAudience = selectedBrand.targetAudience
      brandUpdated.user = selectedBrand.user
      brandUpdated._id = selectedBrand._id
    }
  })

  return {
    activeStep,
    brandModified,
    notificationMessage,
    notificationType,
    steps,
    setStep,
    handleDataStep1,
    handleDataStep2,
    handleDataStep3,
    updateBrand
  }
}
