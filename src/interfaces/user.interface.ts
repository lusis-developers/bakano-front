import type {
  BakanoUsageCount,
  BakanoUsageType,
  FoundUsBy,
  JobDescription,
  SubscriptionPlan,
  UserStatus
} from '@/enum/user.enum'

export interface IUser {
  name: string
  lastname: string
  email: string
  magicLinkToken: string
  magicLinkTokenExpires: Date
  subscription: {
    isActive: boolean
    plan: SubscriptionPlan
    startDate: Date
    endDate: Date
  }
  status: UserStatus
  brands?: any
  jobDescription: JobDescription | null
  usageCount: BakanoUsageCount | null
  usageType: BakanoUsageType | null
  foundUsBy: FoundUsBy | null
  countryCode: string
  phoneNumber: string
  profilePictureUrl: string
  dateOfBirth?: Date
  location: {
    province: string
    country: string
  }
  occupation: string
  notificationPreferences: {
    email: boolean
    sms: boolean
    push: boolean
  }
  socialMediaLinks: {
    linkedin?: string
    twitter?: string
    instagram?: string
    website?: string
  }
  gender: string
}
