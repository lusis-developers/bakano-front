export interface Validation {
  rule: (value: string) => boolean
  message: string
}
