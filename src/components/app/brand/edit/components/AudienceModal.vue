<script setup lang="ts">
import { computed } from 'vue'

import { TargetAudience } from '@/enum/brand.enum'
import { TargetBrandGender } from '@/enum/brand.enum'

import { useEditBrand } from '@/composables/components/brand/editBrand'

import useBrandStore from '@/stores/brand.store'

import BaseButton from '@/components/base/BaseButton.vue'
import FloatInputArea from '@/components/input/FloatInputArea.vue'
import MultipleSelectInput from '@/components/input/MultipleSelectInput.vue'
import GlobalModal from '@/components/shared/GlobalModal.vue'

import { descriptionValidations } from '@/validation/components/forms/brand.validation'

const emit = defineEmits(['close-modal', 'update:brand-data'])
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const brandStore = useBrandStore()

const { brandUpdated, handleData, updateBrand } = useEditBrand()

const audienceOptions = Object.values(TargetAudience)

const genderTranslationMap: Record<TargetBrandGender, string> = {
  [TargetBrandGender.MALE]: 'masculino',
  [TargetBrandGender.FEMALE]: 'femenino',
  [TargetBrandGender.NOT_SURE]: 'no estoy seguro'
}

const reverseGenderTranslationMap: Record<string, TargetBrandGender> = {
  masculino: TargetBrandGender.MALE,
  femenino: TargetBrandGender.FEMALE,
  'no estoy seguro': TargetBrandGender.NOT_SURE
}

const genderOptions = computed(() =>
  Object.values(TargetBrandGender).map((gender) => genderTranslationMap[gender])
)

const genderSelected = computed(
  () =>
    brandUpdated.targetAudience?.gender.map(
      (gender) => genderTranslationMap[gender]
    ) || []
)

function closeModal(): void {
  emit('close-modal')
}

async function updateField(field: string, value: string[]): Promise<void> {
  if (field === 'gender') {
    const translatedValues = value.map(
      (val) => reverseGenderTranslationMap[val]
    )
    handleData(field, translatedValues)
  } else {
    handleData(field, value)
  }
}

async function editBrand(): Promise<void> {
  await updateBrand()
  closeModal()
}
</script>

<template>
  <GlobalModal
    v-if="brandStore.selectedBrand"
    :modelValue="isOpen"
    @close="closeModal"
  >
    <template #header> Editar </template>
    <template #content>
      <FloatInputArea
        label="Preferencias de tu público"
        inputId="preferences"
        placeholder="Escribe lo que consideres le gusta a tu público"
        :initialValue="brandUpdated.targetAudience?.preferences"
        :validations="descriptionValidations"
        @input="updateField('preferences', $event)"
      />
      <MultipleSelectInput
        :modelValue="brandUpdated.targetAudience?.ageRange"
        :options="audienceOptions"
        label="Selecciona tu público objetivo"
        id="ageRangeSelector"
        @update:modelValue="updateField('ageRange', $event)"
      />
      <MultipleSelectInput
        :modelValue="genderSelected"
        :options="genderOptions"
        label="Selecciona los géneros objetivo que crees que les puede interesar tu producto"
        id="genderSelector"
        @update:modelValue="updateField('gender', $event)"
      />
    </template>
    <template #footer>
      <div class="d-flex justify-content-end gap-3">
        <button class="btn btn-secondary" @click="closeModal">Cerrar</button>
        <BaseButton
          label="Actualizar"
          :isLoading="brandStore.isLoading"
          :fullWidth="true"
          btnClass="btn-primary"
          @click="editBrand"
        />
      </div>
    </template>
  </GlobalModal>
</template>
