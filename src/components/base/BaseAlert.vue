<script setup lang="ts">
import { AlertType } from '@/enum/components/base/BaseAlert.interface'

const emit = defineEmits(['close'])
defineProps({
  isVisible: {
    type: Boolean,
    default: true
  },
  type: {
    type: String as () => AlertType,
    required: false,
    default: AlertType.SUCCESS
  },
  message: {
    type: String,
    required: true
  },
  dismissible: {
    type: Boolean,
    default: true
  }
})

function closeAlert() {
  emit('close')
}
</script>

<template>
  <div
    v-if="isVisible"
    :class="['alert', `alert-${type}`, { 'alert-dismissible': dismissible }]"
    role="alert"
  >
    {{ message }}

    <button
      v-if="dismissible"
      type="button"
      class="btn-close"
      aria-label="Close"
      @click="closeAlert"
    ></button>
  </div>
</template>

<style scoped></style>
