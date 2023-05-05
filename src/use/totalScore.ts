export const useTotalScore = (...arg: any[]): number => {
  let initialValue = 0
  const sum = arg.reduce((acc, n): number => {
    if(typeof n !== 'number' || Number.isNaN(n)) return acc + 0
    return acc + n
  }, initialValue)
  return Number(sum.toFixed(1)) <= 15 ? Number(sum.toFixed(1)) : 15
}