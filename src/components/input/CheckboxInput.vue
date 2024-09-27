<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})

const checkedValue = ref(props.modelValue)

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}

watch(checkedValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="onChange"
    />
    <label :for="id" class="form-check-label">
      {{ label }}
    </label>
  </div>
</template>
