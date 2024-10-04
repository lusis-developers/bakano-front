```src/views/Forms/CreateBrand/CreateBrand.vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

import { TargetBrandGender } from '@/enum/brand.enum'
import { NotificationType } from '@/enum/components/shared/GeneralNotifications'
import useUserStore from '@/stores/user.store'
import useBrandStore from '@/stores/brand.store'
import GlobalModal from '@/components/shared/GlobalModal.vue'
import GeneralNotification from '@/components/shared/GeneralNotification.vue'

import CreateBrandStep1 from './components/CreateBrandStep1.vue'
import CreateBrandStep2 from './components/CreateBrandStep2.vue'
import CreateBrandStep3 from './components/CreateBrandStep3.vue'
import CreateBrandStep4 from './components/CreateBrandStep4.vue'
import type { IBrand } from '@/interfaces/Brand/brand.interface'

const emit = defineEmits(['update:isVisible'])

const brandStore = useBrandStore()
const userStore = useUserStore()

defineProps({
  isVisible: {
    type: Boolean,
    required: true,
    default: true
  }
})

const isCreated = ref(false)
const isStep1DataValid = ref(false)
const isStep2DataValid = ref(false)
const isStep3DataValid = ref(false)
const isStep4DataValid = ref(false)
const currentStep = ref(1)
const notificationMessage = ref<string | null>('')
const notificationType = ref(NotificationType.SUCCESS)

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
  id: ''
})

const steps = [
  { component: CreateBrandStep1, dataHandler: handleDataStep1 },
  { component: CreateBrandStep2, dataHandler: handleDataStep2 },
  { component: CreateBrandStep3, dataHandler: handleDataStep3 },
  { component: CreateBrandStep4, dataHandler: handleDataStep4 }
]

function handleClose(): void {
  emit('update:isVisible', false)
}

function nextStep(): void {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}

function prevStep(): void {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function handleDataStep1(data: Pick<IBrand, 'name' | 'operationCountry' | 'mainAddress'>): void {
  formData.name = data.name
  formData.operationCountry = data.operationCountry
  formData.mainAddress = data.mainAddress
  isStep1DataValid.value =
    data.name.length > 0 && data.operationCountry.length > 0 && data.mainAddress.length > 0
}

function handleDataStep2(data: Pick<IBrand, 'targetAudience'>): void {
  formData.targetAudience.ageRange = data.targetAudience.ageRange

  formData.targetAudience.gender = data.targetAudience.gender.map((gender) => {
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
  })

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

async function handleCreate() {
  const userId = userStore.user?._id
  await brandStore.createBrand(formData, userId!)
  await brandStore.getUserBrands(userId!)
  isCreated.value = true
  notificationMessage.value = brandStore.successMessage || brandStore.error
  notificationType.value = brandStore.successMessage
    ? NotificationType.SUCCESS
    : NotificationType.ERROR
  emit('update:isVisible', false)

  setTimeout(() => {
    notificationMessage.value = ''
    notificationType.value = NotificationType.SUCCESS
  }, 3000)
}
</script>

<template>
  <div class="create-brand">
    <GlobalModal :modelValue="isVisible" @close="handleClose">
      <template #header>
        <h2>Crear marca 📌</h2>
      </template>
      <template #content>
        <component
          :is="steps[currentStep - 1].component"
          @update:brand-data="steps[currentStep - 1].dataHandler"
        />
      </template>
      <template #footer>
        <div class="d-flex justify-content-between w-100">
          <button @click="prevStep" :disabled="currentStep === 1" class="btn bg-primary text-white">
            Anterior
          </button>
          <button
            @click="currentStep !== steps.length ? nextStep() : handleCreate()"
            :disabled="
              brandStore.isLoading ||
              isCreated ||
              (currentStep === 1 && !isStep1DataValid) ||
              (currentStep === 2 && !isStep2DataValid) ||
              (currentStep === 3 && !isStep3DataValid) ||
              (currentStep === 4 && !isStep4DataValid)
            "
            class="btn bg-primary text-white"
          >
            {{
              currentStep !== steps.length
                ? 'Siguiente'
                : brandStore.isLoading
                  ? 'Cargando...'
                  : 'Crear'
            }}
          </button>
        </div>
      </template>
    </GlobalModal>
    <GeneralNotification
      v-if="notificationMessage"
      :message="notificationMessage"
      :type="notificationType"
    />
  </div>
</template>
