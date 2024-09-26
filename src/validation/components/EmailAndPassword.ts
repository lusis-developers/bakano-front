export const emailValidations = [
  {
    rule: (value: string) => /\S+@\S+\.\S+/.test(value),
    message: 'El email debe tener un formato válido'
  },
  {
    rule: (value: string) => value.trim() !== '',
    message: 'El email no puede estar vacío'
  }
]
