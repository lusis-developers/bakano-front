<script setup lang="ts">
import { useEditBrand } from '@/composables/components/brand/editBrand'

import useBrandStore from '@/stores/brand.store'

import BaseButton from '@/components/base/BaseButton.vue'
import SelectInput from '@/components/input/SelectInput.vue'
import GlobalModal from '@/components/shared/GlobalModal.vue'

import { industriesOptions } from '@/utils/industriesOptions.utils'

const emit = defineEmits(['close-modal', 'update:brand-data'])
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const brandStore = useBrandStore()

const { brandUpdated, handleData, updateBrand } = useEditBrand()

function closeModal(): void {
  emit('close-modal')
}

async function updateField(field: string, value: string): Promise<void> {
  handleData(field, value)
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
      <SelectInput
        label="Actualizar industria de tu marca"
        icon="bi bi-building-fill"
        inputId="industryBrand"
        :initialValue="brandUpdated.industry"
        :options="industriesOptions"
        @update:modelValue="updateField('industry', $event)"
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
