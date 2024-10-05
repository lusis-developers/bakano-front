<script setup lang="ts">
import { type PropType, computed, ref, watch } from 'vue'

import SelectInput from '@/components/input/SelectInput.vue'

import type { IUser } from '@/interfaces/user.interface'
import { allCountries } from 'country-region-data'

const emit = defineEmits(['update:form'])

const props = defineProps({
  form: {
    type: Object as PropType<IUser>,
    required: true
  }
})

const selectedCountry = ref(props.form.location.country)

const localProvince = ref(props.form.location.province)

const regions = computed(() => {
  const country = allCountries.find((c) => c[0] === selectedCountry.value)
  return country ? country[2] : []
})

const countryOptions = computed(() => {
  return allCountries.map((c) => ({ value: c[0], label: c[0] }))
})

const regionOptions = computed(() => {
  return regions.value.map((r) => ({ value: r[0], label: r[0] }))
})

watch(selectedCountry, (newCountry) => {
  emit('update:form', {
    ...props.form,
    location: { country: newCountry, province: '' }
  })
})

watch(localProvince, (newProvince) => {
  emit('update:form', {
    ...props.form,
    location: { ...props.form.location, province: newProvince }
  })
})
</script>

<template>
  <div class="accordion-body">
    <div class="mb-3">
      <SelectInput
        inputId="country"
        label="País"
        :options="countryOptions"
        v-model="selectedCountry"
      />
    </div>
    <div class="mb-3" v-if="regions.length">
      <SelectInput
        inputId="region"
        label="Región"
        :options="regionOptions"
        v-model="localProvince"
      />
    </div>
  </div>
</template>
