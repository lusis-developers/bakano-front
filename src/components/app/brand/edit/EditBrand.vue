<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'

import { useRouter } from 'vue-router'

import { TargetBrandGender } from '@/enum/brand.enum'

import useBrandStore from '@/stores/brand.store'

import CardStep1 from './components/CardStep1.vue'
import CardStep2 from './components/CardStep2.vue'
import CardStep3 from './components/CardStep3.vue'
import type { IBrand } from '@/interfaces/Brand/brand.interface'

const brandStore = useBrandStore()
const router = useRouter()

const activeStep = ref(1)
const brandModified = ref<boolean>(false)

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
  brandUpdated.name = data.name
  brandUpdated.mainAddress = data.mainAddress
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
    gender: data.targetAudience.gender.map((g: string) => genderMap[g] || g)
  }

  brandUpdated.targetAudience = convertedTargetAudience
  brandModified.value = true
}

function handleDataStep3(industry: string): void {
  brandUpdated.industry = industry
  brandModified.value = true
}

async function saveBrand(): Promise<void> {
  const updatedBrand = brandUpdated as IBrand
  await brandStore.editBrand(updatedBrand, brandStore.selectedBrand!._id)
  brandModified.value = false
}

watchEffect(() => {
  const selectedBrand = brandStore.selectedBrand

  if (!selectedBrand) {
    router.push('/app/dashboard')
    return
  }
  brandUpdated.name = selectedBrand.name
  brandUpdated.description = selectedBrand.description
  brandUpdated.industry = selectedBrand.industry
  brandUpdated.mainAddress = selectedBrand.mainAddress
  brandUpdated.operationCountry = selectedBrand.operationCountry
  brandUpdated.targetAudience = selectedBrand.targetAudience
  brandUpdated.user = selectedBrand.user
  brandUpdated._id = selectedBrand._id
})
</script>

<template>
  <div class="w-100 d-flex flex-column align-items-center gap-3 flex-grow-1">
    <div class="btn-group" role="group" aria-label="Steps navigation">
      <button
        v-for="(step, index) in steps"
        :key="index"
        class="btn btn-outline-primary"
        :class="{ active: activeStep === index + 1 }"
        @click="setStep(index + 1)"
      >
        <i :class="`bi ${step.icon}`" /> {{ step.label }}
      </button>
    </div>

    <div v-if="activeStep === 1" class="w-100 flex-grow-1">
      <h4>Llena los primeros datos ⭐</h4>
      <CardStep1
        @update:brand-data="handleDataStep1"
        class="w-100 flex-grow-1"
      />
    </div>
    <div v-if="activeStep === 2" class="w-100 flex-grow-1">
      <h4>Actualiza la configuración de tu audiencia</h4>
      <CardStep2
        @update:brand-data="handleDataStep2"
        class="w-100 flex-grow-1"
      />
    </div>
    <div v-if="activeStep === 3" class="w-100 flex-grow-1">
      <h4>Actualiza la industria de tu marca</h4>
      <CardStep3
        @update:brand-data="handleDataStep3"
        class="w-100 flex-grow-1"
      />
    </div>
  </div>
  <button
    @click="saveBrand"
    :disabled="!brandModified"
    class="btn btn-primary mt-3"
  >
    guardar
  </button>
</template>
