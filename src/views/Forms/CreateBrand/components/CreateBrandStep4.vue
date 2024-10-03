<script setup lang="ts">
import { reactive } from 'vue'
import FloatInput from '@/components/input/FloatInput.vue'
import type { IBrand } from '@/interfaces/Brand/brand.interface'

const emit = defineEmits(['update:brand-data'])

const formData = reactive<Partial<IBrand>>({
  description: ''
})

function updateDescription(value: string) {
  formData.description = value
  emit('update:brand-data', formData)
}
</script>

<template>
  <div>
    <h5>Una última cosa...</h5>
    <FloatInput
      label="Describe un poco lo que hace tu marca"
      inputId="brandDescription"
      placeholder="Describe un poco lo que hace tu marca"
      @input="updateDescription($event.target.value)"
    />
  </div>
</template>
