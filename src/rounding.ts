import { sum } from './basic'
/*
 * Avoid floating point weirdness
 * */
function sumSpecial(numbers: number[], precision = 0): number {
  return (
    numbers.map((num) => num * 10 ** precision).reduce((sum, num) => sum + num) / 10 ** precision
  )
}

/*
 *  Round percentages of {numbers} so that they always total to 100, to decimal point {precision}
 * */
export function friendlyPercentage(numbers: number[], precision = 0): number[] {
  const total = sum(numbers)
  const adjustment = 10 ** (precision + 2)
  let remainder = adjustment

  return numbers
    .map((num, index) => {
      const percentage = (num / total) * adjustment
      const integer = Math.floor(percentage)
      remainder -= integer
      return {
        integer,
        decimal: percentage - integer,
        index,
      }
    })
    .sort((a, b) => b.decimal - a.decimal)
    .map((obj) => {
      if (remainder === 0) return obj
      remainder -= 1
      return { ...obj, integer: obj.integer + 1 }
    })
    .sort((a, b) => a.index - b.index)
    .map((obj) => obj.integer / 10 ** precision)
}

const test = (numbers: number[], precision = 0) => {
  const percentages = friendlyPercentage(numbers, precision)
  const sum = sumSpecial(percentages, precision)
  console.log({ percentages, sum })
  console.assert(sum === 100)
}

test([3, 4, 7, 3])
test([3, 4, 7, 3], 1)
test([3, 4, 7, 3], 2)
test([3, 4, 7, 3], 3)
test([3, 4, 7, 3], 4)
test([3, 4, 7, 3], 5)

// TODO (remainder > numbers.length) === true ?
