<script setup lang="ts">
import { computed, ref } from 'vue'

import { NotificationType } from '@/enum/components/shared/GeneralNotifications'
import { useBrandCreationService } from '@/composables/forms/brandCreation'
import useUserStore from '@/stores/user.store'
import useBrandStore from '@/stores/brand.store'
import GlobalModal from '@/components/shared/GlobalModal.vue'
import CreateBrandStep1 from './components/CreateBrandStep1.vue'
import CreateBrandStep2 from './components/CreateBrandStep2.vue'
import CreateBrandStep3 from './components/CreateBrandStep3.vue'
import CreateBrandStep4 from './components/CreateBrandStep4.vue'
import GeneralNotification from '@/components/shared/GeneralNotification.vue'

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

const {
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
} = useBrandCreationService()

const notificationMessage = ref<string | null>('')
const notificationType = ref(NotificationType.SUCCESS)

const isDisabled = computed(() => {
  return (
    brandStore.isLoading ||
    isCreated.value ||
    (currentStep.value === 1 && !isStep1DataValid.value) ||
    (currentStep.value === 2 && !isStep2DataValid.value) ||
    (currentStep.value === 3 && !isStep3DataValid.value) ||
    (currentStep.value === 4 && !isStep4DataValid.value)
  )
})

const isFirstStep = computed(() => currentStep.value === 1)

const currentComponent = computed(() => {
  return steps[currentStep.value - 1].component
})

const currentDataHandler = computed(() => {
  return steps[currentStep.value - 1].dataHandler
})

function handleNextOrCreate(): void {
  if (currentStep.value !== steps.length) {
    nextStep()
  } else {
    handleCreate()
  }
}

const buttonText = computed(() => {
  if (currentStep.value !== steps.length) {
    return 'Siguiente'
  } else if (brandStore.isLoading) {
    return 'Cargando...'
  } else {
    return 'Crear'
  }
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

  resetForm()

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
        <component :is="currentComponent" @update:brand-data="currentDataHandler" />
      </template>
      <template #footer>
        <div class="d-flex justify-content-between w-100">
          <button @click="prevStep" :disabled="isFirstStep" class="btn bg-primary text-white">
            Anterior
          </button>
          <button
            @click="handleNextOrCreate"
            :disabled="isDisabled"
            class="btn bg-primary text-white"
          >
            {{ buttonText }}
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
