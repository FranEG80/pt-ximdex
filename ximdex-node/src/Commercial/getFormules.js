
import { calculatePos, getRawValue } from './utils';

const FORMULES = {
  ['€']: (cost, value) => cost + value,
  ['%']: (cost, value) => cost + (cost * value / 100)
}
const CHARACTERS_FORMULE = Object.keys(FORMULES)

const getFormules = json => {
  let output = {}
  Object.keys(json).forEach(key => {
    const [first, second] = getFormuleParts(json[key])
    output[key] = cost => {
      const step1 = FORMULES[first.type](cost, first.value)
      const step2 = FORMULES[second.type](step1, second.value)
      return step2 - cost
    }
  })
  return output
}

const getFormuleParts = string => {
  let initialPos = false;
  let parts = []
  const characters = CHARACTERS_FORMULE
  const positions = characters.map(character => {
    let position = calculatePos(string, character)
    if (!initialPos || initialPos.position > position) initialPos = {character, position}
    return {character, position}
  })
  positions.forEach(({character, position}, index) => {
    let initial, end;
    if (position === -1) return parts.push({type: character, value: 0})
    
    if (initialPos.position === position) {
      initial = 0
      end = position
    } else {
      initial =  positions[index === 0 ? index + 1 : index - 1].position + character.length
      end = string.length - character.length
    }
    let value = string.slice(initial, end)
    value = getRawValue(value)
    if (initialPos.position === position) return parts.unshift({type: character, value})
    return parts.push({type: character, value})
  })
  return parts
}

export default getFormules