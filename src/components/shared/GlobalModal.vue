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
  <div v-if="modelValue" class="modal-overlay"></div>
  <!-- Overlay agregado aquí -->
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

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1040;
}

.modal {
  z-index: 1050;
}
</style>
