<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import { allCountries } from 'country-region-data'

import type { ProfileForm } from '@/interfaces/components/Profile/UserProfile.interface'

const selectedCountry = ref('')

defineProps<{ form: ProfileForm }>()

console.log('allCountries: ', allCountries)

const regions = computed(() => {
  const country = allCountries.find((c) => c[0] === selectedCountry.value)
  return country ? country[2] : []
})
</script>

<template>
  <div class="accordion-body">
    <div class="mb-3">
      <label for="country" class="form-label">País</label>
      <select class="form-select" id="country" v-model="selectedCountry">
        <option v-for="(country, index) in allCountries" :key="index" :value="country[0]">
          {{ country[0] }}
        </option>
      </select>
    </div>
    <div class="mb-3" v-if="regions.length">
      <label for="region" class="form-label">Región</label>
      <select class="form-select" id="region" v-model="form.location.region">
        <option v-for="(region, index) in regions" :key="index" :value="region[0]">
          {{ region[0] }}
        </option>
      </select>
    </div>
  </div>
</template>
