export function getAgeFromDate(date: Date): number {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const age = new Date(diff)
  return Math.abs(age.getUTCFullYear() - 1970)
}

export class AgeCalculator {
  public getAgeFromDate(date: Date): number {
    return getAgeFromDate(date)
  }
}
