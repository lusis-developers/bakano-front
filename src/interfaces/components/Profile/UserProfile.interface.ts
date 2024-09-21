export interface Location {
  city: string;
  country: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface SocialMediaLinks {
  linkedin: string;
  twitter: string;
  instagram: string;
  website: string;
}

export interface ProfileForm {
  email: string;
  name: string;
  lastname: string;
  phoneNumber: string;
  profilePictureUrl: string;
  dateOfBirth: string;
  location: Location;
  jobDescription: string;
  occupation: string;
  company: string;
  gender: string;
  notificationPreferences: NotificationPreferences;
  socialMediaLinks: SocialMediaLinks;
}