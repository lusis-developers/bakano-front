<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['file-selected'])

const fileName = ref('')
const filePreview = ref('')

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    fileName.value = file.name
    emit('file-selected', file)

    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = function (e) {
        filePreview.value = e.target?.result as string
      }
      reader.readAsDataURL(file)
    } else {
      filePreview.value = ''
    }
  }
}
</script>

<template>
  <div class="file-upload">
    <label class="btn btn-primary">
      Seleccionar Archivo
      <input type="file" @change="onFileChange" accept="image/*" hidden />
    </label>
    <div v-if="fileName" class="mt-2">
      <span class="badge bg-secondary">{{ fileName }}</span>
    </div>
    <div v-if="filePreview" class="mt-2">
      <img
        :src="filePreview"
        alt="Vista previa del archivo"
        class="img-thumbnail"
        style="max-width: 150px"
      />
    </div>
  </div>
</template>
