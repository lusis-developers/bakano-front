<script setup lang="ts">
import { defineProps } from 'vue'

import type { ProfileForm } from '@/interfaces/components/Profile/UserProfile.interface'

defineProps<{ form: ProfileForm }>()
</script>

<template>
  <div class="accordion-body">
    <div class="mb-3">
      <label for="jobDescription" class="form-label">Descripción del Trabajo</label>
      <input type="text" class="form-control" id="jobDescription" v-model="form.jobDescription" />
    </div>
    <div class="mb-3">
      <label for="occupation" class="form-label">Ocupación</label>
      <input type="text" class="form-control" id="occupation" v-model="form.occupation" />
    </div>
    <div class="mb-3">
      <label for="company" class="form-label">Compañía</label>
      <input type="text" class="form-control" id="company" v-model="form.company" />
    </div>
  </div>
</template>
