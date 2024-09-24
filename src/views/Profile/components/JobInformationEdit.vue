<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

import type { IUser } from '@/interfaces/user.interface'

const emit = defineEmits(['update:form'])
const props = defineProps<{ form: IUser }>()

const localForm = ref({ ...props.form })

watch(
  localForm,
  (newForm) => {
    emit('update:form', newForm)
  },
  { deep: true }
)
</script>

<template>
  <div class="accordion-body">
    <div class="mb-3">
      <label for="jobDescription" class="form-label">Descripción del Trabajo</label>
      <input
        v-model="localForm.jobDescription"
        type="text"
        class="form-control"
        id="jobDescription"
        placeholder="Me encargo de el marketing y post publicados..."
      />
    </div>
    <div class="mb-3">
      <label for="occupation" class="form-label">Ocupación</label>
      <input
        v-model="localForm.occupation"
        type="text"
        class="form-control"
        id="occupation"
        placeholder="Community manager"
      />
    </div>
  </div>
</template>
