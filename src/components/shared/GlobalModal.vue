<script setup lang="ts">
const emit = defineEmits(['close'])

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

function closeModal(): void {
  emit('close')
}

function handleClickOutside(event: MouseEvent): void {
  if (event.target === event.currentTarget) {
    closeModal()
  }
}
</script>

<template>
  <div v-if="modelValue" class="modal d-block" tabindex="-1" @click="handleClickOutside">
    <div class="modal-dialog modal-dialog-centered" @click.stop>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="header"></slot>
          </h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <slot name="content"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
