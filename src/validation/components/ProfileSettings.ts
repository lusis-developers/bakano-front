export const urlValidations = [
  {
    rule: (value: string) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value),
    message: 'Coloca tu link de perfil en esta red social'
  }
]

export function validateUrl(value: string): string[] {
  return urlValidations
    .filter((validation) => !validation.rule(value))
    .map((validation) => validation.message)
}
