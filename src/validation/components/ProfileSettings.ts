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
    message: 'Coloca un correo válido por favor'
  }
]

export const wordValidation = [
  {
    rule: (value: string) => /^[A-Za-z]+$/.test(value),
    message: 'La palabra no puede contener números ni caracteres especiales'
  }
]

export const phoneNumberValidation = [
  {
    rule: (value: string) => /^[0-9]{10,15}$/.test(value),
    message: 'El número de teléfono debe contener entre 10 y 15 dígitos'
  }
]

export function validateField(
  value: string,
  validations: { rule: (value: string) => boolean; message: string }[]
): string[] {
  return validations
    .filter((validation) => !validation.rule(value))
    .map((validation) => validation.message)
}
