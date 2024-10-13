<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { PropType } from 'vue'

interface Option {
  value: string | number
  label: string
}

const props = defineProps({
  icon: {
    type: String,
    required: false
  },
  label: {
    type: String,
    required: false
  },
  inputId: {
    type: String,
    required: false
  },
  options: {
    type: Array as PropType<Option[]>,
    required: true
  },
  validationErrors: {
    type: Array as PropType<string[]>,
    required: false
  },
  initialValue: {
    type: [String, Number],
    required: false,
    default: ''
  }
})

const selectedValue = ref(props.initialValue)

const validationErrors = computed(() => {
  return props.validationErrors
})

const emit = defineEmits(['update:modelValue'])

const emitChange = () => {
  emit('update:modelValue', selectedValue.value)
}

watch(
  () => props.initialValue,
  (newVal: string | number) => {
    selectedValue.value = newVal
  },
  { immediate: true } // Para que se ejecute al iniciar
)
</script>

<template>
  <div class="mb-3">
    <label :for="inputId" class="form-label">
      <i v-if="icon" :class="icon" />
      {{ label }}
    </label>
    <select
      v-model="selectedValue"
      :class="{ 'is-invalid': validationErrors && validationErrors.length > 0 }"
      :id="inputId"
      class="form-select"
      @change="emitChange"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <span
      v-if="validationErrors && validationErrors.length > 0"
      class="text-danger"
    >
      {{ validationErrors[0] }}
    </span>
  </div>
</template>
