import { getCountries, getCountryCallingCode } from 'libphonenumber-js'

export function listCountryCodes() {
  const countries = getCountries()
  const countryCodes = countries.map((country) => ({
    country,
    callingCode: getCountryCallingCode(country)
  }))

  return countryCodes
}
