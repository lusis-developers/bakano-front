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

export const emailValidation = [
  {
    rule: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'coloca un correo valido por favor'
  }
]

export const wordValidation = [
  {
    rule: (value: string) => /^[A-Za-z]+$/.test(value),
    message: 'La palabra no puede contener números ni caracteres especiales'
  }
]
