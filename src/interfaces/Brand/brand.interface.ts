import type { TargetBrandGender } from '@/enum/brand.enum'
import type { brandIndustry } from './brandIndustry.interface'

export interface IBrand {
  name: string
  operationCountry: string
  targetAudience: UserTargetAudience
  industry: brandIndustry | string
  logo: string
  user: string
  description: string
  id: string
}

export interface UserTargetAudience {
  ageRange: string
  gender: TargetBrandGender[]
  preferences: string
}

export interface BrandCreatedResponse {
  brandCreated: IBrand & {
    targetAudience: {
      ageRange: string
      gender: string[]
    }
  }
}

export interface BrandRemovedResponse {
  message: string
  brandRemoved: IBrand & {
    targetAudience: {
      ageRange: string
      gender: string[]
    }
  }
}

export interface GetBrandsResponse {
  brands: (IBrand & {
    targetAudience: {
      ageRange: string
      gender: string[]
    }
  })[]
}

export interface BrandUpdatedResponse {
  brandUpdated: IBrand & {
    targetAudience: {
      ageRange: string
      gender: string[]
      preferences: string
    }
  }
}
