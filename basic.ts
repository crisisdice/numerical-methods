
export function sum(numbers: number[]): number {
  return numbers.reduce((sum, addend) => sum + addend, 0)
}


export function product(numbers: number[]): number {
  return numbers.reduce((product, multiplicand) => product * multiplicand, 1)
}
