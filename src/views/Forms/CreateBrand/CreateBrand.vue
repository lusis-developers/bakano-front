<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TargetBrandGender } from '@/enum/brand.enum'
import useBrandStore from '@/stores/brand.store'
import GlobalModal from '@/components/shared/GlobalModal.vue'
import CreateBrandStep1 from './components/CreateBrandStep1.vue'
import CreateBrandStep2 from './components/CreateBrandStep2.vue'
import CreateBrandStep3 from './components/CreateBrandStep3.vue'
import CreateBrandStep4 from './components/CreateBrandStep4.vue'
import type { IBrand } from '@/interfaces/Brand/brand.interface'
import useUserStore from '@/stores/user.store'

const brandStore = useBrandStore()
const userStore = useUserStore()

const currentStep = ref(1)
const isCreated = ref(false) 

defineProps({
  isVisible: {
    type: Boolean,
    required: true,
    default: true
  }
})

const formData: IBrand = reactive({
  name: '',
  description: '',
  logo: '',
  industry: '',
  operationCountry: '',
  targetAudience: {
    ageRange: [''],
    gender: [TargetBrandGender.NOT_SURE],
    preferences: ''
  },
  user: '',
  id: ''
})

function handleClose(): void {
  console.log('Se ha cerrado el modal')
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

function handleDataStep1(data: any): void {
  formData.name = data.name
  formData.operationCountry = data.operationCountry
}

function handleDataStep2(data: Pick<IBrand, 'targetAudience'>): void {
  formData.targetAudience.ageRange = data.targetAudience.ageRange
  formData.targetAudience.gender = data.targetAudience.gender.map((gender) => {
    switch (gender) {
      case 'male':
        return TargetBrandGender.MALE
      case 'female':
        return TargetBrandGender.FEMALE
      case 'not sure':
        return TargetBrandGender.NOT_SURE
      default:
        return TargetBrandGender.NOT_SURE
    }
  })
  formData.targetAudience.preferences = data.targetAudience.preferences
}

function handleDataStep3(data: Pick<IBrand, 'industry'>): void {
  formData.industry = data.industry
}

function handleDataStep4(data: Pick<IBrand, 'description'>): void {
  formData.description = data.description
}

async function handleCreate() {
  const userId = await userStore.user?._id
  await brandStore.createBrand(formData, userId!)
  await brandStore.getUserBrands(userId!)
  isCreated.value = true // Marca creada
}
</script>

<template>
  <div class="create-brand">
    <GlobalModal :modelValue="isVisible" @close="handleClose">
      <template #header>
        <h2>Crear marca 📌</h2>
      </template>
      <template #content>
        <CreateBrandStep1
          v-if="currentStep === 1"
          @update:brand-data="handleDataStep1"
          @next="nextStep"
        />
        <CreateBrandStep2
          v-if="currentStep === 2"
          @update:brand-data="handleDataStep2"
          @next="nextStep"
          @prev="prevStep"
        />
        <CreateBrandStep3
          v-if="currentStep === 3"
          @update:brand-data="handleDataStep3"
          @next="nextStep"
          @prev="prevStep"
        />
        <CreateBrandStep4
          v-if="currentStep === 4"
          @update:brand-data="handleDataStep4"
          @prev="prevStep"
        />
      </template>
      <template #footer>
        <div class="d-flex justify-content-between w-100">
          <button @click="prevStep" :disabled="currentStep === 1" class="btn bg-primary text-white">
            Anterior
          </button>
          <button
            @click="currentStep !== 4 ? nextStep() : handleCreate()"
            :disabled="brandStore.isLoading || isCreated"
            class="btn bg-primary text-white"
          >
            {{ currentStep !== 4 ? 'Siguiente' : brandStore.isLoading ? 'Cargando...' : 'Crear' }}
          </button>
        </div>
      </template>
    </GlobalModal>
  </div>
</template>
