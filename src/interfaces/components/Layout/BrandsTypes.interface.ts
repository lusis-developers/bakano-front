export interface socialMedia {
  name: string
  link: string
}

export interface Brand {
  id: number
  name: string
  logo: string
  socialMedia: socialMedia[]
  isLoading: boolean
  error: null
}
