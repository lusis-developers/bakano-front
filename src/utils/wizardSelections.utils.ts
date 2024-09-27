import { BakanoUsageCount, BakanoUsageType, FoundUsBy, JobDescription, UserGender } from '@/enum/user.enum'

import type { SelectOption } from '@/interfaces/components/input/SelectInput.interface'

export const usageCountOptions: SelectOption[] = [
  { value: '', label: 'Seleccione', icon: 'bi bi-people-fill' },
  { value: BakanoUsageCount.INDIVIDUAL, label: 'Individual', icon: 'bi bi-people-fill' },
  { value: BakanoUsageCount.GROUP, label: 'Grupo', icon: 'bi bi-people-fill' }
]

export const usageTypeOptions: SelectOption[] = [
  { value: '', label: 'Seleccione', icon: 'bi bi-gear-fill' },
  {
    value: BakanoUsageType.SCHEDULE_POSTS,
    label: 'Programar Publicaciones',
    icon: 'bi bi-gear-fill'
  },
  {
    value: BakanoUsageType.CONTENT_CREATION,
    label: 'Creación de Contenido',
    icon: 'bi bi-gear-fill'
  }
]

export const foundUsByOptions: SelectOption[] = [
  { value: '', label: 'Seleccione', icon: 'bi bi-search' },
  { value: FoundUsBy.TIK_TOK, label: 'TikTok' },
  { value: FoundUsBy.FACEBOOK, label: 'Facebook' },
  { value: FoundUsBy.INSTAGRAM, label: 'Instagram' },
  { value: FoundUsBy.GOOGLE, label: 'Google' },
  { value: FoundUsBy.WORD_OF_MOUTH, label: 'WOM (Amigo, compañero, hijo)' }
]

export const jobDescriptionOptions: SelectOption[] = [
  { value: '', label: 'Seleccione' },
  { value: JobDescription.FREELANCER, label: 'Freelancer' },
  { value: JobDescription.MARKETING_AGENCY, label: 'Agencia de Marketing' },
  { value: JobDescription.COMPANY, label: 'Empresa' },
  { value: JobDescription.CONTENT_CREATOR, label: 'Creador de Contenido' },
  { value: JobDescription.OTHER, label: 'Otro' }
]

export const genderOptions: SelectOption[] = [
  {
    value: '', label: 'Seleccione',
  },
  {
    value: UserGender.MALE, label: 'Masculino',
  },
  {
    value: UserGender.FEMALE, label: 'Femenino'
  },
  {
    value: UserGender.PREFER_NOT_SAY, label: 'Prefiero no decirlo'
  }
]