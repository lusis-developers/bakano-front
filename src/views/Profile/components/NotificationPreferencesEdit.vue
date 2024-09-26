<script setup lang="ts">
import { ref, watch } from 'vue'

import CheckboxInput from '@/components/input/CheckboxInput.vue'

import type { IUser } from '@/interfaces/user.interface'

type NotificationPreferenceKey = keyof IUser['notificationPreferences']

const emit = defineEmits(['update:form'])

const props = defineProps<{ form: IUser }>()

const notificationOptions: { label: string; option: NotificationPreferenceKey }[] = [
  { label: 'Correo electrónico', option: 'email' },
  { label: 'SMS', option: 'sms' },
  { label: 'Push', option: 'push' }
]
const localNotificationPreferences = ref({ ...props.form.notificationPreferences })

watch(
  localNotificationPreferences,
  (newPreferences) => {
    emit('update:form', { ...props.form, notificationPreferences: newPreferences })
  },
  { deep: true }
)
</script>

<template>
  <div class="accordion-body">
    <CheckboxInput
      v-for="(option, index) in notificationOptions"
      :key="index"
      :label="option.label"
      :id="option.option"
      v-model:model-value="localNotificationPreferences[option.option]"
    />
  </div>
</template>
