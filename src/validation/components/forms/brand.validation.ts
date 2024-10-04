export const nameBrandValidtions = [
  { rule: (value: string) => value.length > 0, message: 'El nombre es requerido.' },
  {
    rule: (value: string) => value.length <= 50,
    message: 'El nombre no puede exceder 50 caracteres.'
  }
]

export const mainAddress = [
  { rule: (value: string) => value.length > 0, message: 'La dirección es requerida.' },
  {
    rule: (value: string) => value.length <= 100,
    message: 'La dirección no puede exceder 100 caracteres.'
  }
]
