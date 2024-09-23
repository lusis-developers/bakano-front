<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

import type { ProfileForm } from '@/interfaces/components/Profile/UserProfile.interface'

const emit = defineEmits(['update:form'])
const props = defineProps<{ form: ProfileForm }>()

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
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="emailNotifications"
        v-model="localNotificationPreferences.email"
      />
      <label class="form-check-label" for="emailNotifications">Correo Electrónico</label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="smsNotifications"
        v-model="localNotificationPreferences.sms"
      />
      <label class="form-check-label" for="smsNotifications">SMS</label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="pushNotifications"
        v-model="localNotificationPreferences.push"
      />
      <label class="form-check-label" for="pushNotifications">Push</label>
    </div>
  </div>
</template>
