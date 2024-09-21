<script setup lang="ts">
import { ref, provide, reactive } from 'vue'
import PersonalInfo from '@/views/Profile/components/PersonalEdit.vue'
import LocationEdit from '@/views/Profile/components/LocationEdit.vue'
import JobInfo from '@/views/Profile/components/JobInformationEdit.vue'
import NotificationPreferences from '@/views/Profile/components/NotificationPreferencesEdit.vue'
import SocialMediaLinks from '@/views/Profile/components/SocialNetworkEdit.vue'
import GenderInfo from '@/views/Profile/components/GenderInformationEdit.vue'

import type { ProfileForm } from '@/interfaces/components/Profile/UserProfile.interface'

const form = reactive<ProfileForm>({
  email: '',
  name: '',
  lastname: '',
  phoneNumber: '',
  profilePictureUrl: '',
  dateOfBirth: '',
  location: {
    city: '',
    country: ''
  },
  jobDescription: '',
  occupation: '',
  company: '',
  gender: '',
  notificationPreferences: {
    email: false,
    sms: false,
    push: false
  },
  socialMediaLinks: {
    linkedin: '',
    twitter: '',
    instagram: '',
    website: ''
  }
})

function submitForm (): void {
  console.log('Formulario enviado', form)
}
</script>

<template>
  <div class="container mt-5">
    <h2>Editar Perfil</h2>
    <form @submit.prevent="submitForm">
      <div class="accordion" id="profileAccordion">
        <!-- Información Personal -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingPersonalInfo">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePersonalInfo"
              aria-expanded="true"
              aria-controls="collapsePersonalInfo"
            >
              Información Personal
            </button>
          </h2>
          <div
            id="collapsePersonalInfo"
            class="accordion-collapse collapse show"
            aria-labelledby="headingPersonalInfo"
            data-bs-parent="#profileAccordion"
          >
            <PersonalInfo :form="form" />
          </div>
        </div>

        <!-- Ubicación -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingLocation">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLocation"
              aria-expanded="false"
              aria-controls="collapseLocation"
            >
              Ubicación
            </button>
          </h2>
          <div
            id="collapseLocation"
            class="accordion-collapse collapse"
            aria-labelledby="headingLocation"
            data-bs-parent="#profileAccordion"
          >
            <LocationEdit :form="form" />
          </div>
        </div>

        <!-- Información Laboral -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingJobInfo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseJobInfo"
              aria-expanded="false"
              aria-controls="collapseJobInfo"
            >
              Información Laboral
            </button>
          </h2>
          <div
            id="collapseJobInfo"
            class="accordion-collapse collapse"
            aria-labelledby="headingJobInfo"
            data-bs-parent="#profileAccordion"
          >
            <JobInfo :form="form" />
          </div>
        </div>

        <!-- Preferencias de Notificación -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingNotificationPreferences">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseNotificationPreferences"
              aria-expanded="false"
              aria-controls="collapseNotificationPreferences"
            >
              Preferencias de Notificación
            </button>
          </h2>
          <div
            id="collapseNotificationPreferences"
            class="accordion-collapse collapse"
            aria-labelledby="headingNotificationPreferences"
            data-bs-parent="#profileAccordion"
          >
            <NotificationPreferences :form="form" />
          </div>
        </div>

        <!-- Redes Sociales -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingSocialMedia">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSocialMedia"
              aria-expanded="false"
              aria-controls="collapseSocialMedia"
            >
              Redes Sociales
            </button>
          </h2>
          <div
            id="collapseSocialMedia"
            class="accordion-collapse collapse"
            aria-labelledby="headingSocialMedia"
            data-bs-parent="#profileAccordion"
          >
            <SocialMediaLinks :form="form" />
          </div>
        </div>

        <!-- Género -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingGender">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseGender"
              aria-expanded="false"
              aria-controls="collapseGender"
            >
              Género
            </button>
          </h2>
          <div
            id="collapseGender"
            class="accordion-collapse collapse"
            aria-labelledby="headingGender"
            data-bs-parent="#profileAccordion"
          >
            <GenderInfo :form="form" />
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mt-3">Guardar Cambios</button>
    </form>
  </div>
</template>
