<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import { SubscriptionPlan, UserStatus } from '@/enum/user.enum'

import BaseAccordion from '@/components/base/BaseAccordion.vue'

import {
  emailValidation,
  phoneNumberValidation,
  validateField,
  validateUrl,
  wordValidation
} from '@/validation/components/ProfileSettings'

import GenderInfo from '@/views/Profile/components/GenderInformationEdit.vue'
import JobInfo from '@/views/Profile/components/JobInformationEdit.vue'
import LocationEdit from '@/views/Profile/components/LocationEdit.vue'
import NotificationPreferences from '@/views/Profile/components/NotificationPreferencesEdit.vue'
import PersonalInfo from '@/views/Profile/components/PersonalEdit.vue'
import SocialMediaLinks from '@/views/Profile/components/SocialNetworkEdit.vue'

import type { AccordionItem } from '@/interfaces/components/accordion/AccordionItem.interface'
import type { IUser } from '@/interfaces/user.interface'

//TODO - DEFAULT VALUE WILL BE THE USER INFORMATION
//TOOD - FUNCTION TO DETECT ANY CHANGE Y COULD SAVE CHANGES

const form = reactive<IUser>({
  email: '',
  name: '',
  lastname: '',
  phoneNumber: '',
  profilePictureUrl: '',
  dateOfBirth: undefined,
  location: {
    province: '',
    country: ''
  },
  jobDescription: null,
  occupation: '',
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
  },
  magicLinkToken: '',
  magicLinkTokenExpires: new Date(),
  longTermTokenExpires: new Date(),
  subscription: {
    isActive: false,
    plan: SubscriptionPlan.FREE,
    startDate: new Date(),
    endDate: new Date()
  },
  status: UserStatus.ACTIVE,
  brands: null,
  usageCount: null,
  usageType: null,
  foundUsBy: null,
  countryCode: ''
})

const accordionItems: AccordionItem[] = [
  { title: 'Información Personal', component: PersonalInfo },
  { title: 'Ubicación', component: LocationEdit },
  { title: 'Información Laboral', component: JobInfo },
  { title: 'Preferencias de Notificación', component: NotificationPreferences },
  { title: 'Redes Sociales', component: SocialMediaLinks },
  { title: 'Género', component: GenderInfo }
]
const hasUnsavedChanges = ref(false)

const hasErrors = computed(() => {
  const socialMediaErrors = Object.values(form.socialMediaLinks).some(
    (link) => {
      const errors = validateUrl(link)
      return link && errors.length > 0
    }
  )

  const personalInfoErrors =
    [
      ...validateField(form.email, emailValidation),
      ...validateField(form.name, wordValidation),
      ...validateField(form.lastname, wordValidation),
      ...validateField(form.phoneNumber, phoneNumberValidation)
    ].length > 0

  return socialMediaErrors || personalInfoErrors
})

function updateForm(newForm: Partial<IUser>): void {
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

watch(
  form,
  () => {
    hasUnsavedChanges.value = true
  },
  { deep: true }
)
</script>

<template>
  <div class="container mt-5">
    <h2>Editar perfil</h2>
    <form @submit.prevent="submitForm">
      <div id="profileAccordion" class="accordion">
        <BaseAccordion
          v-for="(item, index) in accordionItems"
          :key="index"
          :title="item.title"
          :index="index"
          parent-id="#profileAccordion"
        >
          <component
            :is="item.component"
            :form="form"
            @update:form="updateForm"
          />
        </BaseAccordion>
      </div>
      <button
        type="submit"
        class="btn btn-primary mt-3"
        :disabled="hasErrors || !hasUnsavedChanges"
      >
        Guardar cambios
      </button>
    </form>
  </div>
</template>
