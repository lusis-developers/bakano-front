<script setup lang="ts">
import { ref, type PropType } from 'vue'

import type { Validation } from '@/interfaces/input/EmailAndPassword.interface'

const emit = defineEmits(['validation'])
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  inputId: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  inputType: {
    type: String,
    required: false,
    default: 'text'
  },
  validations: {
    type: Array as PropType<Validation[]>,
    default: () => []
  }
})

const inputValue = ref<string>('')
const errorMessages = ref<string[]>([])

function validateInput(): void {
  errorMessages.value = []
  props.validations.forEach((validation: Validation) => {
    if (!validation.rule(inputValue.value)) {
      errorMessages.value.push(validation.message)
    }
  })
  emit('validation', {
    value: inputValue.value,
    isValid: errorMessages.value.length === 0
  })
}
</script>

<template>
  <div class="form-floating mb-3">
    <input
      v-model="inputValue"
      :type="inputType"
      :id="inputId"
      :placeholder="placeholder"
      class="form-control"
      @input="validateInput"
    />
    <label :for="inputId">{{ label }}</label>
    <div v-if="errorMessages.length" class="invalid-feedback d-block">
      <ul>
        <li v-for="(message, index) in errorMessages" :key="index">{{ message }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
