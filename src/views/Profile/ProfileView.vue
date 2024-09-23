<script setup lang="ts">
import { reactive, computed, ref, watch } from 'vue'

import {
  validateUrl,
  validateField,
  emailValidation,
  wordValidation,
  phoneNumberValidation
} from '@/validation/components/ProfileSettings'
import PersonalInfo from '@/views/Profile/components/PersonalEdit.vue'
import LocationEdit from '@/views/Profile/components/LocationEdit.vue'
import JobInfo from '@/views/Profile/components/JobInformationEdit.vue'
import GenderInfo from '@/views/Profile/components/GenderInformationEdit.vue'
import SocialMediaLinks from '@/views/Profile/components/SocialNetworkEdit.vue'
import NotificationPreferences from '@/views/Profile/components/NotificationPreferencesEdit.vue'

import type { ProfileForm } from '@/interfaces/components/Profile/UserProfile.interface'

//TODO - DEFAULT VALUE WILL BE THE USER INFORMATION
//TOOD - FUNCTION TO DETECT ANY CHANGE AND COULD SAVE CHANGES

const form = reactive<ProfileForm>({
  email: '',
  name: '',
  lastname: '',
  phoneNumber: '',
  profilePictureUrl: '',
  phoneCode: '',
  dateOfBirth: '',
  location: {
    region: '',
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

const hasUnsavedChanges = ref(false)

watch(
  form,
  () => {
    hasUnsavedChanges.value = true
  },
  { deep: true }
)

const hasErrors = computed(() => {
  const socialMediaErrors = Object.values(form.socialMediaLinks).some((link) => {
    const errors = validateUrl(link)
    return link && errors.length > 0
  })

  const personalInfoErrors =
    [
      ...validateField(form.email, emailValidation),
      ...validateField(form.name, wordValidation),
      ...validateField(form.lastname, wordValidation),
      ...validateField(form.phoneNumber, phoneNumberValidation)
    ].length > 0

  return socialMediaErrors || personalInfoErrors
})

function updateForm(newForm: Partial<ProfileForm>): void {
  Object.assign(form, newForm)
  hasUnsavedChanges.value = true
}

function submitForm(): void {
  if (hasErrors.value) {
    alert('Por favor, corrige los errores antes de enviar el formulario.')
    return
  }
  console.log('Formulario enviado', form)
  hasUnsavedChanges.value = false
}
</script>

<template>
  <div class="container mt-5">
    <h2>Editar Perfil</h2>
    <form @submit.prevent="submitForm">
      <div class="accordion" id="profileAccordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingPersonalInfo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePersonalInfo"
              aria-expanded="false"
              aria-controls="collapsePersonalInfo"
            >
              Información Personal
            </button>
          </h2>
          <div
            id="collapsePersonalInfo"
            class="accordion-collapse collapse"
            aria-labelledby="headingPersonalInfo"
            data-bs-parent="#profileAccordion"
          >
            <PersonalInfo :form="form" @update:form="updateForm" />
          </div>
        </div>
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
            <LocationEdit :form="form" @update:form="updateForm" />
          </div>
        </div>
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
            <JobInfo :form="form" @update:form="updateForm" />
          </div>
        </div>
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
            <NotificationPreferences :form="form" @update:form="updateForm" />
          </div>
        </div>
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
            <SocialMediaLinks :form="form" @update:form="updateForm" />
          </div>
        </div>
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
            <GenderInfo :form="form" @update:form="updateForm" />
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary mt-3"
        :disabled="hasErrors || !hasUnsavedChanges"
      >
        Guardar Cambios
      </button>
    </form>
  </div>
</template>
