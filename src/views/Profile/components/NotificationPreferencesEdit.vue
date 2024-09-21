<script setup lang="ts">
import { defineProps } from 'vue'

import type { ProfileForm } from '@/interfaces/components/Profile/UserProfile.interface'

defineProps<{ form: ProfileForm }>()
</script>

<template>
  <div class="accordion-body">
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="emailNotifications"
        v-model="form.notificationPreferences.email"
      />
      <label class="form-check-label" for="emailNotifications">Correo Electrónico</label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="smsNotifications"
        v-model="form.notificationPreferences.sms"
      />
      <label class="form-check-label" for="smsNotifications">SMS</label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="pushNotifications"
        v-model="form.notificationPreferences.push"
      />
      <label class="form-check-label" for="pushNotifications">Push</label>
    </div>
  </div>
</template>
