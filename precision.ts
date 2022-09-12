import { product } from './basic'

/*
 *  Constants
 */
const zero = '0'
const decimalPoint = '.'
const exponent = 'e'
const singleNumber = /^[1-9]$/

/**
 * Parse a string representation of a floating point
 * and return the mantissa.
 *
 * @param string the string representation of a floating point.
 * @return the mantissa of this number.
 */
function parseMantissa(string: string) {
  let decimalPointFlag = false
  let significantDigitFlag = false

  const zeros: string[] = []
  const all: string[] = []

  const addNumber = (character: string) => {
    all.push(...zeros, character)
    zeros.splice(0, zeros.length)
  }

  for (const character of string) {
    const isNonZero = !!character.match(singleNumber)?.length
    const isZero = character === zero
    const isDecimal = !decimalPointFlag && character === decimalPoint
    const isExponent = character.toLowerCase() === exponent

    if (!isNonZero && !isZero && !isDecimal && !isExponent) throw new Error(`Bad input ${string}`)
    if (isExponent) break
    if (isZero) {
      if (decimalPointFlag && significantDigitFlag) addNumber(zero)
      if (decimalPointFlag && !significantDigitFlag) zeros.push(zero)
      if (!decimalPointFlag) zeros.push(zero)
      continue
    }
    if (isNonZero) significantDigitFlag = true
    if (isDecimal) decimalPointFlag = true

    addNumber(isNonZero ? character : '')
  }
  return (all.length === 0 ? [zero] : all).join('')
}

/**
 * Calculate allowed precision for a number.
 *
 * @param n the number.
 * @return the length of the mantissa of this number.
 */
function numericalSignificance(n: number): number {
  return parseMantissa(n.toString()).length
}

/**
 * Calculate to allowed precision.
 *
 * @param multiplicands the numbers multiplied.
 * @return the number to allowed precision.
 */
export function toLeastSignificance(multiplicands: number[]): number {
  return Number(
    // calculate the product to the precision ...
    product(multiplicands).toPrecision(
      // ... of the smallest ... 
      Math.min(
        ...multiplicands.map(
          // ... mantissa
          (n) => numericalSignificance(n)
        )
      )
    )
  )
}

