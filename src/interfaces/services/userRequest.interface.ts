import { JobDescription, UserGender } from '@/enum/user/user.enum'

export interface IUser {
  body: Partial<{
    email: string
    name: string
    lastname: string
    phoneNumber: string
    profilePictureUrl: string
    dateOfBirth: Date
    location: {
      city: string
      country: string
    }
    JobDescription: JobDescription
    company: string
    occcupation: string
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
    gender: UserGender
    createdAt: Date
    updatedAt: Date
  }>
}
