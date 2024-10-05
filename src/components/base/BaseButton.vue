<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['click'])
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isFocused: {
    type: Boolean,
    default: false
  },
  btnClass: {
    type: String,
    default: 'btn-primary'
  },
  fullWidth: {
    type: Boolean,
    default: true
  }
})

const buttonClasses = computed(() => {
  return [
    'btn',
    props.btnClass,
    props.fullWidth ? 'w-100' : '',
    props.isDisabled ? 'btn-secondary' : '',
    props.isActive ? 'active' : '',
    props.isFocused ? 'focus' : ''
  ]
    .join(' ')
    .trim()
})

function click(): void {
  emit('click')
}
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="isDisabled || isLoading"
    @click="click"
  >
    <!-- Mostrar spinner si isLoading es true -->
    <span
      v-if="isLoading"
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<style scoped lang="scss">
button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.spinner-border {
  margin-right: 8px;
}
</style>
