import { CHARACTER, DECIMALS_FORMAT } from "../config/constants"

export const toNumber = num => Number(num.replaceAll(CHARACTER.MILLARS, '').replace(CHARACTER.DECIMALS, '.'))
export const isArray = array => Array.isArray(array)
export const isObject = obj => typeof obj === 'object' && !Array.isArray(obj)
export const toFixNumber = num => num.toFixed(DECIMALS_FORMAT)
export const parseQuantity = quantity => toNumber(quantity)

export const parseCurrency = (value, currency) => {
  const currencyPos = value.indexOf(currency)
  let output;
  if (currencyPos === -1) {
    return loggerLocal.error(`Currency '${currency}' not found in value '${value}'`, 'parseCurrencyInNumber')
  }
  output = (currencyPos === 0) 
    ? value.substring(currency.length) 
    : value.substring(0, currencyPos)

  return toNumber(output)
}

export const getCharacterPos = (string, character) => {
  const pos = string.indexOf(character);
  return pos;
};
