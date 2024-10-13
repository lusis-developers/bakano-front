<script setup lang="ts">
import { computed } from 'vue'

import { PrincipalCountries } from '@/enum/brand.enum'

import { useEditBrand } from '@/composables/components/brand/editBrand'

import useBrandStore from '@/stores/brand.store'

import BaseButton from '@/components/base/BaseButton.vue'
import FloatInput from '@/components/input/FloatInput.vue'
import SelectInput from '@/components/input/SelectInput.vue'
import UploadFileInput from '@/components/input/uploadFileInput.vue'
import GlobalModal from '@/components/shared/GlobalModal.vue'

import {
  mainAddressValidations,
  nameBrandValidations
} from '@/validation/components/forms/brand.validation'

const emit = defineEmits(['close-modal', 'update:brand-data'])
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const brandStore = useBrandStore()

const { brandUpdated, handleData, updateBrand, updateLogo, logoFile } =
  useEditBrand()

const countryOptions = computed(() => {
  return Object.values(PrincipalCountries).map((country) => ({
    value: country,
    label: country
  }))
})

function closeModal(): void {
  emit('close-modal')
}

async function updateField(field: string, value: string): Promise<void> {
  handleData(field, value)
}

async function editBrand(): Promise<void> {
  if (logoFile.value) {
    await updateLogo()
  } else {
    await updateBrand()
  }
  closeModal()
}

async function setImage(file: File): Promise<void> {
  logoFile.value = file
}
</script>

<template>
  <GlobalModal :modelValue="isOpen" @close="closeModal">
    <template #header> Editar </template>
    <template #content>
      <UploadFileInput class="mb-4" @file-selected="setImage($event)" />
      <FloatInput
        label="Nombre de marca"
        inputId="brandName"
        v-model="brandUpdated.name"
        :validations="nameBrandValidations"
        :initialValue="brandUpdated.name"
        @input="updateField('name', $event.target.value)"
      />
      <SelectInput
        v-model="brandUpdated.operationCountry!"
        label="País de marca"
        icon="bi bi-globe-americas"
        inputId="countryOperation"
        :initialValue="brandUpdated.operationCountry"
        :options="countryOptions"
        @update:modelValue="updateField('operationCountry', $event)"
      />
      <FloatInput
        label="Dirección principal actual"
        inputId="mainAddress"
        v-model="brandUpdated.mainAddress"
        :initialValue="brandUpdated.mainAddress"
        :validations="mainAddressValidations"
        @input="updateField('mainAddress', $event.target.value)"
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
