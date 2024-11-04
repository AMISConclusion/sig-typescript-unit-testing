import { describe, test, expect, vi } from 'vitest'
import { getAgeFromDate } from '../../src/common/age.js'

describe('getAgeFromDate', () => {
  test('should return the age based on the birthdate', () => {
    // Vitest has a bunch of nice utilities for mocking time. Find one to set the current time to a date to match excpected age.
    // Note: Usage of fake time is set in vitest.setup.ts.
    vi.setSystemTime(new Date(2024, 9, 14))
    const birthdate = new Date(1994, 3, 17)
    const age = getAgeFromDate(birthdate)
    expect(age).toBe(30)
  })
})