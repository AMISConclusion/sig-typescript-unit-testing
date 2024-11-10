import { describe, test, expect } from 'vitest'
import { getAgeFromDate } from '../../src/common/age.js'

describe('getAgeFromDate', () => {
  test('should return the age based on the birthdate', () => {
    // Vitest has a bunch of nice utilities for mocking time. Find one to set the current time to a date to match excpected age.
    // Setting the system time time to a specific date helps keep the test consistent.
    const birthdate = new Date(1994, 3, 17)
    const age = getAgeFromDate(birthdate)
    expect(age).toBe(30)
  })
})