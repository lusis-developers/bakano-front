<script setup lang="ts">
import { ref, watch } from 'vue'
import { UserGender } from '@/enum/user.enum'
import SelectInput from '@/components/input/SelectInput.vue'

import type { IUser } from '@/interfaces/user.interface'

const emit = defineEmits(['update:form'])

const props = defineProps<{ form: IUser }>()

const localGender = ref<UserGender | ''>(props.form.gender as UserGender | '')

const genderOptions = [
  { value: '', label: 'Seleccione' },
  { value: UserGender.MALE, label: 'Masculino' },
  { value: UserGender.FEMALE, label: 'Femenino' },
  { value: UserGender.PREFER_NOT_SAY, label: 'Prefiero no decir' }
]

watch(localGender, (newGender) => {
  emit('update:form', { ...props.form, gender: newGender })
})
</script>

<template>
  <div class="accordion-body">
    <div class="mb-3">
      <SelectInput
        :label="'Género'"
        :inputId="'gender'"
        :options="genderOptions"
        :validationErrors="[]"
        v-model="localGender"
      />
    </div>
  </div>
</template>
