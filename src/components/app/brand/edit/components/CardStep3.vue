<script setup lang="ts">
import { reactive } from 'vue'

import useBrandStore from '@/stores/brand.store'

import SelectInput from '@/components/input/SelectInput.vue'
import GeneralCard from '@/components/shared/GeneralCard.vue'

import { industriesOptions } from '@/utils/industriesOptions.utils'

import type { IBrand } from '@/interfaces/Brand/brand.interface'

const brandStore = useBrandStore()

const formData = reactive<Partial<IBrand>>({
  industry: ''
})
function handleIndustryChange(selectedIndustry: string) {
  formData.industry = selectedIndustry
}
</script>

<template>
  <GeneralCard title="Detalles de la industria">
    <template #content>
      <h5>Industria de tu marca actual</h5>
      <p class="text-muted">
        {{ brandStore.selectedBrand?.industry }}
      </p>
      <SelectInput
        label="Actualizar industria de tu marca"
        icon="bi bi-building-fill"
        inputId="industryBrand"
        :options="industriesOptions"
        @update:modelValue="handleIndustryChange"
      />
    </template>
  </GeneralCard>
</template>
