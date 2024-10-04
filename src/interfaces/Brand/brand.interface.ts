import type { BrandIndustry, TargetBrandGender } from '@/enum/brand.enum'

export interface IBrand {
  name: string
  operationCountry: string
  mainAddress: string
  targetAudience: UserTargetAudience
  industry: BrandIndustry | string
  logo: string
  user: string
  description: string
  id: string
}

export interface UserTargetAudience {
  ageRange: [string]
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

export interface BrandResponse {
  brand: IBrand & {
    targetAudience: {
      ageRange: string[]
      gender: TargetBrandGender[]
    }
    socialMediaIntegrations: {
      facebook: string | null
    }
    _id: string
    createdAt: string
    updatedAt: string
  }
}

export interface BrandLogoUpdateResponse {
  message: string
  url: string
}
