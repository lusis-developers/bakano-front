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

export const passwordValidations = [
  {
    rule: (value: string) => value.length >= 8,
    message: 'La contraseña debe tener al menos 6 caracteres'
  },
  {
    rule: (value: string) => value.trim() !== '',
    message: 'La contraseña no puede estar vacía'
  },
  {
    rule: (value: string) => /[0-9]/.test(value),
    message: 'La contraseña debe contener al menos un número'
  },
  {
    rule: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
    message: 'La contraseña debe contener al menos un carácter especial'
  }
]
