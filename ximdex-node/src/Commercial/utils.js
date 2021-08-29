import { isArray, toNumber } from "../Shared/utils"

export const removeCharacter = (string, characters) => {
  if (typeof characters === 'string') return string.replace(characters, '')
  if (isArray(characters)) {
    characters.forEach(character => string = string.replace(character, ''))
  }
  return string
}

export const getRawValue = (string, characters) => {
  let stringWithoutCharacters = removeCharacter(string, characters)
  let num = toNumber(stringWithoutCharacters.replace(',', '.').replace("'", "."))
  return !isNaN(num) ? num : 0
}

export const calculatePos = (string, character) => {
  const pos = string.indexOf(character);
  return pos;
};
