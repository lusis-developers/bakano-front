export const nameBrandValidations = [
  {
    rule: (value: string) => value.length > 0,
    message: 'El nombre es requerido.'
  },
  {
    rule: (value: string) => value.length <= 50,
    message: 'El nombre no puede exceder 50 caracteres.'
  }
]

export const mainAddressValidations = [
  {
    rule: (value: string) => value.length > 0,
    message: 'La dirección es requerida.'
  },
  {
    rule: (value: string) => value.length <= 100,
    message: 'La dirección no puede exceder 100 caracteres.'
  }
]

export const descriptionValidations = [
  {
    rule: (value: string) => value.length > 0,
    message: 'La descripción es requerida.'
  },
  {
    rule: (value: string) => value.length <= 500,
    message: 'La descripción no puede exceder 200 caracteres.'
  }
]

export const industryValidations = [
  {
    rule: (value: string) => value.length > 0,
    message: 'El campo no puede estar vacío.'
  }
]
