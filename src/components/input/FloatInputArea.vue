```src/components/input/FloatInputArea.vue
<script setup lang="ts">
import { type PropType, ref } from 'vue'

import type { Validation } from '@/interfaces/components/input/EmailAndPassword.interface'

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

function adjustHeight(event: Event): void {
  const target = event.target as HTMLTextAreaElement
  target.style.height = 'auto'
  target.style.height = `${target.scrollHeight}px`
}
</script>

<template>
  <div class="form-floating mb-3">
    <textarea
      v-model="inputValue"
      :id="inputId"
      :placeholder="placeholder"
      class="form-control"
      @input="
        (event) => {
          validateInput()
          adjustHeight(event)
        }
      "
      rows="1"
      style="max-height: 200px"
    ></textarea>
    <label :for="inputId">{{ label }}</label>
    <div v-if="errorMessages.length" class="invalid-feedback d-block">
      <ul>
        <li v-for="(message, index) in errorMessages" :key="index">
          {{ message }}
        </li>
      </ul>
    </div>
  </div>
</template>
>

<style lang="scss" scoped></style>
